//simple http server
const http = require('http');
const server = http.createServer((req, res) => {
  // req: Incoming request object (contains info about the request - used to get data from the client like the url, headers, etc.)
  // res: Outgoing response object (contains info about the response - used to send data back to the client)
  
  //Set the Http Header for a successful response (200 Ok)
  // Set the content type to plain text
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  //Send the response back to the client
  res.end('Hello From Node.js HTTO Server!\n'); // End the response
});

//Start the server and listen on port 3000

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
  console.log("Try Opening this url in your browser!")
});
