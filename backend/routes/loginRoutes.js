const express = require("express");
const router = express.Router();

// Example Login Route
router.post("/", (req, res) => {
  res.json({ message: "Login successful" });
});

module.exports = router;  // ✅ Correctly exporting the router
