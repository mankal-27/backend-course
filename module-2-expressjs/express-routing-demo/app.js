const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse JSON request body
// IMPORTANT: This needs to be before your routes that handle POST/PUT/PATCH with JSON
app.use(express.json());

// A simple in-memory database to store user data
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
];

let nextBookId = 4; // ID for the next book to be added

// -- Route Handlers --//

// Get /api/books - Get all Books
app.get('/api/books', (req, res) => {
    console.log(`Get /api/books request received .Query params: `, req.query);
    res.json(books); // Send the entire array of books as JSON response
});

// Get /api/books/:id - Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id); //Route parameter are strings by default, so we need to parse it to a number
    const book = books.find(b => b.id === id);
    
    if(book){
        res.json(book);
    }else {
        res.status(404).json({message: 'Book not found'});
    }
})

// Post /api/books - Create a new book
app.post('/api/books', (req, res) => {
    //req.body contains the JSON data sent in the request body
    const { title, author} = req.body;
    
    if(!title || !author){
        //send 404 Bad request if essential fields are missing
        return res.status(400).json({message: 'Title and Author are required'});
    }
    
    const newBook = {
        id: nextBookId++,
        title,
    }
    books.push(newBook); // add new book to the array
    //send 201 Created status and the newly created book
    res.status(201).json(newBook);
});

// Put /api/books/:id - Update a specific book by ID
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    
    if(bookIndex !== -1){
        // If book is found, update its title and author
        books[bookIndex] = {...books[bookIndex], title, author};
        console.log(books[bookIndex]);
        res.json(books[bookIndex]);
    }else {
        res.status(404).json({message: 'Book not found'});
    }
})

//Delete /api/books/:id - Delete a specific book by ID
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initalLength = books.length;
    books = books.filter(b => b.id !== id);
    
    if(books.length !== initalLength){
        // If length decreased, a book was deleted
        res.status(204).send(); // 204 No Content for successful deletion (no body returned)
    }else{
        res.status(404).json({message: 'Book not found'});
    }
})

// Fallback route for 404 Not Found
app.use((req, res) => {
    res.status(404).json({message: 'Sorry, that request does not exist!'});
})

// Start the server
app.listen(PORT, () => {
    console.log(`Express API server running on http://localhost:${PORT}`);
    console.log('Test with Postman or Browser at http://localhost:3000/api/books');
    console.log('\n--- API Endpoints ---');
    console.log('GET /api/books - Get all books');
    console.log('GET /api/books/:id - Get a specific book by ID');
    console.log('POST /api/books - Create a new book');
    console.log('PUT /api/books/:id - Update a specific book by ID');
    console.log('DELETE /api/books/:id - Delete a specific book by ID');
    console.log('\n--- Browser Endpoints ---');
    console.log('\n Press CTRL+C to stop to the server');
})