import Search from "./Search.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

const RightSideBar = () => {
  return (
    <div className="flex flex-col">
      <Search />
      <AuthorList />
    </div>
  );
};

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetch() {
      const test = await axios.get("http://localhost:5000/author");
      setAuthors(test.data.authorList);
    }
    fetch();
  }, []);

  return (
    <div>
      <p>Current List of Twitter Authors</p>
      {authors.map((author, ind) => (
        <div key={ind}>
          <Link to={`/author/${author}`}>{author}</Link>
        </div>
      ))}
    </div>
  );
};

export default RightSideBar;
