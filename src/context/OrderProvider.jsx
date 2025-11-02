// // OrderProvider.jsx
// import React, { createContext, useState } from "react";
// import api from "../api/Api"; // centralized axios instance

// export const OrderContext = createContext();

// export default function OrderProvider({ children }) {
//   const [orders, setOrders] = useState([]);

//   // Fetch all orders from all users
//   async function fetchOrders() {
//     try {
//       // Fetch all users from backend
//       const res = await api.get("/users"); // GET /users
//       const users = res.data.data || [];

//       // Flatten all orders with user info
//       const allOrders = users.flatMap((user) =>
//         (user.orders || []).map((order) => ({
//           ...order,
//           userId: user._id,
//           userName: user.name,
//           userEmail: user.email,
//         }))
//       );

//       setOrders(allOrders);
//     } catch (error) {
//       console.error("Failed to load orders:", error.response?.data || error.message);
//     }
//   }

//   // Update order status for a specific user's order
//   async function setOrderStatus(userId, orderId, newStatus) {
//     try {
//       // Get the user by ID
//       const res = await api.get(`/users/${userId}`);
//       const user = res.data.data;

//       // Update the orders array for this user
//       const updatedOrders = (user.orders || []).map((order) =>
//         order._id === orderId ? { ...order, status: newStatus } : order
//       );

//       // Send patch request to update user's orders
//       await api.patch(`/users/${userId}`, { orders: updatedOrders });

//       console.log(`Order ${orderId} status updated to ${newStatus}`);

//       // Refresh orders state
//       fetchOrders();
//     } catch (err) {
//       console.error("Failed to update order status:", err.response?.data || err.message);
//     }
//   }

//   return (
//     <OrderContext.Provider
//       value={{ orders, fetchOrders, setOrderStatus }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// }


import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/Api";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

export const OrderContext = createContext();

export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  // 🔹 Fetch orders for logged-in user (user side)
  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders", { withCredentials: true });
      setOrders(res.data.allOrders || []);
    } catch (err) {
      console.error("Failed to load user orders:", err.response?.data || err.message);
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch all orders (admin side)
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/allOrders", { withCredentials: true });
      setOrders(res.data.allOrders || []);
    } catch (err) {
      console.error("Failed to load all orders:", err.response?.data || err.message);
      toast.error("Failed to load all orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create order (user checkout)
  const createOrder = async (address) => {
    try {
      const res = await api.post("/orders", { address }, { withCredentials: true });
      toast.success("Order placed successfully!");
      fetchMyOrders();
    } catch (err) {
      console.error("Order creation failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  // 🔹 Update order status (admin)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/changeOrderStatus/${orderId}`, { status: newStatus }, { withCredentials: true });
      toast.success("Order status updated!");
      fetchAllOrders();
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err.message);
      toast.error("Failed to update order status");
    }
  };

  // 🔹 Pay order (user)
  const payOrder = async (orderId) => {
    try {
      const res = await api.patch(`/orders/pay/${orderId}`, {}, { withCredentials: true });
      toast.success("Payment successful!");
      fetchMyOrders();
    } catch (err) {
      console.error("Payment failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  // 🔹 Auto fetch based on role
  useEffect(() => {
    if (!loggedInUser) return;
    if (loggedInUser.role === "admin") fetchAllOrders();
    else fetchMyOrders();
  }, [loggedInUser]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchMyOrders,
        fetchAllOrders,
        createOrder,
        updateOrderStatus,
        payOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
