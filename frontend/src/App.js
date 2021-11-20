import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import useSignUpForm from "./hooks/searchHook.js";

export default function App() {
  const navigate = useNavigate();
  const signup = () => {
    navigate("/author/" + inputs.search_query);
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <div>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search_query"
          placeholder="Enter Author Name"
          onChange={handleInputChange}
          value={inputs.search}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
