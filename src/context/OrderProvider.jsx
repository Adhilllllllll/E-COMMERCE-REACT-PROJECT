// OrderProvider.jsx
import React, { createContext, useState } from "react";
import api from "../api/Api"; // centralized axios instance

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from all users
  async function fetchOrders() {
    try {
      // Fetch all users from backend
      const res = await api.get("/users"); // GET /users
      const users = res.data.data || [];

      // Flatten all orders with user info
      const allOrders = users.flatMap((user) =>
        (user.orders || []).map((order) => ({
          ...order,
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
        }))
      );

      setOrders(allOrders);
    } catch (error) {
      console.error("Failed to load orders:", error.response?.data || error.message);
    }
  }

  // Update order status for a specific user's order
  async function setOrderStatus(userId, orderId, newStatus) {
    try {
      // Get the user by ID
      const res = await api.get(`/users/${userId}`);
      const user = res.data.data;

      // Update the orders array for this user
      const updatedOrders = (user.orders || []).map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );

      // Send patch request to update user's orders
      await api.patch(`/users/${userId}`, { orders: updatedOrders });

      console.log(`Order ${orderId} status updated to ${newStatus}`);

      // Refresh orders state
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status:", err.response?.data || err.message);
    }
  }

  return (
    <OrderContext.Provider
      value={{ orders, fetchOrders, setOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
}
