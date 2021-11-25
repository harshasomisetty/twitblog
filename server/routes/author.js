const express = require("express");
const router = express.Router();

function getThreadLink(author, statusId) {
  // return "https://twitter.com/" + author + "/status/" + statusId;
  return statusId;
}

router.get("/", async function (req, res) {
  const collection = req.app.locals.twitter.collection("threads");
  const distinct = await collection.distinct("author");

  res.send({ authorList: distinct });
});

router.get("/:author", async function (req, res) {
  const author = req.params.author;
  const data = [];

  const collection = req.app.locals.twitter.collection("threads");

  const roots = await collection.find({ author: author });

  await roots.forEach(function (doc) {
    data.push(doc);
  });

  console.log(data[0]);
  res.send({ threads: data });
});

module.exports = router;
