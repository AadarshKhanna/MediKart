// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Plus, AlertCircle } from "lucide-react";

// function AddMedicine() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [newMedicine, setNewMedicine] = useState({
//     name: "",
//     company: "",
//     description: "",
//     category: "",
//     price: "",
//     quantity: "",
//     restockThreshold: "",
//     prescriptionRequired: false,
//     expiryDate: "",
//   });

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/medicines");
//       setMedicines(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch medicines");
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewMedicine({
//       ...newMedicine,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5001/api/medicines", newMedicine);
//       setMedicines([...medicines, response.data.medicine]);
//       setSuccessMessage("Medicine added successfully!");
//       setNewMedicine({
//         name: "",
//         company: "",
//         description: "",
//         category: "",
//         price: "",
//         quantity: "",
//         restockThreshold: "",
//         prescriptionRequired: false,
//         expiryDate: "",
//       });
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       setError("Failed to add medicine");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Add New Medicine
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Add new medicines to the inventory with complete details
//           </p>
//         </motion.div>

//         {error && (
//           <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
//             <AlertCircle size={20} />
//             <span>{error}</span>
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-400">
//             <CheckCircle2 size={20} />
//             <span>{successMessage}</span>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Add Medicine Form */}
//           <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
//               Medicine Details
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={newMedicine.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Company
//                 </label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={newMedicine.company}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={newMedicine.description}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   rows="3"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Category
//                 </label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={newMedicine.category}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={newMedicine.price}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Quantity
//                   </label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={newMedicine.quantity}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Restock Threshold
//                 </label>
//                 <input
//                   type="number"
//                   name="restockThreshold"
//                   value={newMedicine.restockThreshold}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Expiry Date
//                 </label>
//                 <input
//                   type="date"
//                   name="expiryDate"
//                   value={newMedicine.expiryDate}
//                   onChange={handleChange}
//                   required
//                   className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="prescriptionRequired"
//                   checked={newMedicine.prescriptionRequired}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600"
//                 />
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Prescription Required
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
//               >
//                 <Plus size={20} />
//                 Add Medicine
//               </button>
//             </form>
//           </div>

//           {/* Medicines List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
//                 Current Inventory
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {medicines.map((medicine) => (
//                   <div
//                     key={medicine.id}
//                     className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                         {medicine.name}
//                       </h3>
//                       <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                         ₹{medicine.price}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                       {medicine.company}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                       {medicine.description}
//                     </p>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//                       <span>Qty: {medicine.quantity}</span>
//                       <span>•</span>
//                       <span>Category: {medicine.category}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddMedicine;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Plus, AlertCircle, CheckCircle2, Trash2 } from "lucide-react";

function AddMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    company: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    restockThreshold: "",
    prescriptionRequired: false,
    expiryDate: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/medicines");
      setMedicines(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch medicines");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/medicines", newMedicine);
      setMedicines([...medicines, response.data.medicine]);
      setSuccessMessage("Medicine added successfully!");
      setNewMedicine({
        name: "",
        company: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        restockThreshold: "",
        prescriptionRequired: false,
        expiryDate: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to add medicine");
    }
  };

  const handleDelete = async (medicineId) => {
    if (!window.confirm("Are you sure you want to delete this medicine?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/medicines/${medicineId}`);
      setMedicines(medicines.filter(medicine => medicine.id !== medicineId));
      setSuccessMessage("Medicine deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setError("Failed to delete medicine");
    }
  };

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
            Add New Medicine
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Add new medicines to the inventory with complete details
          </p>
        </motion.div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 size={20} />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Medicine Form */}
          <div className="lg:col-span-1 bg-white dark:bg-amber-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-200 dark:text-white mb-6">
              Medicine Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newMedicine.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={newMedicine.company}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newMedicine.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={newMedicine.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newMedicine.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={newMedicine.quantity}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Restock Threshold
                </label>
                <input
                  type="number"
                  name="restockThreshold"
                  value={newMedicine.restockThreshold}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={newMedicine.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="prescriptionRequired"
                  checked={newMedicine.prescriptionRequired}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600"
                />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prescription Required
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Medicine
              </button>
            </form>
          </div>

          {/* Medicines List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-amber-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Current Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicines.map((medicine) => (
                  <motion.div
                    key={medicine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg relative group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {medicine.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          ₹{medicine.price}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(medicine.id)}
                          className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          title="Delete Medicine"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {medicine.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {medicine.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Qty: {medicine.quantity}</span>
                      <span>•</span>
                      <span>Category: {medicine.category}</span>
                    </div>
                    {medicine.prescriptionRequired && (
                      <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                        Prescription Required
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;