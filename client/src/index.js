import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./state/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
