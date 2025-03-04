import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="w-64 bg-blue-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
      <ul>
        <li className="mb-3"><Link to="/">Dashboard</Link></li>
        <li className="mb-3"><Link to="/restock">Restock</Link></li>
        <li className="mb-3"><Link to="/add-medicine">Add Medicine</Link></li>
        <li className="mb-3"><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
