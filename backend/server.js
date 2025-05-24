const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const predictRoute = require('./routes/predictRoute');
// Load environment variables
dotenv.config();

const razorpay = new Razorpay({
  key_id: 'rzp_test_NU6XBPuT004bec',
  key_secret: 'osjIJe1StkvNYYWsoo7YV4RJ'
});


const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderController = require("./controllers/orderController");

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
const USERS_FILE = "users.json";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', predictRoute);
app.use("/upload", express.static("routes/upload"));
app.use("/images", express.static("routes/images"));
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/order-history", orderController.getOrderHistory);

// Function to read users from file
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
};

// Function to write users to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let users = readUsers();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });
    writeUsers(users);

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let users = readUsers();

    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Razorpay Order Creation Endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: amount, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
});

// Razorpay Payment Verification
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      res.json({
        verified: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      res.status(400).json({
        verified: false,
        message: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      verified: false,
      message: "Error verifying payment",
      error: error.message
    });
  }
});


// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the MediStore Admin Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

