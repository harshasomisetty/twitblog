import React, { useState } from "react";
import { Redirect } from "react-router";

import { Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import useSignUpForm from "./hooks/searchHook.js";

// const axios = require("axios");
export default function App() {
  const [searched, setSearched] = useState(0);
  const signup = () => {
    console.log(inputs);
    console.log("created %s", inputs.search_query);
    setSearched({ searched: 1 });
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  if (searched == 0) {
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
  } else {
    return <Redirect to="/author" />;
    // console.log("hi");
    // return <p>hi</p>;
  }
}
