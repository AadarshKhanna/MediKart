import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Plus,
  AlertCircle,
  Search,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
const API_URL = import.meta.env.VITE_API_URL;

function Restock() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [restockQuantities, setRestockQuantities] = useState({});

  const navigate = useNavigate(); // <-- instantiate navigate

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/medicines`);
      setMedicines(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch medicines");
      setLoading(false);
    }
  };

  const handleRestock = async (medicineId) => {
    const quantity = restockQuantities[medicineId];
    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    try {
      await axios.patch(
        `${API_URL}/api/medicines/restock/${medicineId}`,
        { quantity: parseInt(quantity) }
      );

      setSuccessMessage("Medicine restocked successfully!");
      // Optionally refresh medicines data:
      fetchMedicines();
      // Clear input for this medicine
      setRestockQuantities({ ...restockQuantities, [medicineId]: "" });

      // Find the restocked medicine details to pass
      const restockedMedicine = medicines.find(med => med.id === medicineId);

      // Navigate to restock-bill page with state
      navigate("/restockbill", {
        state: {
          medicine: restockedMedicine,
          quantity: parseInt(quantity),
          
        },
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to restock medicine");
    }
  };

  const handleQuantityChange = (medicineId, value) => {
    setRestockQuantities({
      ...restockQuantities,
      [medicineId]: value,
    });
  };

  const filteredMedicines = medicines
    .filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.company.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === "low") {
        return (
          matchesSearch && medicine.quantity <= medicine.restockThreshold
        );
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "string") {
        return multiplier * aValue.localeCompare(bValue);
      }
      return multiplier * (aValue - bValue);
    });

  if (loading) {
    return (
      <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Restock Medicines
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Manage and restock your medicine inventory
          </p>
        </motion.div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-55 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Medicines</option>
            <option value="low">Low Stock</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="price">Sort by Price</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <ArrowUpDown size={20} />
          </motion.button>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {medicine.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {medicine.company}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      medicine.quantity <= medicine.restockThreshold
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {medicine.quantity} in stock
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="text-gray-900 dark:text-white">
                      {medicine.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Price:</span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{medicine.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Restock Threshold:
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {medicine.restockThreshold}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={restockQuantities[medicine.id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(medicine.id, e.target.value)
                    }
                    placeholder="Quantity"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRestock(medicine.id)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                    Restock
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restock;
