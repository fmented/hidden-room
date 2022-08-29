const fs = require('fs');
const c = require('node:crypto')



fs.writeFile('server/key.ts', 
    `
    export const KEY='${c.randomBytes(32).toString('hex')}';
    export const IV='${c.randomBytes(16).toString('hex')}';
    `, 
    (err)=> {
        if (err) return console.log(err);
        console.log('Key is saved in key.ts');
});