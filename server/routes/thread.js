const express = require("express");
const router = express.Router();

function getThreadLink(author, statusId) {
  // return "https://twitter.com/" + author + "/status/" + statusId;
  return statusId;
}

router.get("/:thread", async function (req, res) {
  const threadid = req.params.thread;
  const collection = req.app.locals.twitter.collection("threads");

  const threadData = await collection.findOne({ _id: String(threadid) });

  console.log(threadData["text"]);
  res.send({ threadData: threadData["text"] });
});

module.exports = router;
