import { Link } from "react-router-dom";

const ThreadList = ({ threads, cols = 2, author = false }) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3 m-5 overflow-auto scrollbar-hide`}
  >
    {threads.map((thread, ind) => (
      <Link to={`/thread/${thread["_id"]}`}>
        <div
          key={thread["_id"]}
          className="relative flex flex-row gap-2 items-center rounded border-2 border-gray-600 p-4 "
        >
          <div className="border-2 border-gray-700">
            <p>{ind + 1}</p>
          </div>
          <div className="border-2 border-gray-700">
            {author && <p>author: {thread.author}</p>}
            {thread.title ? (
              <p>title: {thread.title}</p>
            ) : (
              <p>keywords: {thread.keywords.join(", ")}</p>
            )}

            <p>length: {thread.statistics.thread_length}</p>
            <p>likes: {thread.statistics.like_count}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default ThreadList;
