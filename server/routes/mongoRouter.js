const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' })

const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+encodeURIComponent(process.env.MONGO_PASS)+"@cluster0.apaqs.mongodb.net/"+process.env.MONGO_DB+ "?retryWrites=true&w=majority"

const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

router.get('/', async function(req, res, next) {
  await run()
  /* console.log(process.env.MONGO_USER) */
  /* console.log(uri) */
  res.send({title: "API is working properly"});
  });

module.exports = router;
