var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });

const fs = require("fs");

var assert = require("assert");

describe("Mongo Env Test", function () {
  it("Mongo should have env var and connect properly", function () {
    MongoClient.connect(process.env.MONGO_URI, function (err, client) {
      console.log("dir");

      fs.readFile("./.env", "utf8", function (err, data) {
        if (err) throw err;
        console.log("OK: ");
        console.log(data);
      });

      fs.readFile("./testtxt", "utf8", function (err, data) {
        if (err) throw err;
        console.log("OK: ");
        console.log(data);
      });

      assert.equal(null, err);
    });
  });
});
