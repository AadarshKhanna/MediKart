const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { secretKey } = require("../configuration/jwtConfig");

// File Paths
const USERS_FILE = path.join(__dirname, "../data/users.json");

// Ensure data directory and users file exist
const initializeFile = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
};

// Read file and parse JSON
const readFile = () => {
    if (!fs.existsSync(USERS_FILE)) {
        initializeFile();
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
};

// Write data to file
const writeFile = (data) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
};

// **Generate JWT Token**
function generateToken(user) {
    if (!user || !user.id || !user.email || !user.role) {
        throw new Error("Invalid user object. 'id', 'email', and 'role' are required.");
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    try {
        return jwt.sign(payload, secretKey, { expiresIn: "1h" });
    } catch (error) {
        console.error("Error generating JWT token:", error.message);
        throw new Error("Failed to generate JWT token");
    }
}

// **Authenticate JWT Token Middleware**
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        console.error("No authorization header provided");
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        console.error("Invalid token format");
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err.message);
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }

        req.user = user;
        console.log(`Token authenticated successfully for user: ${user.email}`);
        next();
    });
}

module.exports = {
    generateToken,
    authenticateToken,
    readFile,
    writeFile,
    initializeFile
};
