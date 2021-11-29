import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadDisplay from "../components/ThreadDisplay.js";
import Loading from "../components/Loading.js";

const axios = require("axios");

export default function Thread() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/thread/" + params.rootThread;

      await axios
        .get(url)
        .then((res) => {
          if (res.status !== 200) {
            throw Error("Data currently not available");
          }
          setState({
            threadData: res.data.threadData,
            tweets: res.data.tweets,
          });
          setBusy(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    fetchData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading error={error} />;
  else {
    return (
      <ThreadDisplay
        data={state.threadData}
        tweets={state.tweets}
        author={state.threadData.author}
      />
    );
  }
}
