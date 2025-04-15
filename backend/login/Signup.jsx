import express from "express";
import cors from "cors";
import fs from "fs";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const USERS_FILE = "users.json";

// Read users from file
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return data ? JSON.parse(data) : [];
};

// Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let users = readUsers();

    // Check if user exists
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password and store user
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    writeUsers(users);

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Start server
app.listen(5001, () => console.log("Server running on port 5001"));
