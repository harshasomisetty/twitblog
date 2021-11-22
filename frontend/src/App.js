import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar.js";
import Search from "./components/Search.js";

export default function App() {
  return (
    <div className="flex flex-row justify-between">
      <SideBar />
      <Outlet />
      <Search />
    </div>
  );
}
