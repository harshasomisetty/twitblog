const express = require('express');
const router = express.Router();


router.get('/:query', async function(req, res){
  const collection = req.app.locals.threads.collection("VitruviusCurve");
  
  /* await collection.createIndex( {text: "text", keywords: "text"} ) */
  const test = await collection.findOne({$text: {$search: req.params.query}})
  res.send(test["text"])
  console.log(typeof(req.params.query))
  /* console.log(test) */
})

module.exports = router;
