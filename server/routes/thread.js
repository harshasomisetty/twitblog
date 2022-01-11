const express = require("express");
const router = express.Router();

router.get("/:thread", async function (req, res) {
  const threadid = req.params.thread;
  const collection = req.app.locals.twitter.collection("threads");

  const data = await collection.findOne({_id: String(threadid)});
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  res.send({
    keywords: data["keywords"],
    texts: data["thread_texts"],
    ids: data["thread_ids"],
    author: data["author"],
    statistics: data["statistics"],
  });

  console.log(data["texts"]);
});

module.exports = router;
