const fs = require('fs');

console.log("1. Starting to Read File");

fs.readFile('large_file.txt', 'utf-8', (err, data) => {
  if(err){
    console.error('Error reading file', err);
    return;
  }
  console.log("3. Finished Reading File");
  console.log(data);
})

console.log("2. Finished Reading File");