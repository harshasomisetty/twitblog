import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ExploreView from "../views/ExploreView.js";
import Loading from "../components/Loading.js";
import callApi from "../utils/api.js";

export default function Explore() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData(params) {
      let response = await callApi(params);
      if (response[0]) {
        setState({threadData: response[1]});
        // console.log(state.threadData);
        setBusy(false);
      } else {
        setError(response[1]);
      }
    }
    fetchData("search/" + params.searchTerm);
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log(state.threadData);
  if (isBusy) return <Loading error={error} />;

  return (
    <ExploreView
      searchTerm={params.searchTerm}
      threadData={state.threadData.threads}
    />
  );
}
