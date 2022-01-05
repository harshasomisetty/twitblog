import React from "react";
import {Outlet} from "react-router-dom";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar.js";
import RightSideBar from "./components/RightSideBar.js";

export default function App() {
  return (
    <div className="container relative flex flex-row justify-between divide-x divide-gray-500">
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}
