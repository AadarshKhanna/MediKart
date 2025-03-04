const fs = require("fs");
const path = require("path");

const medicinesFile = path.join(__dirname, "../data/medicines.json");

const readMedicines = () => {
  if (!fs.existsSync(medicinesFile)) return [];
  return JSON.parse(fs.readFileSync(medicinesFile, "utf-8"));
};

const writeMedicines = (data) => {
  fs.writeFileSync(medicinesFile, JSON.stringify(data, null, 2));
};

const getMedicines = (req, res) => {
  res.json(readMedicines());
};

const addMedicine = (req, res) => {
  const { name, stock, price, description } = req.body;
  if (!name || !stock || !price) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const medicines = readMedicines();
  const newMedicine = { id: Date.now(), name, stock, price, description };
  medicines.push(newMedicine);
  writeMedicines(medicines);

  res.status(201).json({ message: "Medicine added successfully!", newMedicine });
};

const updateMedicine = (req, res) => {
  const { id } = req.params;
  const medicines = readMedicines();
  const index = medicines.findIndex((med) => med.id == id);

  if (index === -1) return res.status(404).json({ message: "Medicine not found" });

  medicines[index] = { ...medicines[index], ...req.body };
  writeMedicines(medicines);

  res.json({ message: "Medicine updated successfully", medicine: medicines[index] });
};

const deleteMedicine = (req, res) => {
  const { id } = req.params;
  const medicines = readMedicines().filter((med) => med.id != id);
  writeMedicines(medicines);
  res.json({ message: "Medicine deleted successfully" });
};

module.exports = { 
    getMedicines, 
    addMedicine, 
    updateMedicine, 
    deleteMedicine 
};
