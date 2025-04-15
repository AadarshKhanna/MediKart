const express = require("express");
const { getDoctors, addDoctor, updateDoctor, deleteDoctor,getDoctorById } = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);
router.post("/add-doctor", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.get("/doctorprofile/:id", getDoctorById);

module.exports = router;
