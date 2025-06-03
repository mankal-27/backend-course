const fs = require('fs');

console.log("1. Starting to Read File");

try{
  const data = fs.readFileSync('large_file.txt', 'utf-8');
  console.log("3. Finished Reading File");
  console.log(data);
} catch (err){
  console.error('Error reading file', err);
}
console.log("2. Finished Reading File");