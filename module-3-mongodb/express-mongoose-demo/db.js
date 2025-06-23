const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.MONGO_URI;
async function connectDB(){
    try{
        await mongoose.connect(DB_URI, {
            // These options are recommended for new connections to avoid deprecation warnings
            // and ensure robust connection behavior.
            useNewUrlParser: true, // Parses the connection string
            useUnifiedTopology: true,  // Uses the new server discovery and monitoring engine
            // useCreateIndex: true,    // (Deprecated and removed in Mongoose 6.0+)
            // useFindAndModify: false  // (Deprecated and removed in Mongoose 6.0+)
        });
        console.log('MongoDB connection successfully.');
    }catch (err){
        console.error('MongoDB connection error:', err);
        //Exit process with failure
        process.exit(1); // This will terminate the Node.js process
    }
}

//Export the connection function to be used in other files
module.exports = connectDB;

//You can also listen for connection events(optional)
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + DB_URI.split('@'[1]));
});

//When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected.');
})

//If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
})