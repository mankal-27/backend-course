// app.js (main file)
const express = require('express');
const app = express();
const booksRouter = require('./routes/books');
const PORT = 3000;

//Global Middleware
// Middleware to parse JSON request bodies
// IMPORTANT: This needs to be before your routes that handle POST/PUT/PATCH with JSON
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Welcome to the Modular Books API!');
})

//Mount the booksRouter at the /api/books path
// All routes defined in booksRouter will be prefixed with /api/books
app.use('/api/books', booksRouter);

// Fallback route for 404 Not Found
app.use((req, res) => {
    res.status(404).send('Sorry, that route does not exist.');
});

//Error-handling middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Books API routes now available under http://localhost:${PORT}/api/books`);
    console.log('\nPress Ctrl+C to stop the server.');
});