const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOptions");

//! configuration
const app = express();
app.set("view engine", "ejs");
dotenv.config();
const PORT = process.env.PORT || 5000;

//! middleware for cors
// app.use(cors(corsOptions));
app.use(cors());

//! Parse URL-encoded bodies (HTML form data)
app.use(express.urlencoded({ extended: false }));

//! middleware for json()
app.use(express.json());

//! Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, "static")));

//! Function to connect to MongoDB with retries
function connectToDatabase() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
      // Start the server after successful database connection
      startServer();
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err.message);
      // Retry connection after 4 seconds if maximum retry attempts are not reached
      if (connectToDatabase.retryAttempts < 4) {
        console.log("Retrying database connection in 4 seconds...");
        setTimeout(connectToDatabase, 4000);
        connectToDatabase.retryAttempts++;
      } else {
        console.log("Maximum retry attempts reached. Exiting...");
        process.exit(1); // Exit the application if maximum retries are reached
      }
    });
}
connectToDatabase.retryAttempts = 0; // Initialize retry attempts counter

//! Define routes function
function serverRoutes() {
  //! root route
  app.get("^/$|/index(.html)?", (req, res) => {
    res.render(path.join(__dirname, "static/html/", "index.ejs"));
  });

  //! other routes
  app.use("/api/user", require("./routes/user")); // user routes
  app.use("/api/post", require("./routes/post")); // post routes

  //! file size too large error handling
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      res.status(400).json({ error: "Invalid JSON payload" });
    } else if (err.type === "entity.too.large") {
      res.status(413).json({ error: "File is too large" });
    } else {
      next();
    }
  });

  //! 404 error handling
  app.all("/*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.render(path.join(__dirname, "static/html/", "404.ejs"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type("txt").send("404 Not Found");
    }
  });

  //! app listening to port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

//! Start the server
function startServer() {
  //! Define routes after successful database connection
  serverRoutes();
}

//! Connect to the database initially
connectToDatabase();
