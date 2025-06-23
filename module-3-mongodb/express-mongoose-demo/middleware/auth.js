const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {Error} = require("mongoose");

//Protect routes
exports.protect = async (req, res, next) => {
    let token ;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        //Set token from Bearer token to header
        token = req.headers.authorization.split(' ')[1];
    }
    // Alternatively, if you're sending token in cookies (less common for pure APIs)
    // else if (req.cookies.token) {
    //     token = req.cookies.token
    // }
    
    // Make sure token exists
    if(!token){
        const error = new Error('Not authorized to access this route');
        error.statusCode = 401;
        return next(error);
    }
    
    try{
        //verify token
        const decoded = jwt.verify(token, process.env.SECRET);
        
        //Find user by ID and attach to request object (excluding password)
        req.user = await User.findById(decoded.id)
        next();
    }catch(err){
        const error = new Error('Not authorized, token failed to access this route');
        error.statusCode = 401;
        return next(error);
    }
}

// Grant access to specific routes
exports.authorize = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            const error = new Error(`User role ${req.user.role} is not authorized`);
            error.statusCode = 401;
            return next(error);
        }
        next();
    };
};