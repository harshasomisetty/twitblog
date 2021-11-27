import { useState, useEffect } from "react";
import Loading from "../components/Loading.js";
import LatestDisplay from "../components/LatestDisplay.js";
const axios = require("axios");

export default function Latest() {
  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/latest";

      await axios
        .get(url)
        .then((res) => setState({ threadData: res.data.threadData }))
        .catch(function (error) {
          console.log(error);
        });
      setBusy(false);
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading />;
  else {
    return <LatestDisplay threadData={state.threadData} />;
  }
}
