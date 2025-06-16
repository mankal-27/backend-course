const http = require('http');
const PORT = 3000;
const HOST = '127.0.0.1';

//1. create the server

const server = http.createServer((req, res) => {
    // this callback function is executed everytime a request comes in
    
    console.log(`Request received: Method - ${req.method}, URL: ${req.url}`);
    
    //2. Handle different routes/URLs
    if( req.url === '/'){
        //Root Path
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html') // Tell browser it's HTML
        res.end('<h1>Welcome to our Basic Node.js Server!</h1><p>Visit /about or /api</p>');
    }else if( req.url === '/about'){
        //About Page
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.end('This is the About page. we are learning Node.js HTTP server');
    } else if( req.url === '/api'){
        //A simple API endpoint sending JSON
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const data = {
            message: 'Hello from API!',
            timestamp: new Date().toISOString()
        }
        res.end(JSON.stringify(data));
    }else if( req.url === '/redirect'){
        //Redirect example
        res.statusCode = 302; //Found (Temporary redirect)
        res.setHeader('Location', '/about'); // Redirect to the /about page
        res.end(); // Must call end
    }else if(req.method === 'POST' && req.url === '/submit'){
        let body = '';
        req.on('data', (chunk) => {
            //collect data chunks as they arrive
            body += chunk.toString(); // Convert Buffer chunk to string
        })
        req.on('end', () => {
            // All data has been received
            console.log('Received POST Body: ', body);
            
            try{
                const parsedData = JSON.parse(body); // Assuming Json
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify({ message: 'Data received and parsed data!', yourData: parsedData }));
            } catch(err) {
                res.statusCode = 400; //Bad reuqest
                res.setHeader('Content-type', 'text/plain');
                res.end('Invalid JSON in request body.')
            }
        })
    }
    else {
        // 404 Not Found for any other URL
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found - The page requested doesn\'t exist!');
    }
})

//3. Start the server and listen for connections

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
    console.log('Open your browser and try the following URLs:');
    console.log(` http://${HOST}:${PORT}/`);
    console.log(` http://${HOST}:${PORT}/about`);
    console.log(` http://${HOST}:${PORT}/api`);
    console.log(` http://${HOST}:${PORT}/redirect`);
    console.log(` http://${HOST}:${PORT}/notexistenent`);
    console.log('Press CTRL+C to redirect to the server');
});
