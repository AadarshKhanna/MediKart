import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          Your Unified E-Healthcare Solution
        </h1>
        <p className="text-gray-700 max-w-3xl text-lg">
          Experience seamless healthcare with our all-in-one platform. Store health records, book appointments, schedule tests, and order medications—all in one place.
        </p>
        <button
          onClick={handleShopNowClick}
          className="mt-6 bg-blue-600 text-white px-8 py-3 text-lg rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white mt-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-md transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Centralized Health Records</h3>
            <p className="text-gray-600 mt-2">Securely store and access medical history, blood reports, and scan results.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Appointments & Tests</h3>
            <p className="text-gray-600 mt-2">Schedule doctor visits and order lab tests with home sample collection.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md transition transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-700">Smart Medication Alerts</h3>
            <p className="text-gray-600 mt-2">Receive medication recommendations with allergy and interaction warnings.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white text-center mt-12 px-6">
        <h2 className="text-3xl font-bold">Join Our Platform Today</h2>
        <p className="mt-2 text-lg">Simplify your healthcare journey with our integrated services.</p>
        <button
          onClick={handleShopNowClick}
          className="mt-6 bg-white text-blue-600 px-8 py-3 text-lg rounded-lg hover:bg-gray-200 transition shadow-md"
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;