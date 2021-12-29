import { useState, useEffect } from "react";
import Loading from "../components/Loading.js";
import LatestDisplay from "../components/LatestDisplay.js";
import callApi from "../utils/api.js";

export default function Latest() {
  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData(params) {
      let response = await callApi(params);
      if (response[0]) {
        setState({ threadData: response[1].threadData });
        setBusy(false);
      } else {
        setError(response[1]);
      }
    }
    fetchData("latest");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading error={error} />;
  else {
    return <LatestDisplay threadData={state.threadData} />;
  }
}
