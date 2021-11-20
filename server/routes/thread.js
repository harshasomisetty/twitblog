const express = require("express");
const router = express.Router();

router.get("/:thread", async function (req, res) {
  const threadid = req.params.thread;
  const collection = req.app.locals.twitter.collection("threads");

  const threadData = await collection.findOne({ _id: String(threadid) });

  res.send({ threadData: threadData, tweets: threadData["tweets"] });
});

module.exports = router;
