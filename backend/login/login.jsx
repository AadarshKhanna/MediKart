const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const { promises: fsPromises } = require("fs");

// Configuration
const secretKey = "your_secret_key"; // Replace with a secure key

// File Helpers
const readFile = async (filePath) => {
    try {
        const data = await fsPromises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeFile = async (filePath, data) => {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Initialize Data File
const initializeFile = () => {
    const filePath = "./data/users.json";
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
};

// Authentication Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

// Generate JWT Token
function generateToken(user) {
    if (!user || !user.id || !user.email || !user.role) {
        throw new Error("Invalid user object. 'id', 'email', and 'role' are required.");
    }
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        secretKey,
        { expiresIn: "1h" }
    );
}

// Login Service
async function loginService(email, password) {
    try {
        const users = await readFile("./data/users.json");
        const existingUser = users.find(user => user.email === email);
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Compare plain text password (Should be hashed in real projects)
        if (password !== existingUser.password) {
            throw new Error("Incorrect password");
        }

        return generateToken(existingUser);
    } catch (error) {
        throw new Error("Invalid credentials");
    }
}

// Login Controller
async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
}

// Get Users Service
async function getUserService() {
    return await readFile("./data/users.json");
}

// Get Users Controller
async function getUsersController(req, res) {
    try {
        const users = await getUserService();
        if (req.user.role === "admin") {
            res.json(users);
        } else {
            const user = users.find(u => u.id === req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Express App
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/login", loginController);
app.get("/users", authenticateToken, getUsersController);

// Server Setup
const PORT = 5001;
initializeFile();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
