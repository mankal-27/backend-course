/*
 write code to demonstrate process.argv, process.platform, process.cwd(), and console.table() with a small array of objects (e.g., users or products).
 
 */

const os = require('os');

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Alice' },
  { id: 5, name: 'Charlie' },
  { id: 6, name: 'David' },
  { id: 7, name: 'Eva' },
  { id: 8, name: 'Frank' },
  { id: 9, name: 'Grace' },
  { id: 10, name: 'Hank' },
];

const products = [
  { id: 1, name: 'Widget A', price: 9.99 },
  { id: 2, name: 'Widget B', price: 19.99 },
  { id: 3, name: 'Widget C', price: 29.99 },
  { id: 4, name: 'Widget D', price: 39.99 },
  { id: 5, name: 'Widget E', price: 49.99 },
  { id: 6, name: 'Widget F', price: 59.99 },
  { id: 7, name: 'Widget G', price: 69.99 },
  { id: 8, name: 'Widget H', price: 79.99 },
  { id: 9, name: 'Widget I', price: 89.99 },
  { id: 10, name: 'Widget J', price: 99.99 },
];

console.log('Global Objects');
console.log("------------Users:---------------");
console.table(users);
console.log('----------------End of Users List --------------');

console.log("--------------Products:---------------");
console.table(products);
console.log('----------------End of Products List --------------');

console.log('Node.js version:', process.version);
console.log('Platform:', process.platform); // e.g., 'darwin' for macOS, 'win32' for Windows
console.log('Current working directory:', process.cwd());
console.log('Command line arguments:', process.argv);

// To demonstrate process.exit
if (process.argv.includes('--exit')) {
  console.log('Exiting the process now!');
  process.exit(1); // Exit with an error code
}

// settTimeout logs a message after 2 seconds
setTimeout(() => {
  console.log('This message will be logged after 2 seconds.');
}, 2000);