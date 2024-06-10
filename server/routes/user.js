const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  get_access_token,
  get_refresh_token,
} = require("../functions/jwt_tokens");
const {
  checkValidPassword,
  checkValidEmail,
} = require("../functions/validations");
const {
  verify_access_token,
  verify_refresh_token,
} = require("../middleware/jwt");
const jwt = require("jsonwebtoken");
/////////////////////////////////////////////////////////////////////////////////////

//! Register
router.post("/register", async (req, res) => {
  const reqUsername = req.body.username;
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  if (!reqUsername || !reqEmail || !reqPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // check if password is valid or not, if not return error
  if (!checkValidPassword(reqPassword)) {
    return res.status(400).json({
      error:
        "Invalid password. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  // check if email is valid or not, if not return error
  if (!checkValidEmail(reqEmail)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // check if username already exists or not, if exists return error
    const foundUserByUsername = await User.findOne({ username: reqUsername });
    if (foundUserByUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // check if email already exists or not, if exists return error
    const foundUserByEmail = await User.findOne({ email: reqEmail });
    if (foundUserByEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // creating new user and save to the database
    // password will be hashed before saving to the database (look the User model for more details)
    const hashedPassword = await bcrypt.hash(reqPassword, 10);
    const newUser = new User({
      username: reqUsername,
      email: reqEmail,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "Registration Successfull" });
  } catch (err) {
    // if error occured return eror message
    return res.status(500).json({ error: err.message });
  }
});

//! Login
router.post("/login", async (req, res) => {
  // get username and password from request body
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;

  // check if username and password is provided or not, if not return error
  if (!reqUsername || !reqPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const foundUser = await User.findOne({ username: reqUsername });
    if (!foundUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // check if password is correct or not, if not return error
    is_password_correct = await bcrypt.compare(reqPassword, foundUser.password);
    if (!is_password_correct) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // return jason web tokens for successfull login
    const access_token = get_access_token(
      foundUser._doc._id,
      foundUser._doc.username,
      foundUser._doc.email,
      foundUser._doc.isAdmin
    );
    const refresh_token = get_refresh_token(
      foundUser._doc._id,
      foundUser._doc.username,
      foundUser._doc.email,
      foundUser._doc.isAdmin
    );
    return res
      .status(200)
      .json({ access: access_token, refresh: refresh_token });
  } catch (err) {
    // if error occured return error message
    return res.status(500).json({ error: err.message });
  }
});

//! get all users
router.get("/all", verify_access_token, async (req, res) => {
  const reqUsername = req.user.username;

  try {
    const foundUser = await User.findOne({ username: reqUsername });
    if (!foundUser || !foundUser.isAdmin) {
      return res.status(400).json({ error: "Admin not found" });
    }
    if (!foundUser.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//! refresh tokens
router.post("/refresh", verify_refresh_token, async (req, res) => {
  try {
    const access_token = get_access_token(
      req.user._id,
      req.user.username,
      req.user.email,
      req.user.isAdmin
    );
    const refresh_token = get_refresh_token(
      req.user._id,
      req.user.username,
      req.user.email,
      req.user.isAdmin
    );
    return res
      .status(200)
      .json({ access: access_token, refresh: refresh_token });
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
});

module.exports = router;
