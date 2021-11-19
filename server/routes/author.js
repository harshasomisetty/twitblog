const express = require("express");
const router = express.Router();

function getThreadLink(author, statusId) {
  // return "https://twitter.com/" + author + "/status/" + statusId;
  return statusId;
}

router.get("/:author", async function (req, res) {
  const author = req.params.author;
  const ids = [];
  const data = [];
  const collection = req.app.locals.twitter.collection("threads");

  console.log(author);

  const roots = await collection.find({ author: author });
  await roots.forEach(function (doc) {
    ids.push(getThreadLink(author, doc["keywords"]));
    data.push(doc);
  });
  console.log(ids[0]);
  console.log(data[0]);
  // res.send({ statuses: ids, title: String(ids[0]) });
  res.send({ threads: data });
  /* res.send(ids.join("\n\n")) */
});

module.exports = router;
