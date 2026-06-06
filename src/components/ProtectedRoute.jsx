import { isAuthorized, getUser } from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthorized()) {
    return <Navigate to="/auth" replace />;
  }

  if (role === "admin") {
    const user = getUser();
    if (user?.role?.toLowerCase() !== "admin") {
      return <Navigate to="/" replace />; // Agar admin nahi hai toh home bhej do
    }
  }

  return children;
};

export default ProtectedRoute;