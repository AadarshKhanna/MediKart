const express = require("express");
const {
  getMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  restockMedicine,
  getLowStockMedicines,
} = require("../controllers/medicineController");

const router = express.Router();

router.get("/", getMedicines);
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);
router.patch("/:id/restock", restockMedicine);
router.get("/low-stock", getLowStockMedicines);

module.exports = router;
