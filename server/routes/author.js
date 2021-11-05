const express = require("express");
const router = express.Router();

function getThreadLink(author, statusId) {
  return "https://twitter.com/" + author + "/status/" + statusId;
}

router.get("/:author", async function (req, res) {
  const author = req.params.author;
  const ids = [];
  const collection = req.app.locals.threads.collection(author);

  console.log(author);

  const roots = await collection.find({});
  await roots.forEach(function (doc) {
    ids.push(getThreadLink(author, doc["root_id"]));
  });

  console.log(ids[0]);
  res.send({ title: String(ids[0]) });
  /* res.send(ids.join("\n\n")) */
});

module.exports = router;
