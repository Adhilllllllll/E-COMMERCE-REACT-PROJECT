import React from "react";
import { Route, Routes } from "react-router-dom";

// import Error404 from "../pages/Error404";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import ProductManagement from "../pages/ProductManagement";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* protecting the AdminRoutes */}
      <Route
        path="/"
        element={
          <ProtectedRoutes role="admin">
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      {/* catch all unknouwn AdminRoutes  */}
      
      <Route path="/productmanage" element={<ProductManagement/>} />
      {/* <Route path="*" element={<Error404 />} /> */}
      
      

    </Routes>
  );
};

export default AdminRoutes;
