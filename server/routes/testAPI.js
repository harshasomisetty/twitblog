const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  console.log("hmm")
  res.send({ title: "API is working properly" });
});

module.exports = router;
