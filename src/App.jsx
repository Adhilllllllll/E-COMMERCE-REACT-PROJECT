import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import ProductProvider from "./context/ProductProvider";
import Navbar from "./components/pages/NavBar";
import Footer from "./components/pages/Footer";
import CartProvider from "./context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const location = useLocation();

  // Routes where Navbar & Footer should be hidden
  const hideLayoutRoutes = ["/login", "/register", "/payment"];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
      {/* {!shouldHideLayout && <Footer />} */}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
          {/* ✅ Toast container globally */}
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
