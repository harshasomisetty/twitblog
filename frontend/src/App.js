import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import useSignUpForm from "./hooks/searchHook.js";

// const axios = require("axios");
export default function App() {
  const navigate = useNavigate();
  const signup = () => {
    console.log(inputs);
    console.log("created %s", inputs.search_query);
    navigate("/author/" + inputs.search_query);
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search_query"
          placeholder="Enter Query"
          onChange={handleInputChange}
          value={inputs.search}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
