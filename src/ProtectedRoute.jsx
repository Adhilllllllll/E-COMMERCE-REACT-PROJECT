// src/components/auth/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import Swal from "sweetalert2";

const ProtectedRoute = ({ allowedRoles }) => {
  const { loggedInUser } = useContext(AuthContext);

  // Guest trying to access protected route
  if (!loggedInUser) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to continue!",
      confirmButtonText: "Go to Login",
    }).then(() => {
      window.location.href = "/login";
    });
    return null; // prevent rendering
  }

  // Role check
  if (!allowedRoles.includes(loggedInUser.role)) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
