import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const axios = require("axios");

export default function Thread() {
  let params = useParams();

  const [state, setState] = useState();
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:5000/thread/" + params.rootThread;

      await axios
        .get(url)
        .then((res) =>
          setState({ threadData: res.data.threadData, tweets: res.data.tweets })
        )
        .catch(function (error) {
          console.log(error);
        });
      setBusy(false);
    }
    fetchData();
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isBusy) return <p>loading</p>;
  else {
    return (
      <div className="flex flex-col justify-end">
        <MetaData data={state.threadData} />
        <ThreadText tweets={state.tweets} author={state.threadData.author} />
      </div>
    );
  }
}

function editSent(str) {
  return str.replace("&gt;", ">").replace("&lt;", "<");
}
function capitalizeSent(str) {
  const arr = editSent(str).replace("_", " ").split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

const MetaData = ({ data }) => (
  <div className="flex flex-row justify-around ">
    <div className="rounded border-2 border-gray-400 p-2">
      <p>Author: {data.author}</p>
      <p>Keywords: {data.keywords}</p>
    </div>

    <div className="rounded border-2 border-gray-400 p-2">
      {Object.keys(data.engagement).map((key) => (
        <p>
          {capitalizeSent(key)}: {data.engagement[key]}
        </p>
      ))}
    </div>
  </div>
);

function getTweetLink(id, author) {
  return "https://twitter.com/" + author + "/status/" + id;
}

const ThreadText = ({ tweets, author }) => (
  <div className="grid grid-cols-1 divide-y divide-gray-500">
    {tweets.map((t) => (
      <div key={t[1]} className=" mb-2">
        <a href={getTweetLink(t[1], author)}>{editSent(t[0])}</a>
      </div>
    ))}
  </div>
);
