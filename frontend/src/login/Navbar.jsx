import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoimg from "../assets/logoimg.png"; // Import Logo

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null); // Ref for click outside detection

  const handleDashboardClick = () => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (isAuthenticated) {
      navigate("/dashboard"); // If logged in, go to Dashboard
    } else {
      navigate("/login"); // Otherwise, go to Login
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src={logoimg} alt="Logo" className="w-14 h-14" /> {/* Adjust Size as Needed */}
        <h1 className="text-2xl font-bold text-blue-600">MediKart</h1>
      </div>

      <div className="space-x-6 flex items-center">
        {/* Common Links */}
        <a href="/" className="text-gray-700 hover:text-blue-600 cursor-pointer">
          Home
        </a>
        <a href="/about" className="text-gray-700 hover:text-blue-600 cursor-pointer">
          About
        </a>

        {/* Conditional Navigation Based on Route */}
        {location.pathname === "/" && (
          <button
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Admin Dashboard
          </button>
        )}

        {location.pathname === "/user" && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
              User
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border">
                <button
                  onClick={() => navigate("/view-history")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  View History
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken"); // Clear user token
                    navigate("/"); // Redirect to login
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;