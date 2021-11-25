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
