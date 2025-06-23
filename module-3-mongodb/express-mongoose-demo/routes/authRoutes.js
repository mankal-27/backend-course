// routes/authRoutes.js
const express = require('express');
const User = require('../models/User'); // Your User Model
const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Create user (password will be hashed by pre-save hook)
        const user = await User.create({
            username,
            email,
            password,
            role // Optional: client can send role, but validate carefully if production
        });
        
        // Generate token and send it
        const token = user.getSignedJwtToken();
        res.status(201).json({ success: true, token });
    } catch (error) {
        // Handle validation errors (e.g., duplicate email/username, minlength)
        if (error.code === 11000) { // MongoDB duplicate key error
            const duplicateError = new Error('User with this email or username already exists');
            duplicateError.statusCode = 409; // Conflict
            return next(duplicateError);
        }
        if (error.name === 'ValidationError') {
            const validationError = new Error(error.message);
            validationError.statusCode = 400; // Bad Request
            return next(validationError);
        }
        next(error); // Pass other errors to global handler
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Validate email & password
        if (!email || !password) {
            const error = new Error('Please enter an email and password');
            error.statusCode = 400;
            return next(error);
        }
        
        // Check for user (select password too as it's `select: false` by default)
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401; // Unauthorized
            return next(error);
        }
        
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401; // Unauthorized
            return next(error);
        }
        
        // Generate token and send it
        const token = user.getSignedJwtToken();
        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;