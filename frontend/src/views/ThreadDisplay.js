import { editSent, getTweetLink, getUserLink } from "../utils/functions.js";
import CopyButton from "../components/CopyTextButton.js";

function formatDate(d) {
  return new Date(d).toISOString().split("T")[0];
}

const ThreadMetadata = ({ data, tweets }) => {
  let d1 = formatDate(data.statistics["oldest_tweet"] * 1000);
  let d2 = formatDate(data.statistics["youngest_tweet"] * 1000);

  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col space-y-3 rounded border-2 border-gray-400 p-2">
        <p>Keywords: {data.keywords.join(", ")}</p>
        <p>
          Thread active from: {d1} to {d2}
        </p>
        <CopyButton tweets={tweets} />
      </div>
    </div>
  );
};

const ThreadReader = ({ tweets, author }) => (
  <div className="grid grid-cols-1 divide-y divide-gray-700 p-1.5">
    {tweets.map((t) => (
      <a href={getTweetLink(t[1], author)}>
        <div key={t[1]} className=" mb-2 p-2">
          <p className="whitespace-pre-line">{editSent(t[0])}</p>
        </div>
      </a>
    ))}
  </div>
);

const ThreadView = ({ data, tweets, author }) => (
  <div className="flex flex-col">
    <a href={getUserLink(author)}>
      <h2 className="sticky top-0 bg-backgroundcol border-2 p-4">
        {author}'s Thread
      </h2>
    </a>

    <div className="grid grid-cols-1 divide-y divide-gray-300 gap-4 py-4">
      <ThreadMetadata data={data} tweets={tweets} />
      <ThreadReader tweets={tweets} author={author} />
    </div>
  </div>
);
export default ThreadView;
