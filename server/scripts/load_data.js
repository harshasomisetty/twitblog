const fs = require("fs");
const path = require("path");
const elastic = require('./elastic');

data_dir = "/../TData/threads/"

async function insertThreads(threads, author){
  let bulkOps = []
  const roots = Object.keys(threads);  

  for (let i = 0; i < roots.length; i++){
    cur_thread_root = roots[i]
    bulkOps.push({index: {_index: elastic.index, type: elastic.type}})
    bulkOps.push({
      title: threads[cur_thread_root]['keywords'].join(', '),
      author: author,
      root_id: cur_thread_root,
      text: threads[cur_thread_root]['text']
    })
    if (i > 0 && i % 500 === 0) { // Do bulk insert in 500 paragraph batches
      await elastic.esclient.bulk({ body: bulkOps })
      bulkOps = []
      console.log(`Indexed Threads ${i - 499} - ${i}`)
    }
  }
  await elastic.esclient.bulk({ body: bulkOps })
  console.log(`Indexed Threads ${roots.length - (bulkOps.length / 2)}`)
}

async function readThreads(){
  try {
    filePath = path.dirname(require.main.filename) + data_dir;

    await elastic.resetIndex()
    const authors = [];
    fs.readdirSync(filePath).forEach(file => {
      authors.push(file.substring(0,file.length-5));
    });
    
    for (let author of authors) {
      authorPath = filePath+author+".json"
      
      const rawThread = fs.readFileSync(authorPath)
      const threads = JSON.parse(rawThread);

      const roots = Object.keys(threads);
      console.log(roots.length)
      console.log(threads[roots[0]]['keywords'].join(', '))
      await insertThreads(threads, author)
    }
  } catch (err) {
    console.error(err)
  }
}

readThreads()
/* async function insertThreadData (title */
