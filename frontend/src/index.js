import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Author from "./routes/author";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/author" element={<Author />} />
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
