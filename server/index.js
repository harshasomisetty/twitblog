const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())



const testAPIRouter = require("./routes/testAPI");
const mongoRouter = require("./routes/mongoRouter");
const port = process.env.PORT || 5000


app.get('/', function (req, res) {
  res.send("hi from express main post restruc")
})

app.use("/testAPI", testAPIRouter);
app.use("/mongo", mongoRouter);

app.get('/search', function (req, res) {
  const { term, offset } = req.query
  res.send(search.queryTerm(term, offset))

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


