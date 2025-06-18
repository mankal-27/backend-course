const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

//Basic route to confirm server is running
app.get('/', (req, res) => {
    res.send('Server is running and attempting to connect to MongoDB...');
})

//Start the Express Server
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
    console.log('Check your terminal for MongoDB connection Status...')
});

//You might also wnat a basic error handler here
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
})