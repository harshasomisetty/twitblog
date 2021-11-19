import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function ThreadData() {
  const [thread, setThread] = useState({ threadData: " klj" });

  let params = useParams();

  useEffect(() => {
    const url = "http://localhost:5000/thread/" + params.rootThread;
    console.log(url);
    axios
      .get(url)
      .then((res) => setThread({ threadData: res.data.threadData }));
  }, []);
  console.log(thread);
  return (
    <div>
      {thread.threadData.map((tweet) => (
        <p>{tweet}</p>
      ))}
    </div>
  );
}
// {thread.keys().map((key) => (
//   <p>{key}</p>
// ))}
