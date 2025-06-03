const calcucaltor = require('./calculator-cjs');
console.log("---------CommonJs Calculator---------");

console.log("Addition:", calcucaltor.add(2, 3));
console.log("Subtraction:", calcucaltor.subtract(5, 2));
console.log("Multiplication:", calcucaltor.multiply(4, 6));
console.log("Division:", calcucaltor.divide(10, 2));
console.log("Division:", calcucaltor.divide(10, 0));