import ThreadList from "./ThreadList.js";

export default function LatestDisplay({ threadData }) {
  return (
    <div className="flex flex-col">
      <h3 className="p-2">This is happening</h3>
      <ThreadList threads={threadData} cols={1} author={true} />
    </div>
  );
}