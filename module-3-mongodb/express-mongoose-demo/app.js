// app.js
const express = require('express');
const connectDB = require('./db'); // Import the database connection function
const Product = require('./models/Product'); // Import the Product Model

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// --- Mongoose CRUD Operations Example (for testing purposes) ---
async function runCrudOperations() {
    console.log('\n--- Starting Mongoose CRUD Operations ---');
    
    try {
        // --- C: Create Product ---
        console.log('\nCreating products...');
        const product1 = await Product.create({
            name: 'Laptop X',
            description: 'Powerful laptop for professionals.',
            price: 1200.00,
            category: 'Electronics',
            stockQuantity: 50
        });
        console.log('Created:', product1.name);
        
        const product2 = new Product({
            name: 'Node.js Basics Book',
            price: 25.50,
            category: 'Books',
            stockQuantity: 100
        });
        await product2.save();
        console.log('Created:', product2.name);
        
        // Attempt to create a product with missing required field
        try {
            await Product.create({ name: 'Invalid Product' }); // Missing price, category
        } catch (validationError) {
            console.error('\nValidation Error (expected):', validationError.message);
        }
        
        // Attempt to create a product with a duplicate unique field
        try {
            await Product.create({
                name: 'Laptop X', // Duplicate name
                price: 1300.00,
                category: 'Electronics',
                stockQuantity: 10
            });
        } catch (duplicateError) {
            console.error('\nDuplicate Key Error (expected):', duplicateError.message);
        }
        
        
        // --- R: Read Products ---
        console.log('\nReading products...');
        const allProducts = await Product.find({});
        console.log('All Products (count):', allProducts.length);
        // console.log(allProducts); // Uncomment to see full product objects
        
        const laptop = await Product.findOne({ name: 'Laptop X' });
        console.log('Found Laptop X:', laptop ? laptop.name : 'Not found');
        
        const booksCategory = await Product.find({ category: 'Books' }).limit(1).select('name price'); // Select only name and price
        console.log('One product from Books category (name, price):', booksCategory);
        
        
        // --- U: Update Product ---
        console.log('\nUpdating products...');
        if (laptop) {
            const updatedLaptop = await Product.findByIdAndUpdate(
                laptop._id,
                { price: 1150.00, stockQuantity: 45 },
                { new: true, runValidators: true } // Return updated document, run schema validators
            );
            console.log('Updated Laptop X price/stock:', updatedLaptop.price, updatedLaptop.stockQuantity);
        }
        
        // --- D: Delete Product ---
        console.log('\nDeleting products...');
        const deleteResult = await Product.deleteOne({ name: 'Node.js Basics Book' });
        console.log('Deleted Node.js Basics Book (deletedCount):', deleteResult.deletedCount);
        
        // Verify deletion
        const remainingProducts = await Product.find({});
        console.log('Remaining Products (count):', remainingProducts.length);
        
    } catch (err) {
        console.error('\n--- Unexpected Error During CRUD Operations ---');
        console.error(err.message);
        // In a real app, you might want to stop the server or log to a file here
    } finally {
        console.log('\n--- Finished Mongoose CRUD Operations ---');
        // For testing, you might want to exit the process here
        // process.exit(0);
    }
}

// Call the CRUD operations after DB connection is attempted
connectDB().then(() => {
    runCrudOperations();
});


// Basic Express setup (keep for server functionality)
app.use(express.json()); // For future API routes

app.get('/', (req, res) => {
    res.send('Server is running. Check terminal for Mongoose CRUD operation logs!');
});

// Simple 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});