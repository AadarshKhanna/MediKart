// import { useNavigate } from "react-router-dom";

// import logoimg from "../assets/logoimg.png";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   const handleDashboardClick = () => {
//     const isAuthenticated = localStorage.getItem("adminToken");
//     if (isAuthenticated) {
//       navigate("/dashboard"); // If logged in, go to Dashboard
//     } else {
//       navigate("/login"); // Otherwise, go to Login
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Top Navigation - Fixed to stay at the top */}
//       <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-blue-600">MediStore</h1>
//         <div className="space-x-6">
//           <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
//           <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
//           <button 
//             onClick={handleDashboardClick}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Admin Dashboard
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section (Added padding to prevent overlap with fixed navbar) */}
//       <section className="flex flex-col items-center justify-center text-center mt-24 px-6">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Your Trusted Online Medicine Store
//         </h2>
//         <p className="text-gray-600 max-w-2xl">
//           Get high-quality medicines delivered to your doorstep. Fast, safe, and reliable.
//         </p>
//         <button 
//           onClick={() => alert("Shop Now Coming Soon!")}
//           className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           Shop Now
//         </button>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;
import { useNavigate } from "react-router-dom";
import logoimg from "../assets/logoimg.png"; // Import Logo

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (isAuthenticated) {
      navigate("/dashboard"); // If logged in, go to Dashboard
    } else {
      navigate("/login"); // Otherwise, go to Login
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation - Fixed to stay at the top */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img src={logoimg} alt="Logo" className="w-14 h-14" /> {/* Adjust Size as Needed */}
          <h1 className="text-2xl font-bold text-blue-600">MediKart</h1>
        </div>

        <div className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <button 
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Admin Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section (Added padding to prevent overlap with fixed navbar) */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Your Trusted Online Medicine Store
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Get high-quality medicines delivered to your doorstep. Fast, safe, and reliable.
        </p>
        <button 
          onClick={() => alert("Shop Now Coming Soon!")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
