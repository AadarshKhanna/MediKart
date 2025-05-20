import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
        Welcome to <span className="text-blue-600">HealthCare Portal</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Medicine Section */}
        <div
          onClick={() => navigate('/user')}
          className="bg-white cursor-pointer rounded-2xl shadow-lg p-8 transition hover:shadow-2xl hover:scale-105 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Medicine</h2>
          <p className="text-gray-600">
            Upload prescriptions and order medicines at your doorstep with ease and safety.
          </p>
        </div>

        {/* Skin Detection Section */}
        <div
          onClick={() => navigate('/skin_detection')}
          className="bg-white cursor-pointer rounded-2xl shadow-lg p-8 transition hover:shadow-2xl hover:scale-105 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-pink-700 mb-4">Skin Detection</h2>
          <p className="text-gray-600">
            Upload a photo of your skin to detect potential conditions and receive smart suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
