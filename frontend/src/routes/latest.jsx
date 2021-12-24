import { useState, useEffect } from "react";
import Loading from "../components/Loading.js";
import LatestDisplay from "../components/LatestDisplay.js";
const axios = require("axios");

export default function Latest() {
  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      const url = "http://" + location.host + ":5000/latest";

      await axios
        .get(url)
        .then((res) => {
          if (res.status !== 200) {
            throw Error("Data currently not available");
          }
          setState({ threadData: res.data.threadData });
          setBusy(false);
        })
        .catch((err) => {
          console.log("error2");
          setError(err.message);
        });
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading error={error} />;
  else {
    return <LatestDisplay threadData={state.threadData} />;
  }
}
