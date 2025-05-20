import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./login/LandingPage.jsx";
import Login from "./login/Login.jsx";
import Signup from "./login/Signup.jsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Sidebar from "./components/Sidebar";
import Restock from "./pages/Restock";
import AddMedicine from "./pages/AddMedicine";
import Profile from "./pages/Profile";
import DoctorsSection from "./pages/DoctorsSection";
import Settings from "./pages/Settings";
import BuyMedicine from "./components/Medicine_Buy/BuyMedicine";
import ViewHistory from "./pages/ViewHistory";
import DoctorProfileDashboard from "./pages/docterprofiledashboard.jsx";
import UploadForm from "./components/UploadForm";
import HomePage from "./components/HomePage";
import RestockBill from "./pages/RestockBill.jsx";

function App() {
  const isAuthenticated = localStorage.getItem("adminToken"); // Authentication check

  return (
    <Router>
      <Routes>
        {/* Redirect to landing page after login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/landing" /> : <Navigate to="/login" />} />

        {/* Login & Signup Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<Login />} />
        

        {/* Landing Page (after login) */}
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/home" element={<HomePage />} />

        {/* User Pages */}
        <Route path="/user" element={<BuyMedicine />} />
        <Route path="/view-history" element={<ViewHistory />} />
        <Route path="/skin_detection" element={<UploadForm />} />
        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedRoute
                element={
                  <div className="flex h-screen">
                    <Sidebar />
                    <main className="flex-1 p-5 overflow-auto">
                      <Routes>
                      <Route path="/skin_detection" element={<UploadForm />} />
                        <Route path="/admindashboard" element={<Dashboard />} />
                        <Route path="/restock" element={<Restock />} />
                        <Route path="/restockbill" element={<RestockBill />} />
                        <Route path="/add-medicine" element={<AddMedicine />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/doctors" element={<DoctorsSection />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/doctorprofile/:id" element={<DoctorProfileDashboard/>}/>
                      </Routes>
                    </main>
                  </div>
                }
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
