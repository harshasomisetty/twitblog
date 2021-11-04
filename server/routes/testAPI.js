const express = require('express');
const router = express.Router();


async function run(req) {
  try {
    // Connect the client to the server
    const collection = req.app.locals.threads.collection("VitruviusCurve");
    /* const test = await collection.estimatedDocumentCount() */
    /* const test = await collection.findOne({root_id: "1441018345847808011"}) */

    const test = await collection.find(query)
    console.log(test)
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("code")
  }
}

router.get('/', async function(req, res, next) {
  await run(req)
  /* console.log(process.env.MONGO_USER) */
  /* console.log(uri) */
  res.send({title: "API is working properly"});
});

module.exports = router;
