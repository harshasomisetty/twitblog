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

export const sortTypes = {
  Likes: "like_count",
  "Thread Length": "thread_length",
  Retweets: "retweet_count",
  Replies: "reply_count",
  Quotes: "quote_count",
  "Oldest Start": "oldest_tweet",
  "Recently Updated": "youngest_tweet",
};
