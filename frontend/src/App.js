import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar.js";
import RightSideBar from "./components/RightSideBar.jsx";

export default function App() {
  return (
    <div className="main-display">
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}
