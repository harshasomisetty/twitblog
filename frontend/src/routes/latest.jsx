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
      console.log("test docker333", process.env);
      let url = "http://localhost:5000/latest";

      if (process.env.REACT_APP_DOCKER_ENV) {
        url = "http://" + process.env.REACT_APP_DOCKER_ENV + ":5000/latest";
      } else {
        console.log("not docker");
      }

      console.log(url);
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
          console.log("error");
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
