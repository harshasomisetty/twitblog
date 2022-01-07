import React from "react";
import {Outlet} from "react-router-dom";
import "./App.css";
import LeftSideBar from "./components/LeftSideBar.js";
import RightSideBar from "./components/RightSideBar.js";
import BottomBar from "./components/BottomBar.js";
export default function App() {
  return (
    <div className="container relative flex flex-row justify-between ">
      {/* <div className="hidden sm:block"> */}
      <LeftSideBar />
      {/* </div> */}

      <Outlet />
      <BottomBar />
      <RightSideBar />
    </div>
  );
}
