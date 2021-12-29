import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import App from "./App";
import PageFormat from "./components/PageFormat.js";

import Author from "./routes/author";
import Latest from "./routes/latest";
import Redir from "./routes/redirect";
import Explore from "./routes/explore";
import Thread from "./routes/thread";

import ExploreView from "./views/ExploreView.js";
import "./index.css";

ReactDOM.render(
  <Provider template={AlertTemplate}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Redir />} />
          <Route
            path="home"
            element={<PageFormat Title="Home Page" toAdd={true} />}
          >
            <Route index element={<Latest />} />
          </Route>
          <Route
            path="author"
            element={<PageFormat Title="Author Page" toAdd={false} />}
          >
            <Route path=":authorName" element={<Author />} />
            <Route index element={<Redir text="Find specific Author!" />} />
          </Route>
          <Route
            path="thread"
            element={<PageFormat Title="Threads Page" toAdd={false} />}
          >
            <Route path=":rootThread" element={<Thread />} />
            <Route index element={<Redir text="Find specific Thread!" />} />
          </Route>
        </Route>
        <Route path="explore" element={<Explore />}>
          <Route index element={<ExploreView />} />
        </Route>
        <Route path="*" element={<Redir text="Invalid Page!" />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
