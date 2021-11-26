import { editSent, capitalizeSent, getTweetLink } from "./utils.js";
import { IoCopyOutline } from "react-icons/io5";
import { positions, Provider } from "react-alert";
import { useAlert } from "react-alert";

const ThreadMetadata = ({ data, tweets }) => {
  const alert = useAlert();
  function Clickcopy(text) {
    alert.success("Copied Text", {
      timeout: 2000,
      position: positions.TOP_CENTER,
    });

    navigator.clipboard.writeText(text);
  }
  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col space-y-3 rounded border-2 border-gray-400 p-2">
        <p>Author: {data.author}</p>
        <p>Keywords: {data.keywords}</p>
        <div>
          <button
            type="button"
            onClick={() => {
              Clickcopy(tweets.map((t) => t[0]).join("\n\n***\n\n"));
            }}
            className="border-2 rounded px-2 py-1"
          >
            <div className="flex flex-row space-x-3">
              <IoCopyOutline
                size="18"
                className="text-gray-500 font-extralight my-auto"
              />
              <p>Copy Thread</p>
            </div>
          </button>
        </div>
      </div>

      <div className="rounded border-2 border-gray-400 p-2">
        {Object.keys(data.statistics).map((key) => (
          <p>
            {capitalizeSent(key)}: {data.statistics[key]}
          </p>
        ))}
      </div>
    </div>
  );
};

const ThreadReader = ({ tweets, author }) => (
  <div className="grid grid-cols-1 divide-y divide-gray-700 p-1.5">
    {tweets.map((t) => (
      <a href={getTweetLink(t[1], author)}>
        <div key={t[1]} className=" mb-2">
          {editSent(t[0])}
        </div>
      </a>
    ))}
  </div>
);

const ThreadDisplay = ({ data, tweets, author }) => (
  <div className="flex flex-col justify-between ">
    <ThreadMetadata data={data} tweets={tweets} />
    <ThreadReader tweets={tweets} author={author} />
  </div>
);
export default ThreadDisplay;
