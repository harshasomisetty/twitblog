import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar.js";
import RightSideBar from "./components/RightSideBar.jsx";

// divide-x divide-gray-700
export default function App() {
  return (
    <div className="container flex flex-row h-screen justify-center ">
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}
