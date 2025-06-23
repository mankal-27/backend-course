// app.js
//require('express-async-errors');// Must be at the very top to catch async errors automatically
const express = require('express');
const connectDB = require('./db'); // Import the database connection function
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

//Global Middleware
app.use(express.json());

//Mount Product Routes
// All routes in productRoutes will be prefixed with '/api/products
app.use('/api/products', productRoutes);

//Root path for testing server status
app.get('/', (req, res) => {
    res.send('Welcome to the product API!')
})

// 404 Not Found Middleware - handles requests to undefined routes
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // Pass to the error-handling middleware
});

//Global Error-handling Middleware - must have 4 arguments (err, req, res, next)
app.use((err, req, res, next) => {
    console.error('--- API Error Caught ---');
    console.error(`Path: ${req.path}`);
    console.error(err.stack); //Log the full stack trace for debugging
    
    //Default to 500 if no specific status code is set on the error
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unexpected Server error occurred.',
        // In production, avoid sending `err.stack` for security.
        // For development, it's very useful.
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
})

//Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Product API available at /api/products');
    console.log('Press Ctrl+C to stop');
})