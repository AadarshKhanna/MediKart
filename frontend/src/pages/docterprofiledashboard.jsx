import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Star, MessageSquare, FileText, Activity, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function DoctorProfileDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/doctors/doctorprofile/${id}`);
      setDoctor(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Doctor not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50 dark:bg-gray-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </motion.button>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-600 dark:text-gray-200"
          >
            Doctor Profile
          </motion.h2>
        </div>

        {/* Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Doctor Info Card */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {doctor.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">{doctor.specialization}</p>
              <div className="flex items-center gap-2 text-yellow-500 mb-4">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-medium">4.8 (120 reviews)</span>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar size={16} />
                  <span>Experience: {doctor.experience} years</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MessageSquare size={16} />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock size={16} />
                  <span>Contact: {doctor.contact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">1,234</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Prescriptions</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Approval Rate</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">45</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Pending Reviews</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="p-4 flex -mb-px">
              {["overview", "prescriptions", "patients", "reports"].map((tab, idx, arr) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  } ${idx !== arr.length - 1 ? "mr-6" : ""}`} 
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Activity size={20} />
                  <h4 className="text-lg font-medium">Recent Activity</h4>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-gray-900 dark:text-white">Reviewed prescription for Patient {item}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "prescriptions" && (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                    <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                    <div>
                    <p className="text-gray-900 dark:text-white">Prescription #{item}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Issued on 2025-05-20</p>
                    </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    View
                    </button>
                    </div>
                    ))}
                    </div>
                    )}
        {activeTab === "patients" && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                  P{item}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">Patient Name {item}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last visit: 2025-05-15</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reports" && (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText size={24} className="text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-gray-900 dark:text-white">Prescription Report {item}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Generated: 1 week ago</p>
                      </div>
                    </div>
                    {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                      Download
                    </button> */}
                  </div>
                ))}
              </div>
            )}
          </div>
      </div>
    </div>
  </div>

);
}

export default DoctorProfileDashboard;