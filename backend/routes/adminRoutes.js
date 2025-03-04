const express = require("express");
const { getAdmins, addAdmin, updateAdmin, deleteAdmin } = require("../controllers/adminController");

const router = express.Router();

router.get("/", getAdmins);
router.post("/", addAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
