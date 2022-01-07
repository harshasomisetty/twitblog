import {
  editSent,
  getTweetLink,
  getUserLink,
  formatDate,
} from "../utils/functions.js";
import CopyButton from "../components/CopyTextButton.js";
import {Link} from "react-router-dom";

const ThreadMetadata = ({data, tweets}) => {
  let d1 = formatDate(data.statistics["oldest_tweet"] * 1000);
  let d2 = formatDate(data.statistics["youngest_tweet"] * 1000);

  return (
    <div className="flex flex-col justify-around mx-4 space-y-2">
      <div className="flex flex-col space-y-3 rounded border border-gray-400 p-2  antialiased text-sm">
        <p>Keywords: {data.keywords.join(", ")}</p>
        <p>
          Thread active from: {d1} to {d2}
        </p>
      </div>

      <CopyButton tweets={tweets} />

      <p className="text-xs p-2 italic">Click Tweet to go to link</p>
    </div>
  );
};

const ThreadReader = ({tweets, author}) => (
  <div className="grid grid-cols-1 divide-y divide-gray-700 p-1.5">
    {tweets.map((t) => (
      <a href={getTweetLink(t[1], author)}>
        <div key={t[1]} className=" mb-2 p-2">
          <p className="whitespace-pre-line antialiased">{editSent(t[0])}</p>
        </div>
      </a>
    ))}
  </div>
);

const ThreadView = ({data, tweets, author}) => (
  <div className="flex flex-col divide-y divide-gray-500">
    <Link to={"/author/" + author}>
      <h2 className="sticky top-0 bg-backgroundcol  p-4">{author}'s Thread</h2>
    </Link>

    <div className="grid grid-cols-1 divide-y divide-gray-500 gap-4 py-4">
      <ThreadMetadata data={data} tweets={tweets} />
      <ThreadReader tweets={tweets} author={author} />
    </div>
  </div>
);
export default ThreadView;
