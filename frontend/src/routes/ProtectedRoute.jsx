import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // Check if admin is logged in

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
