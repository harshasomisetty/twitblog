const fs = require("fs");
const path = require("path");

const filePath = '../data/threads/';
const user = 'punk2659.json';

try {
  const data = fs.readFileSync(filePath+user, 'utf8')
  const threads = JSON.parse(data);
  console.log(data)
} catch (err) {
  console.error(err)
}
