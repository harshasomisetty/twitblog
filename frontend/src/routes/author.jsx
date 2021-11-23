import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const axios = require("axios");

export default function Author() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  console.log("new author1");
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/author/" + params.authorName;
      await axios
        .get(url)
        .then((res) => setState({ tData: res.data }))
        .catch(function (error) {
          console.log(error);
        });
      setBusy(false);
    }
    console.log("fetching author threads");
    fetchData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const divStyle = {
    margintop: 20,
  };
  console.log("new author2");
  if (isBusy) return <p>loading</p>;
  console.log("new author3");
  return (
    <div>
      <p>{params.authorName}</p>
      {state.tData.threads.map((thread) => (
        <div style={divStyle} key={thread["_id"]}>
          <Link to={`/thread/${thread["_id"]}`}>{thread["keywords"]}</Link>
        </div>
      ))}
    </div>
  );
}
