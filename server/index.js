const express = require('express')
const cors = require('cors')
/* const search = require('./search') */
const app = express()
const testAPIRouter = require("./routes/testAPI");
const port = process.env.PORT || 3000

app.use(cors())

app.get('/', function (req, res) {
  res.send("hi from express main post restruc")
})

app.use("/testAPI", testAPIRouter);

app.get('/search', function (req, res) {
  const { term, offset } = req.query
  res.send(search.queryTerm(term, offset))

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


