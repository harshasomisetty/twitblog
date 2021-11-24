import { editSent, capitalizeSent, getTweetLink } from "./utils.js";

const ThreadMetadata = ({ data }) => (
  <div className="flex flex-row justify-around ">
    <div className="rounded border-2 border-gray-400 p-2">
      <p>Author: {data.author}</p>
      <p>Keywords: {data.keywords}</p>
    </div>

    <div className="rounded border-2 border-gray-400 p-2">
      {Object.keys(data.engagement).map((key) => (
        <p>
          {capitalizeSent(key)}: {data.engagement[key]}
        </p>
      ))}
    </div>
  </div>
);

const ThreadReader = ({ tweets, author }) => (
  <div className="grid grid-cols-1 divide-y divide-gray-700 p-1.5">
    {tweets.map((t) => (
      <div key={t[1]} className=" mb-2">
        <a href={getTweetLink(t[1], author)}>{editSent(t[0])}</a>
      </div>
    ))}
  </div>
);

const ThreadDisplay = ({ data, tweets, author }) => (
  <div className="flex flex-col justify-end">
    <ThreadMetadata data={data} />
    <ThreadReader tweets={tweets} author={author} />
  </div>
);
export default ThreadDisplay;
