// jwtAuthMiddleware.js
const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

  // Extract the JWT token from the request header
    const authHeader = req.headers.authorization;
    
    // Check if authorization header is present
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Extract the JWT token from the request header
    //we have used .split because in postman the token is passed as a bearer token 
    //in order to seperate it bearer will come at 0 index and token will come at 1 index
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user information to the request object
        req.user = decoded.user;// Ensure the structure matches the token payload
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};



// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign({user:userData}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { jwtAuthMiddleware, generateToken };


