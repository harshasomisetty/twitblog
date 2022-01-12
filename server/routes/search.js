const express = require("express");
const router = express.Router();

router.get("/:query", async function (req, res) {
  data = [];
  const collection = req.app.locals.twitter.collection("threads");
  const latest = await collection
    .find({$text: {$search: req.params.query}})
    .sort({"statistics.youngest_tweet": -1})
    .limit(20);
  await latest.forEach(function (doc) {
    data.push(doc);
  });
  res.send({threads: data});
});

module.exports = router;
