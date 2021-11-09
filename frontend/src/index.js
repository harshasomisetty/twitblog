import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Authors from "./routes/authors";
import Author from "./routes/author";
import "./index.css";

ReactDOM.render(
  // <App />,
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="authors" element={<Authors />}>
        <Route path=":authorName" element={<Author />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
