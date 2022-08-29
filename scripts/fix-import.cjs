const fs = require('fs');
const filePath = 'server/build/server.js'
const q1 = `../build//handler.js`
const q2 = `../build/handler.js`
const data = fs.readFileSync(filePath, 'utf-8')

let res;

if(data.includes(q1)) res = data.replace(q1, `../${q1}`)
else if(data.includes(q2)) res = data.replace(q2, `../${q2}`)

fs.writeFileSync(filePath, res||data, 'utf-8')