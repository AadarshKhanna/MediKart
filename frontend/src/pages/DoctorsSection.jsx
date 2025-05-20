import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Plus, User, Mail, Phone, Briefcase, Calendar } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorsSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    contact: "",
    email: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/doctors/add-doctor", formData);
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        contact: "",
        email: "",
      });
      setShowAddForm(false);
      fetchDoctors();
      alert("Doctor added successfully!");
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor. Please try again.");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const doctor = doctors.find(doc => doc.id === id);
      const newStatus = doctor.status === "Active" ? "Inactive" : "Active";
      await axios.put(`http://localhost:5001/api/doctors/${id}`, { status: newStatus });
      fetchDoctors();
    } catch (error) {
      console.error("Error updating doctor status:", error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === "All" || doctor.status === statusFilter)
  );

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50 bg-gray-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.h2
            className="text-4xl font-bold text-gray-300 dark:text-white mb-4 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            Registered Doctors
          </motion.h2>
          
         {/* Search & Filter Section */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto mt-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-55 top-1/2 transform -translate-y-1/2 text-gray-100 dark:text-gray-100" size={20} />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="h-11 w-40 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAddForm(!showAddForm)}
        className="relative top-[-5px] h-11 w-40 flex items-center justify-center gap-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
      >
        <Plus size={20} />
        Add Doctor
      </motion.button>

        </div>
      </div>

          </div>
        </div>

        {/* Add Doctor Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Add New Doctor</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <div className="relative">
                  <User className="absolute left-255 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-100" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                <div className="relative">
                  <Briefcase className="absolute left-255 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-100" size={20} />
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience (years)</label>
                <div className="relative">
                  <Calendar className="absolute left-255 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-100" size={20} />
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact</label>
                <div className="relative">
                  <Phone className="absolute left-255 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-100" size={20} />
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-255 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-100" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Add Doctor
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} // below box color
              className="bg-white dark:bg-gray-500 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {doctor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialization}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.status === "Active" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {doctor.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar size={16} />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Phone size={16} />
                    <span>{doctor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Mail size={16} />
                    <span>{doctor.email}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleStatus(doctor.id)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-200 bg-blue-500 hover:bg-blue-600 shadow-sm hover:shadow-md"
                  >
                    {doctor.status === "Active" ? <XCircle size={16} /> : <CheckCircle size={16} />} 
                    {doctor.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/doctorprofile/${doctor.id}`)}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    View Profile <span className="animate-bounce">→</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    
  );
}

export default DoctorsSection;