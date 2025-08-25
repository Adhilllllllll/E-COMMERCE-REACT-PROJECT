import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/pages/NavBar";
import Footer from "../components/pages/Footer";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
