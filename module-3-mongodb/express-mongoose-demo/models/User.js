const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match:  [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, //Do not return password by default in queries
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Example roles
        default: 'user'
    }
}, {
    timestamps: true,
});

// Hash password before saving (pre-save hook)
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) { // Only hash if password was modified
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Method to generate JWT
userSchema.methods.getSignedJwtToken = function (){
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN // Ex:1h,4h,30d
        });
};

const User = mongoose.model('User', userSchema);
module.exports = User;