const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  const data = [];
  const collection = req.app.locals.twitter.collection("threads");
  const latest = await collection
    .find()
    .sort({ "statistics.youngest_tweet": -1 })
    .limit(20);
  await latest.forEach(function (doc) {
    data.push(doc);
  });

  res.send({ threadData: data });
});

module.exports = router;
