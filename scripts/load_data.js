const fs = require("fs");
const path = require("path");

const filePath = '../data/threads/';

function loadData(user){
  try {
    const data = fs.readFileSync(filePath+user, 'utf8')
    const threads = JSON.parse(data);
    const roots = Object.keys(threads);
    console.log(threads[roots[0]])
  } catch (err) {
    console.error(err)
  }
}

function listUsers(folder){
  const users = [];
  fs.readdirSync(folder).forEach(file => {
    users.push(file.substring(0,file.length-5));
  });
  console.log(users)
}
listUsers(filePath)
/* loadData("punk6529.json") */
