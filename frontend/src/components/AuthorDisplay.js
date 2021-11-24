import { Link } from "react-router-dom";

const AuthorDisplay = ({ authorName, threads }) => (
  <div>
    <p>{authorName}</p>
    {threads.map((thread) => (
      <div key={thread["_id"]}>
        <Link to={`/thread/${thread["_id"]}`}>{thread["keywords"]}</Link>
      </div>
    ))}
  </div>
);

export default AuthorDisplay;
