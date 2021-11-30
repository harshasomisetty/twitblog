var MongoClient = require("mongodb").MongoClient;
require("dotenv").config({ path: ".env" });
// require("dotenv").config({ path: "../.dockerenv" });

const fs = require("fs");

var assert = require("assert");

const filename = "./testtxt.txt";
const database =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:B4ldr1c71@cluster0.apaqs.mongodb.net/TwitBlog?retryWrites=true&w=majority";

describe("Mongo Env Test", function () {
  it("Mongo should have env var and connect properly", function () {
    MongoClient.connect(database, function (err, client) {
      console.log(process.env);
      console.log("dir");

      fs.readdirSync(".").forEach((file) => {
        console.log(file);
      });

      console.log("prev\n");

      fs.readdirSync("..").forEach((file) => {
        console.log(file);
      });

      console.log("test read\n");
      fs.readFile(filename, "utf8", function (err, data) {
        if (err) throw err;
        console.log("OK: " + filename);
        console.log(data);
      });

      console.log("console work\n\n\n");

      // fs.appendFile("../.dockerenv", "Hello World!", function (err) {
      //   if (err) return console.log(err);
      // });
      // fs.readFile("../.dockerenv", "utf8", function (err, data) {
      //   if (err) throw err;
      //   console.log("dockerenv");
      //   console.log(data);
      // });

      assert.equal(null, err);
    });
  });
});
