import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/nonAuth/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ShoppingPage from "./components/nonAuth/ShoppingPage";
import Cart from "./components/pages/Cart";
import ProductDetails from "./components/nonAuth/ProductDetails";
import Payment from "./components/pages/Payment";
 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/shop" element={<ShoppingPage />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      
      


      <Route />
    </Routes>
  );
};

export default AppRoutes;
