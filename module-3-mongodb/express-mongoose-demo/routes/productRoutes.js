// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import your Product Model

// Middleware specific to this router (optional, but good for logging product specific requests)
router.use((req, res, next) => {
    console.log(`[Product API] ${req.method} ${req.originalUrl}`);
    next();
});

// --- GET all products ---
// GET /api/products?category=Books&inStock=true
router.get('/', async (req, res, next) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.inStock) {
            query.inStock = req.query.inStock === 'true'; // Convert string to boolean
        }
        // Add more query parameters for filtering, sorting, pagination as needed
        
        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        next(error); // Pass errors to the error-handling middleware
    }
});

// --- GET product by ID ---
// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(product);
    } catch (error) {
        // Mongoose CastError for invalid IDs are common here
        if (error.name === 'CastError') {
            const castError = new Error('Invalid Product ID format');
            castError.statusCode = 400;
            return next(castError);
        }
        next(error);
    }
});

// --- POST new product ---
// POST /api/products
router.post('/', async (req, res, next) => {
    try {
        const { name, description, price, category, stockQuantity } = req.body;
        
        // Basic server-side validation (Mongoose schema also validates)
        if (!name || !price || !category) {
            const error = new Error('Name, price, and category are required.');
            error.statusCode = 400;
            return next(error);
        }
        
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stockQuantity
        });
        
        const savedProduct = await newProduct.save(); // Save to DB
        res.status(201).json(savedProduct); // 201 Created
    } catch (error) {
        // Handle Mongoose validation errors or duplicate key errors
        if (error.name === 'ValidationError') {
            const validationError = new Error(error.message);
            validationError.statusCode = 400; // Bad Request
            return next(validationError);
        }
        if (error.code === 11000) { // MongoDB duplicate key error code
            const duplicateError = new Error('Product with this name already exists.');
            duplicateError.statusCode = 409; // Conflict
            return next(duplicateError);
        }
        next(error);
    }
});

// --- PUT update product by ID ---
// PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
    try {
        const { name, description, price, category, inStock, stockQuantity } = req.body;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, inStock, stockQuantity },
            { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` applies schema validators
        );
        
        if (!updatedProduct) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error.name === 'CastError') {
            const castError = new Error('Invalid Product ID format');
            castError.statusCode = 400;
            return next(castError);
        }
        if (error.name === 'ValidationError') {
            const validationError = new Error(error.message);
            validationError.statusCode = 400;
            return next(validationError);
        }
        if (error.code === 11000) { // MongoDB duplicate key error code
            const duplicateError = new Error('Product with this name already exists.');
            duplicateError.statusCode = 409; // Conflict
            return next(duplicateError);
        }
        next(error);
    }
});

// --- DELETE product by ID ---
// DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            return next(error);
        }
        // 204 No Content: Successful deletion, no information to send back
        res.status(204).send();
    } catch (error) {
        if (error.name === 'CastError') {
            const castError = new Error('Invalid Product ID format');
            castError.statusCode = 400;
            return next(castError);
        }
        next(error);
    }
});

module.exports = router;