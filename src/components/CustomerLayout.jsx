import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/pages/NavBar";
import Footer from "../components/pages/Footer";

const CustomerLayout = () => {
  const location = useLocation();

  // footer should hide
  const hideFooterRoutes = ["/cart",'/orders','/wishlist','/payment','/order'];

  // navbar should hide
  const hideNavRoutes=[];

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);
  const shouldShowNavbar= !hideNavRoutes.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      {shouldShowNavbar && <Navbar/>}
      {/* <Navbar /> */}

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer (conditionally) */}
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default CustomerLayout;
