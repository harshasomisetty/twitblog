import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorDisplay from "../components/AuthorDisplay.js";
import Loading from "../components/Loading.js";

const axios = require("axios");

export default function Author() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      let url = "/api/author/" + params.authorName;

      console.log(url);
      await axios
        .get(url)
        .then((res) => {
          if (res.status !== 200) {
            throw Error("Data currently not available");
          }
          setState({ tData: res.data });
          setBusy(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }

    fetchData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <Loading error={error} />;

  return (
    <AuthorDisplay
      authorName={params.authorName}
      threads={state.tData.threads}
    />
  );
}
