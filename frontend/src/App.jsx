// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Restock from "./pages/Restock";
// import AddMedicine from "./pages/AddMedicine";
// import Profile from "./pages/Profile";
// import DoctorsSection from "./pages/DoctorsSection";
// import Settings from "./pages/Settings";
// function App() {
//   return (
//     <Router>
//       <div className="flex h-screen">
//         <Sidebar />
//         <main className="flex-1 p-5 overflow-auto"> 
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/restock" element={<Restock />} />
//             <Route path="/add-medicine" element={<AddMedicine />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/doctors" element={<DoctorsSection />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./login/LandingPage.jsx";
import Login from "./login/LoginPage.jsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Sidebar from "./components/Sidebar";
import Restock from "./pages/Restock";
import AddMedicine from "./pages/AddMedicine";
import Profile from "./pages/Profile";
import DoctorsSection from "./pages/DoctorsSection";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <main className="flex-1 p-5 overflow-auto">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/restock" element={<Restock />} />
                      <Route path="/add-medicine" element={<AddMedicine />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/doctors" element={<DoctorsSection />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
