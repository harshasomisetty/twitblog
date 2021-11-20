import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const axios = require("axios");

export default function Author() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const url = "http://localhost:5000/author/" + params.authorName;
    axios.get(url).then((res) => setState({ tData: res.data }));
    setBusy(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const divStyle = {
    margintop: 20,
  };

  if (isBusy) return <p>loading</p>;

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
