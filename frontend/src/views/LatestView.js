import ThreadList from "../components/ThreadList.js";

export default function LatestView({threadData}) {
  return (
    <div className="flex flex-col">
      <h4 className="p-2">Latest Threads</h4>
      <ThreadList threads={threadData} cols={1} author={true} />
    </div>
  );
}
