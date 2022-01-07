import ThreadList from "../components/ThreadList.js";
import {sortTypes} from "../utils/functions.js";

export default function LatestView({threadData}) {
  console.log(Object.keys(sortTypes));
  return (
    <div className="flex flex-col">
      <h4 className="p-2">Latest Threads</h4>
      <ThreadList
        threads={threadData}
        sortType={Object.values(sortTypes)[4]}
        reverse={false}
        cols={1}
        author={true}
      />
    </div>
  );
}
