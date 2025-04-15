import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, User, Stethoscope, Settings, ArrowLeft } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Restock", path: "/restock", icon: <Package size={20} /> },
    { name: "Add Medicine", path: "/add-medicine", icon: <PlusCircle size={20} /> },
    { name: "Doctors Management", path: "/doctors", icon: <Stethoscope size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav className="w-64 h-screen bg-blue-600 text-white p-5 flex flex-col shadow-lg">
    <h2 className="text-3xl font-bold mb-6 tracking-wide text-gray-300">Admin Panel</h2>


      <ul className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                ${location.pathname === item.path 
                  ? "bg-gray-400 text-white font-semibold" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Settings Button */}
      <div className="mt-auto">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
            ${location.pathname === "/settings" 
              ? "bg-gray-700 text-white font-semibold" 
              : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
        >
          <Settings size={20} />
          Settings
        </Link>
      </div>

      {/* Back Button (Navigates to "/") */}
      <button 
        onClick={() => navigate("/")} 
        className="mt-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all text-white w-full"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>
    </nav>
  );
}

export default Sidebar;
