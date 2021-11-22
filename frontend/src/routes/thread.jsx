import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const axios = require("axios");

export default function Thread() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  function getTweetLink(id, author) {
    return "https://twitter.com/" + author + "/status/" + id;
  }

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/thread/" + params.rootThread;

      await axios
        .get(url)
        .then((res) =>
          setState({ threadData: res.data.threadData, tweets: res.data.tweets })
        )
        .catch(function (error) {
          console.log(error);
        });
      setBusy(false);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <p>loading</p>;

  return (
    <div>
      <p>author: {state.threadData.author}</p>
      <p>keywords: {state.threadData.keywords}</p>

      {state.tweets.map((t) => (
        <div key={t[1]}>
          <a href={getTweetLink(t[1], state.threadData.author)}>{t[0]}</a>
        </div>
      ))}
    </div>
  );
}
