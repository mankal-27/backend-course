const express = require('express'); //1. Import Express Library
const app = express();//2. Create an express application instance
const PORT = process.env.PORT || 3000;


//3. Define a basic route for the root URL ('/')
// app.METHOD(PATH, HANDLER)
// app.get() Handles get requests

app.get('/', (req, res) => {
    // This function is the route handler
    // req: the request object (enhanced by Express)
    // res: the response object (enhanced by Express)
    
    // Express's res.send() method automatically sets Content-type
    // and hangles various data types ( strings, object, array, buffer).
    
    res.send('Hello World! From Express!');
});

//4. Start the server

app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
