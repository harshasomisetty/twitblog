import {
  editSent,
  getTweetLink,
  getUserLink,
  formatDate,
} from "../utils/functions.js";
import CopyButton from "../components/CopyTextButton.js";
import {Link} from "react-router-dom";

const ThreadMetadata = ({statistics, keywords, texts}) => {
  let d1 = formatDate(statistics["oldest_tweet"] * 1000);
  let d2 = formatDate(statistics["youngest_tweet"] * 1000);

  return (
    <div className="flex flex-col justify-around mx-4 space-y-2">
      <div className="flex flex-col space-y-3 rounded border border-gray-400 p-2  antialiased text-sm">
        <p>Keywords: {keywords.join(", ")}</p>
        <p>
          Thread active from: {d1} to {d2}
        </p>
      </div>

      <CopyButton tweets={texts} />

      <p className="text-xs p-2 italic">Click Tweet to go to link</p>
    </div>
  );
};

const ThreadReader = ({ids, author, texts}) => (
  <div className="grid grid-cols-1 divide-y divide-gray-700 p-1.5">
    {ids.map((t, i) => (
      <a href={getTweetLink(t, author)}>
        <p key={i} className="mb-2 p-2 whitespace-pre-line antialiased">
          {editSent(texts[i])}
        </p>
      </a>
    ))}
  </div>
);

const ThreadView = ({keywords, texts, ids, author, statistics}) => (
  <div className="flex flex-col divide-y divide-gray-500">
    <Link to={"/author/" + author}>
      <h2 className="sticky top-0 bg-backgroundcol  p-4">{author}'s Thread</h2>
    </Link>

    <div className="grid grid-cols-1 divide-y divide-gray-500 gap-4 py-4">
      <ThreadMetadata
        statistics={statistics}
        keywords={keywords}
        texts={texts}
      />
      <ThreadReader ids={ids} author={author} texts={texts} />
    </div>
  </div>
);
export default ThreadView;
