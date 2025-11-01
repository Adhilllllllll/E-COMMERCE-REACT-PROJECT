import axios from "axios";
import React, { createContext, useState } from "react";
// import { userApi } from "../api/api";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from all users
  async function fetchOrders() {
    try {
      const res = await axios.get(userApi);

      const allOrders = res.data.flatMap((user) =>
        (user.orders || []).map((order) => ({
          ...order,
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
        }))
      );

      setOrders(allOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }

  // Update order status
  async function setOrderStatus(userId, orderId, newStatus) {
    try {
      const res = await axios.get(`${userApi}/${userId}`);
      const user = res.data;

      // Update the orders array for this user
      const updatedOrders = (user.orders || []).map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );

      await axios.patch(`${userApi}/${userId}`, {
        orders: updatedOrders,
      });

      console.log(`Order ${orderId} status updated to ${newStatus}`);

      // Refresh state so UI updates
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order status:", err);
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
