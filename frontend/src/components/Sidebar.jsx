// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, Package, PlusCircle, User, Stethoscope } from "lucide-react";

// function Sidebar() {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
//     { name: "Restock", path: "/restock", icon: <Package size={20} /> },
//     { name: "Add Medicine", path: "/add-medicine", icon: <PlusCircle size={20} /> },
//     { name: "Profile", path: "/profile", icon: <User size={20} /> },
//   ];

//   return (
//     <nav className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-xl">
//       {/* Admin Panel Header */}
//       <h2 className="text-3xl font-extrabold mb-6 tracking-wide text-blue-400">Admin Panel</h2>
      
//       {/* Menu Items */}
//       <ul className="space-y-3 flex-1">
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
//                 ${location.pathname === item.path 
//                   ? "bg-blue-500 text-white font-semibold shadow-md" 
//                   : "text-gray-300 hover:bg-blue-700 hover:text-white"}`}
//             >
//               {item.icon}
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Doctor Approval Section */}
//       <div className="mt-6 p-4 bg-gray-800 rounded-lg text-gray-300 shadow-md">
//         <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-300">
//           <Stethoscope size={20} /> Doctor Approvals
//         </h3>
//         <p className="text-sm">Pending Approvals: <span className="font-bold text-red-400">5</span></p>
//         <p className="text-sm">Total Doctors: <span className="font-bold text-green-400">12</span></p>
//         <Link to="/doctor-approvals" className="mt-3 inline-block text-blue-400 hover:text-blue-500 text-sm">
//           Manage Approvals →
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, User, Stethoscope } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Restock", path: "/restock", icon: <Package size={20} /> },
    { name: "Add Medicine", path: "/add-medicine", icon: <PlusCircle size={20} /> },
    { name: "Doctors Management", path: "/doctors", icon: <Stethoscope size={20} /> },  // New section
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col shadow-lg">
      <h2 className="text-3xl font-bold mb-6 tracking-wide">Admin Panel</h2>
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                ${location.pathname === item.path 
                  ? "bg-gray-700 text-white font-semibold" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
