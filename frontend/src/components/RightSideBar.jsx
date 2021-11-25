import Search from "./Search.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

const RightSideBar = () => {
  return (
    <div className="sticky top-0  h-screen flex flex-col w-max border-2 rounded-sm hidden lg:block">
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
      <h3>Current List of Twitter Authors</h3>
      {authors.map((author, ind) => (
        <div key={ind} className="ml-3 mb-1">
          <Link to={`/author/${author}`}>{author}</Link>
        </div>
      ))}
    </div>
  );
};

export default RightSideBar;
