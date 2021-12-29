import { Link } from "react-router-dom";
import { capitalizeSent, sortTypes } from "../utils/functions.js";
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
  author = true,
}) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3 m-5 overflow-auto scrollbar-hide`}
  >
    {sortThreads(threads, sortType, reverse).map((thread, ind) => (
      <div key={thread["_id"]}>
        <Link to={`/thread/${thread["_id"]}`}>
          <div className="relative flex flex-row gap-2 h-80 rounded-lg border-2 border-gray-600 p-6 overflow-hidden">
            {/* <div className="border-0 border-gray-700"> */}
            {/* <p>{ind + 1}</p> */}
            {/* </div> */}
            <div className="flex flex-col justify-between border-0 border-gray-700 h-full w-full">
              <div className="flex flex-row justify-between items-end space-x-3 w-full text-center border-b leading-1 m-2 h-5 ">
                {author && <p className="text-xl">{thread.author}</p>}
                <p className="text-lg">
                  {thread.statistics.thread_length} Tweets
                </p>
              </div>

              <p className="m-2 h-5/6 font-normal text-sm antialiased indent-8">
                {" "}
                {thread.tweets[0][0]}
              </p>

              <div className="flex flex-col w-full h-12 text-left border-t m-2 ">
                <p className="text-xs font-light py-2 text-clip overflow-hidden h-6">
                  Keywords: {thread.keywords.join(", ")}
                </p>

                <div className="flex flex-row justify-between space-x-2">
                  {Object.keys(sortTypes)
                    .slice(0, 3)
                    .map((key) => (
                      <p className="text-xs font-extralight">
                        {capitalizeSent(key)}:{" "}
                        {thread.statistics[sortTypes[key]]}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

export default ThreadList;
