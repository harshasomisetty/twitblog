import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ThreadView from "../views/ThreadView.js";
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
        setState({
          keywords: response[1].keywords,
          texts: response[1].texts,
          ids: response[1].ids,
          statistics: response[1].statistics,
          author: response[1].author,
        });
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
      <ThreadView
        keywords={state.keywords}
        texts={state.texts}
        ids={state.ids}
        author={state.author}
        statistics={state.statistics}
      />
    );
  }
}
