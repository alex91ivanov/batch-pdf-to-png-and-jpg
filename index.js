// console.clear();
const fs = require('fs');
const path = require('path');
const thisFile = path.basename(__filename);
const child_process = require('child_process');

function convertTo(extension, file) {
  child_process.spawn('convert',
    [`-quality 100% -density 100% ${path.join(__dirname, file)} ${path.join(__dirname, path.parse(file).name) + extension}`], {
      shell: '/usr/bin/bash'
    });
}

fs.readdir(__dirname, {
  encoding: 'utf8',
  withFileTypes: false
}, (err, files) => {
  if (err) throw err;
  for (let i of files) {
    if (i === thisFile) continue;
    if (path.extname(i) !== '.pdf') continue;
    convertTo('.jpg', i)
    convertTo('.png', i)
  }
})
