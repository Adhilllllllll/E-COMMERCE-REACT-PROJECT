 
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
 
 import { toast } from "react-toastify";
 import { userApi } from "../Api";
import { AuthContext } from "./AuthProvider";
import { CartContext } from "./CartProvider";

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const { cart, fetchCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      setOrders(loggedInUser.orders || []);
    } else {
      setOrders([]);
    }
  }, [loggedInUser]);

  // Place a new order
  const placeOrder = async () => {
    if (!loggedInUser) {
      toast.error("⚠️ Please login to place an order.");
      return;
    }

    if (cart.length === 0) {
      toast.error("🛒 Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const updatedUser = {
        ...loggedInUser,
        orders: [...(loggedInUser.orders || []), newOrder],
        cart: [], // clear cart after order
      };

      await axios.patch(`${userApi}/${loggedInUser.id}`, updatedUser);
      setLoggedInUser(updatedUser);
      setOrders(updatedUser.orders);
      fetchCart(loggedInUser.id);
      toast.success("🎉 Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order.");
    }
  };

  // Cancel order (Customer)
  const cancelOrder = async (orderId) => {
    if (!loggedInUser) return;

    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Cancelled" } : o
    );

    try {
      const updatedUser = { ...loggedInUser, orders: updatedOrders };
      await axios.patch(`${userApi}/${loggedInUser.id}`, updatedUser);
      setLoggedInUser(updatedUser);
      setOrders(updatedOrders);
      toast.info("Order cancelled.");
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  // Update order status (Admin)
  const updateOrderStatus = async (userId, orderId, newStatus) => {
    try {
      const { data: user } = await axios.get(`${userApi}/${userId}`);
      const updatedOrders = user.orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );

      await axios.patch(`${userApi}/${userId}`, { orders: updatedOrders });

      // If delivered → move to orderHistory
      if (newStatus === "Delivered") {
        const deliveredOrder = updatedOrders.find((o) => o.id === orderId);
        await axios.patch(`${userApi}/${userId}`, {
          orderHistory: [...(user.orderHistory || []), deliveredOrder],
          orders: updatedOrders.filter((o) => o.id !== orderId),
        });
      }

      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        cancelOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
