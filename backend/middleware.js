const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "No token provided or incorrect format" });
    }

    try {
        // Extract the token and trim to avoid extra spaces
        const token = authHeader.split(' ')[1].trim();
        console.log("Token being verified:", token); // Log the token for debugging

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log the decoded token

        // Set userId and username in the request object
        req.userId = decoded.userId; // Ensure userId is in the payload
        req.username = decoded.username; // Ensure username is in the payload
        req.firstName = decoded.firstName;
        req.lastName = decoded.lastName;
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error("JWT Verification Error:", err); // Log the error
        return res.status(403).json({ error: "Invalid or malformed token" });
    }
};

module.exports = {
    authMiddleware
};
