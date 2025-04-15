const fs = require("fs");
const path = require("path");

const adminsFile = path.join(__dirname, "../data/admins.json");

const readAdmins = () => {
  if (!fs.existsSync(adminsFile)) return [];
  return JSON.parse(fs.readFileSync(adminsFile, "utf-8"));
};

const writeAdmins = (data) => {
  fs.writeFileSync(adminsFile, JSON.stringify(data, null, 2));
};

const getAdmins = (req, res) => {
  res.json(readAdmins());
};

const addAdmin = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const admins = readAdmins();
  const newAdmin = { id: Date.now(), name, email, role };
  admins.push(newAdmin);
  writeAdmins(admins);

  res.status(201).json({ message: "Admin added successfully!", newAdmin });
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const admins = readAdmins();
  const index = admins.findIndex((admin) => admin.id == id);

  if (index === -1) return res.status(404).json({ message: "Admin not found" });

  admins[index] = { ...admins[index], ...req.body };
  writeAdmins(admins);

  res.json({ message: "Admin updated successfully", admin: admins[index] });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  const admins = readAdmins().filter((admin) => admin.id != id);
  writeAdmins(admins);
  res.json({ message: "Admin deleted successfully" });
};

module.exports = { getAdmins, 
    addAdmin, 
    updateAdmin, 
    deleteAdmin 
};
