var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });

var assert = require("assert");

describe("Mongo Env Test", function () {
  it("Mongo should have env var and connect properly", function () {
    MongoClient.connect(process.env.MONGO_URI, function (err, client) {
      assert.equal(null, err);
    });
  });
});
