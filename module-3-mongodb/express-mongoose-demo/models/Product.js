const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Product name is required'],
        trim: true,
        maxLength:[100, 'Product name cannot exceed 100 characters'],
    },
    description:{
        type: String,
        required: false,
        trim: true,
        maxlength:[500,'Description cannot exceed 500 characters'],
    },
    price:{
        type: Number,
        required:[true,'Product price is required'],
        min:[0,'Price cannot be negative'] // Price must be non-negative
    },
    category:{
        type: String,
        required:[true,'Product category is required'],
        enum:['Electronics', 'Books', 'Clothing', 'Home', 'Food', 'Other'],
        trim:true,
    },
    inStock:{
        type: Boolean,
        default: true // Products are in stock by default
    },
    stockQantity:{
        type: Number,
        required: true,
        min:[0, 'Stock quantity cannot be negative'],
        default:0
    }
},
    { timestamps:true } // Automatically and createdAt and updatedAt fields
);

//Create the product Model
const Product = mongoose.model('Product',productSchema);
module.exports = Product;


