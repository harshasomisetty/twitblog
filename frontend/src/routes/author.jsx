import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const axios = require("axios");

export default function Author() {
  const [search, setSearch] = useState({
    tData: { threads: [{ text: "hi" }, { text: "bye" }] },
  });
  let params = useParams();

  useEffect(() => {
    const url = "http://localhost:5000/author/" + params.authorName;
    console.log(url);
    axios.get(url).then((res) => setSearch({ tData: res.data }));
  }, []);
  console.log(search.tData.threads);

  const divStyle = {
    margintop: 20,
  };

  return (
    <div>
      {search.tData.threads.map((thread) => (
        <div style={divStyle}>
          <Link to={`/thread/${thread["_id"]}`}>{thread["keywords"]}</Link>
        </div>
      ))}
    </div>
  );
}
