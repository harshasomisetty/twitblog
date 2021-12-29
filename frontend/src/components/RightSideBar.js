import Search from "./Search.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import callApi from "../utils/api.js";

const RightSideBar = ({ displaySearch = true }) => {
  return (
    <div className="sticky top-0 h-screen flex flex-col w-max p-2 border-2 rounded-sm hidden lg:block">
      {displaySearch && <Search />}
      <AuthorList />
    </div>
  );
};

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    async function fetchData(params) {
      let response = await callApi(params);
      if (response[0]) {
        setAuthors(response[1].authorList);
      }
    }
    fetchData("author");
  }, []);

  return (
    <div>
      <h3 className="m-3 whitespace-nowrap">Current List of Twitter Authors</h3>
      {authors.map((author, ind) => (
        <div key={ind} className="ml-3 mb-1">
          <Link to={`/author/${author}`}>{author}</Link>
        </div>
      ))}
    </div>
  );
};

export default RightSideBar;
