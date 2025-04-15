const express = require("express");
const multer = require("multer");
const path = require("path");

// Multer setup for medicine image uploads
const storage = multer.diskStorage({
  destination: "./uploads/medicines/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controller functions
const {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  restockMedicine,
  getLowStockMedicines,
} = require("../controllers/medicineController");

const router = express.Router();

// Routes
router.get("/", getMedicines); // Get all medicines
router.post("/", upload.single("image"), addMedicine); // Add new medicine with image upload
router.put("/:id", updateMedicine); // Update medicine by ID
router.delete("/:id", deleteMedicine); // Delete medicine by ID
router.patch("/restock/:id", restockMedicine); // Restock medicine
router.get("/low-stock", getLowStockMedicines); // Get low-stock medicines

module.exports = router;
