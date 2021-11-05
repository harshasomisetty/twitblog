const express = require('express');
const router = express.Router();


router.get('/:author', async function(req, res){
  const ids = []
  const collection = req.app.locals.threads.collection(req.params.author)

  const roots = await collection.find({})
  await roots.forEach(function(doc) {ids.push("https://twitter.com/"+req.params.author+"/status/"+doc["root_id"])});

  res.send(ids.join("\n\n"))
})




module.exports = router;
