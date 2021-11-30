const express = require("express");
const app = express();
const cors = require("cors");
const assert = require("assert");
const port = process.env.PORT || 5000;
app.use(cors());

var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });

MongoClient.connect(process.env.MONGO_URI, function (err, client) {
  assert.equal(null, err);
  console.log("Mongo Connected");
  app.locals.twitter = client.db("Twitter");
});

const searchRouter = require("./routes/search");
const authorRouter = require("./routes/author");
const threadRouter = require("./routes/thread");
const latestRouter = require("./routes/latest");

app.use("/search", searchRouter);
app.use("/author", authorRouter);
app.use("/thread", threadRouter);
app.use("/latest", latestRouter);

app.get("/", function (req, res) {
  res.send("Express Backend! ");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
