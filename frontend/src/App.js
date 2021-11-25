import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar.js";
import RightSideBar from "./components/RightSideBar.jsx";

// divide-x divide-gray-700
export default function App() {
  return (
    <div className="container relative flex flex-row justify-betweenf">
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}
