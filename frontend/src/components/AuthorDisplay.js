import { Link } from "react-router-dom";

const AuthorDisplay = ({ authorName, threads }) => (
  <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
    <h3>{authorName}</h3>
    {threads.map((thread) => (
      <div key={thread["_id"]} className="ml-3 mb-1">
        <Link to={`/thread/${thread["_id"]}`}>{thread["keywords"]}</Link>
      </div>
    ))}
  </div>
);

export default AuthorDisplay;
