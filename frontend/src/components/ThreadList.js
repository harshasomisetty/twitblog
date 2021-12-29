import { Link } from "react-router-dom";

function sortThreads(threads, sortType, reverse) {
  const s = reverse * 1 === 0 ? -1 : 1;

  return threads.sort((a, b) =>
    a.statistics[sortType] > b.statistics[sortType] ? s : -s
  );
}

const ThreadList = ({
  threads,
  sortType,
  reverse,
  cols = 2,
  author = false,
}) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3 m-5 overflow-auto scrollbar-hide`}
  >
    {sortThreads(threads, sortType, reverse).map((thread, ind) => (
      <div key={thread["_id"]}>
        <Link to={`/thread/${thread["_id"]}`}>
          <div className="relative flex flex-row gap-2 items-center rounded border-2 border-gray-600 p-4 ">
            <div className="border-0 border-gray-700">
              <p>{ind + 1}</p>
            </div>
            <div className="border-0 border-gray-700">
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
      </div>
    ))}
  </div>
);

export default ThreadList;
