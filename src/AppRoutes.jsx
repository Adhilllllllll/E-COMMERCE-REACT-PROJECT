import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/nonAuth/HomePage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ShoppingPage from "./components/nonAuth/ShoppingPage";
import Cart from "./components/pages/Cart";
import ProductDetails from "./components/nonAuth/ProductDetails";
import Payment from "./components/pages/Payment";
import Order from "./components/pages/Order";
import OrderHistory from "./components/pages/OrderHistory";
import Wishlist from "./components/pages/Wishlist";
import Dashboard from "./admin/pages/Dashboard";
import Error404 from "./admin/pages/Error404";
import ProductManagement from "./admin/pages/ProductManagement";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShoppingPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Dashboard/>} />
        {/* <Route path="*" element={<Error404 />} /> */}
        <Route path="/productmanage" element={<ProductManagement/>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
