const express = require("express");
const app = express();
const cors = require("cors");
const assert = require("assert");
const port = process.env.PORT || 5000;
app.use(cors());

var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: "../.env" });

MongoClient.connect(process.env.MONGO_URI, function (err, client) {
  assert.equal(null, err);
  console.log("Mongo Connected");
  app.locals.threads = client.db("threads");
  /* app.locals.authors = client.db('authors') */
});

const testAPIRouter = require("./routes/testAPI");
const searchRouter = require("./routes/search");
const authorRouter = require("./routes/author");

app.get("/", function (req, res) {
  res.send("hi from express main post restruc");
});

app.use("/testAPI", testAPIRouter);
app.use("/search", searchRouter);
app.use("/author", authorRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
