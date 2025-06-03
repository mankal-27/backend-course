import { add, subtract, multiply, divide } from "./calculator-esm.mjs";

console.log("---------ESM Calculator---------");

console.log("Addition:", add(2, 3));
console.log("Subtraction:", subtract(5, 2));
console.log("Multiplication:", multiply(4, 6));
console.log("Division:", divide(10, 2));
console.log("Division:", divide(10, 0));