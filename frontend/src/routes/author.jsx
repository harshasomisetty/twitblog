import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorDisplay from "../components/AuthorDisplay.js";
import Loading from "../components/Loading.js";
import callApi from "../utils/api.js";

export default function Author() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData(params) {
      let response = await callApi(params);
      if (response[0]) {
        setState({ threadData: response });
        setBusy(false);
      } else {
        setError(response[1]);
      }
    }
    fetchData("author/" + params.authorName);
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading error={error} />;

  return (
    <AuthorDisplay
      authorName={params.authorName}
      threads={state.threadData.threads}
    />
  );
}
