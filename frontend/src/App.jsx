// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Restock from "./pages/Restock";
// import AddMedicine from "./pages/AddMedicine";
// import Profile from "./pages/Profile";
// import DoctorsSection from "./pages/DoctorsSection";

// function App() {
//   return (
//     <Router>
//       <div className="flex ">
//         <Sidebar />
//         <main className="flex p-5 overflow">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/restock" element={<Restock />} />
//             <Route path="/add-medicine" element={<AddMedicine />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/doctors" element={<DoctorsSection />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Restock from "./pages/Restock";
import AddMedicine from "./pages/AddMedicine";
import Profile from "./pages/Profile";
import DoctorsSection from "./pages/DoctorsSection";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-5 overflow-auto"> {/* This ensures full expansion */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/restock" element={<Restock />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctors" element={<DoctorsSection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
