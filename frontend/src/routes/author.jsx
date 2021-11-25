import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorDisplay from "../components/AuthorDisplay.js";

import Loading from "../components/Loading.js";
const axios = require("axios");

export default function Author() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/author/" + params.authorName;
      await axios
        .get(url)
        .then((res) => setState({ tData: res.data }))
        .catch(function (error) {
          console.log(error);
        });
      setBusy(false);
    }

    fetchData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading />;

  return (
    <AuthorDisplay
      authorName={params.authorName}
      threads={state.tData.threads}
    />
  );
}
