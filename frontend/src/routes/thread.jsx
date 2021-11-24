import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadDisplay from "../components/ThreadDisplay.js";
import Loading from "../components/Loading.js";

const axios = require("axios");

export default function Thread() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

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
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading />;
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
