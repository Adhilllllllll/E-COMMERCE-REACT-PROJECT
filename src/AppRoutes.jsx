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
import Error404 from "./admin/pages/Error404";

import AdminLayout from "./admin/pages/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductManagement from "./admin/pages/ProductManagement";
import UserManagement from "./admin/pages/UserManagement";
import OrderManagement from "./admin/pages/OrderManagement";

import CustomerLayout from "./components/CustomerLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Layout with Nested Routes */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShoppingPage />} />
        <Route path="productdetails/:id" element={<ProductDetails />} />

        {/* Customer Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="order" element={<Order />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Route>

      {/* Auth Routes (outside layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Layout with Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
