import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import Swal from "sweetalert2";

const ProtectedRoute = ({ allowedRoles }) => {
  const { loggedInUser, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  // Guest access
  if (!loggedInUser) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to continue!",
      confirmButtonText: "Go to Login",
    }).then(() => {
      window.location.href = "/login";
    });
    return null;
  }

  // Role-based access
  const userRole = loggedInUser?.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
