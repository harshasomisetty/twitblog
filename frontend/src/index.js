import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Authors from "./routes/authors";
import Author from "./routes/author";
import Threads from "./routes/threads";
import Latest from "./routes/latest";
import Redir from "./routes/redirect";
import Explore from "./routes/explore";
import Thread from "./routes/thread";
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import ExploreDisplay from "./components/ExploreDisplay.js";
import "./index.css";

ReactDOM.render(
  <Provider template={AlertTemplate}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Redir />} />
          <Route path="home" element={<Home />}>
            <Route index element={<Latest />} />
          </Route>
          <Route path="author" element={<Authors />}>
            <Route path=":authorName" element={<Author />} />
            <Route index element={<Redir text="Find specific Author!" />} />
          </Route>
          <Route path="thread" element={<Threads />}>
            <Route path=":rootThread" element={<Thread />} />
            <Route index element={<Redir text="Find specific Thread!" />} />
          </Route>
        </Route>
        <Route path="explore" element={<Explore />}>
          <Route index element={<ExploreDisplay />} />
        </Route>
        <Route path="*" element={<Redir text="Invalid Page!" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
