import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Restock from "./pages/Restock";
import AddMedicine from "./pages/AddMedicine";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-5 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/restock" element={<Restock />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
