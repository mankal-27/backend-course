// routes/books.js
const express = require('express');
const router = express.Router();

// A simple in-memory data store for demonstration (moved from app.js)
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' }
];
let nextBookId = 3;

// GET / (this will become /api/books when mounted)
router.get('/', (req, res) => {
    res.json(books);
});

// GET /:id (this will become /api/books/:id when mounted)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// POST /
router.post('/', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = { id: nextBookId++, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], title, author };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found for update' });
    }
});

// DELETE /:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(b => b.id !== id);
    
    if (books.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Book not found for deletion' });
    }
});

module.exports = router; // EXPORT THE ROUTER!