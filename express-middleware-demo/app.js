// app.js (in your new express-middleware-demo project)

const express = require('express');
const app = express();
const PORT = 3000;

// --- 1. Built-in Middleware ---

// express.json() - Parses incoming JSON requests and puts the parsed data in req.body
// This must be placed before any routes that need to read JSON from the request body.
app.use(express.json());

// express.urlencoded() - Parses incoming URL-encoded requests (e.g., from HTML forms)
// and puts the parsed data in req.body
app.use(express.urlencoded({ extended: true })); // `extended: true` allows rich objects and arrays to be encoded into the URL-encoded format

// express.static() - Serves static files (e.g., HTML, CSS, images) from the 'public' directory
// Clients can access files like http://localhost:3000/index.html, http://localhost:3000/style.css
app.use(express.static('public'));


// --- 2. Custom Application-level Middleware ---

// A simple logger middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[${timestamp}] ${method} ${url}`);
    next(); // IMPORTANT: Pass control to the next middleware/route handler
});

// A custom authentication check middleware (simplified example)
function authMiddleware(req, res, next) {
    // In a real app, you'd check headers, tokens, sessions, etc.
    const isAuthenticated = req.headers.authorization === 'Bearer mysecrettoken';
    
    if (isAuthenticated) {
        // You can add properties to the request object for downstream handlers
        req.user = { id: 1, name: 'Alice' };
        next(); // User is authenticated, proceed
    } else {
        res.status(401).send('Unauthorized: Missing or invalid token.'); // End the cycle
    }
}


// --- 3. Routes (after middleware) ---

app.get('/', (req, res) => {
    // If you visit http://localhost:3000/index.html, this route won't be hit
    // because express.static will serve it first.
    res.send('<h1>Hello from the home page!</h1><p>Check the console for logs.</p>');
});

app.get('/dashboard', authMiddleware, (req, res) => {
    // This route will only be accessible if authMiddleware calls next()
    res.send(`Welcome to the dashboard, ${req.user.name}!`); // Accessing req.user added by middleware
});

app.post('/data', (req, res) => {
    // req.body is populated by express.json() or express.urlencoded()
    console.log('Received data:', req.body);
    res.status(200).json({ message: 'Data received!', yourData: req.body });
});

// --- 4. Error-handling Middleware (Always at the very end of your middleware stack) ---
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console for debugging
    res.status(500).send('Something broke!'); // Send a generic error response to the client
});


// Start the server
app.listen(PORT, () => {
    console.log(`Express server running with middleware on http://localhost:${PORT}`);
    console.log('Test Endpoints:');
    console.log('- GET /');
    console.log('- GET /dashboard (try with/without Authorization: Bearer mysecrettoken header)');
    console.log('- POST /data (send JSON or form data)');
    console.log('- (If you create public/index.html) GET /index.html');
    console.log('\nPress Ctrl+C to stop.');
});