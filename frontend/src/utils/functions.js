import {CgSortAz, CgSortZa} from "react-icons/cg";

export function editSent(str) {
  return str.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&");
}

export function capitalizeSent(str) {
  const arr = editSent(str).replace("_", " ").split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

export function getTweetLink(id, author) {
  return "https://twitter.com/" + author + "/status/" + id;
}

export function getUserLink(author) {
  return "https://twitter.com/" + author;
}

export function formatDate(d) {
  return new Date(d).toISOString().split("T")[0];
}

export const sortTypes = {
  Likes: "like_count",
  Retweets: "retweet_count",
  Replies: "reply_count",
  // Quotes: "quote_count",
  "Thread Length": "thread_length",
  // "Oldest Start": "oldest_tweet",
  "Recently Updated": "youngest_tweet",
};

export function Reverse(props) {
  return (
    <button type="button" onClick={() => props.setReverse(!props.reverse)}>
      {props.reverse ? (
        <div className="flex flex-row space-x-1">
          <p className="text-xs">Ascending</p>
          <CgSortZa
            size="15"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-1">
          <p className="text-xs">Descending</p>

          <CgSortAz
            size="15"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      )}
    </button>
  );
}
