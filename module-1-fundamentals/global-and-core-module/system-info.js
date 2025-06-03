/*
Join a few path segments (e.g., current_dir, data, my_file.txt). Use __dirname (another global variable for the current script's directory) as the first segment.
 */

const path = require('path');

const filePath = '/home/memoub/Desktop/CourseUd/backend-course/module-1-fundamentals/large_file.txt';
console.log(filePath);

const os = require('os');
console.log(os.platform());
console.log(os.arch());
console.log(os.version());
console.log(os.homedir());

const fs = require('fs');
const data = fs.readFileSync(filePath, 'utf-8');
console.log(data);
