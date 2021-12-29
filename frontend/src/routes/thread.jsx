import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadDisplay from "../components/ThreadDisplay.js";
import Loading from "../components/Loading.js";
import callApi from "../utils/api.js";

export default function Thread() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData(params) {
      let response = await callApi(params);
      if (response[0]) {
        setState({ threadData: response.threadData, tweets: response.tweets });
        setBusy(false);
      } else {
        setError(response[1]);
      }
    }
    fetchData("thread/" + params.rootThread);
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
