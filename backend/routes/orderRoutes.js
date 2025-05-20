const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Multer setup for prescription uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// JSON file to store order details
const ORDERS_FILE = "./data/orders.json";

// Load existing orders or initialize an empty array
const loadOrders = () => {
  if (fs.existsSync(ORDERS_FILE)) {
    const data = fs.readFileSync(ORDERS_FILE);
    return JSON.parse(data);
  }
  return [];
};

// Save all orders to file
const saveOrders = (orders) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// Append and save new orders
const appendOrders = (newOrders) => {
  const orders = loadOrders();
  orders.push(...newOrders);
  saveOrders(orders);
};

// Handle order placement
router.post("/", upload.single("prescription"), (req, res) => {
  const { cart, age, address, pincode } = req.body;
  const prescriptionFile = req.file;

  if (!prescriptionFile) {
    return res.status(400).json({ message: "Prescription upload required" });
  }

  let parsedCart;
  try {
    parsedCart = JSON.parse(cart);
    if (!Array.isArray(parsedCart)) {
      throw new Error("Invalid cart format");
    }
  } catch (err) {
    return res.status(400).json({ message: "Invalid cart data", error: err.message });
  }

  const timestamp = new Date().toISOString();

  const ordersToSave = parsedCart.map((item) => ({
    medicineId: item.id,
    medicineName: item.name,
    quantity: item.quantity,
    age,
    address,
    pincode,
    prescription: prescriptionFile.filename,
    timestamp
  }));

  appendOrders(ordersToSave);

  res.json({
    message: "Order(s) received. Doctors will review your prescription.",
    orders: ordersToSave,
  });
});

module.exports = router;
