const fs = require("fs");
const path = require("path");

const doctorsFile = path.join(__dirname, "../data/doctors.json");

const readDoctors = () => {
  if (!fs.existsSync(doctorsFile)) return [];
  return JSON.parse(fs.readFileSync(doctorsFile, "utf-8"));
};

const writeDoctors = (data) => {
  fs.writeFileSync(doctorsFile, JSON.stringify(data, null, 2));
};

const getDoctors = (req, res) => {
  res.json(readDoctors());
};

const addDoctor = (req, res) => {
  const { name, specialization, experience, contact, email } = req.body;
  if (!name || !specialization || !experience || !contact || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const doctors = readDoctors();
  const newDoctor = {
    id: Date.now(),
    name,
    specialization,
    experience,
    contact,
    email,
    status: "Active"
  };
  doctors.push(newDoctor);
  writeDoctors(doctors);

  res.status(201).json({ message: "Doctor added successfully!", newDoctor });
};

const getDoctorById = (req, res) => {
  const { id } = req.params;
  const doctors = readDoctors();
  const doctor = doctors.find((doc) => doc.id == id);

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }

  res.json(doctor);
};

const updateDoctor = (req, res) => {
  const { id } = req.params;
  const doctors = readDoctors();
  const index = doctors.findIndex((doc) => doc.id == id);

  if (index === -1) return res.status(404).json({ message: "Doctor not found" });

  doctors[index] = { ...doctors[index], ...req.body };
  writeDoctors(doctors);

  res.json({ message: "Doctor updated successfully", doctor: doctors[index] });
};

const deleteDoctor = (req, res) => {
  const { id } = req.params;
  const doctors = readDoctors().filter((doc) => doc.id != id);
  writeDoctors(doctors);
  res.json({ message: "Doctor deleted successfully" });
};

module.exports = { getDoctors, 
    addDoctor, 
    updateDoctor, 
    deleteDoctor,
    getDoctorById
};
