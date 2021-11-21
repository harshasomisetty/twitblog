import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Authors from "./routes/authors";
import Author from "./routes/author";
import Threads from "./routes/threads";
import Thread from "./routes/thread";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="author" element={<Authors />}>
        <Route path=":authorName" element={<Author />} />
      </Route>
      <Route path="thread" element={<Threads />}>
        <Route path=":rootThread" element={<Thread />} />
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
