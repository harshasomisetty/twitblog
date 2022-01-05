import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import callApi from "../utils/api.js";

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
      <h3 className="m-3 whitespace-nowrap font-bold">
        Current List of Twitter Authors
      </h3>
      {authors
        .sort(function (a, b) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
        })
        .map((author, ind) => (
          <div key={ind} className="ml-3 mb-1">
            <Link to={`/author/${author}`}>
              <p className="antialiased">{author}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AuthorList;
