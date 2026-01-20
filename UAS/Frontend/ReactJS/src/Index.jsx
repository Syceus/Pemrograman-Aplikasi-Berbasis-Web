// =======================================
// FILE: src/index.jsx
// Fungsi: Entry point React (penghubung ke HTML)
// =======================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap (styling dasar)
import "bootstrap/dist/css/bootstrap.min.css";

// Import CSS global buatan sendiri
import "./index.css";

// Render aplikasi React ke <div id="root">
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
