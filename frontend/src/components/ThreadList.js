import {Link} from "react-router-dom";
import {capitalizeSent, sortTypes, formatDate} from "../utils/functions.js";
function sortThreads(threads, sortType, reverse) {
  const s = reverse * 1 === 0 ? -1 : 1;

  return threads.sort((a, b) =>
    a.statistics[sortType] > b.statistics[sortType] ? s : -s
  );
}

export default function ThreadList({
  threads,
  sortType,
  reverse,
  cols = 1,
  author = true,
}) {
  console.log(sortType);
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-${cols} gap-3 m-5 overflow-auto scrollbar-hide`}
    >
      {sortThreads(threads, sortType, reverse).map((thread, ind) => (
        <div key={thread["_id"]}>
          <Link to={`/thread/${thread["_id"]}`}>
            <div className="relative flex flex-row gap-2 h-80 rounded-lg border-2 border-gray-600 p-4 sm:p-6 overflow-hidden">
              {/* <div className="border-0 border-gray-700"> */}
              {/* <p>{ind + 1}</p> */}
              {/* </div> */}

              {/* thread card */}
              <div className="flex flex-col justify-between border-0 border-gray-700 h-full w-full">
                <div className="h-min flex flex-row justify-between items-end space-x-3 w-full text-center border-b leading-1 h-5 ">
                  {author && <p className="text-xl">{thread.author}</p>}
                  <p className="text-sm pb-1">
                    {thread.statistics.thread_length} Tweets
                  </p>
                </div>

                <p className="h-2/3 font-normal text-sm antialiased indent-8 text-ellipsis overflow-hidden">
                  {thread.tweets[0][0]}
                </p>

                <div className="h-1/6 flex flex-col w-full h-12 text-left border-t">
                  <p className="text-xs font-light py-2 text-clip overflow-hidden h-6">
                    Keywords: {thread.keywords.join(", ")}
                  </p>

                  <div className="flex flex-row justify-between space-x-2">
                    {Object.keys(sortTypes)
                      .slice(0, 1)
                      .map((key) => (
                        <p className="text-xs font-extralight">
                          {capitalizeSent(key)}:{" "}
                          {thread.statistics[sortTypes[key]]}
                        </p>
                      ))}
                    <p className="text-xs font-extralight">
                      {capitalizeSent("Updated")}:{" "}
                      {formatDate(
                        thread.statistics[sortTypes["Recently Updated"]] * 1000
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* end of thread card */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
