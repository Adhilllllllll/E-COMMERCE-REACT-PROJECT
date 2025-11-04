 

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api"; // ✅ use shared axios instance

const OrderHistory = () => {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!loggedInUser?._id) return;

      try {
        // const { data } = await api.get(`/users/${loggedInUser._id}`);
        // const userData = data.data || data;

        // setOrders(userData.orders || []);
        // setLoggedInUser(userData);

        const { data } = await api.get("/orders", { withCredentials: true });
setOrders(data.allOrders || []);


      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [loggedInUser, setLoggedInUser]);

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No orders found</h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 mt-7">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
      {orders.map((order) => (
  <div
    key={order._id}
    className="p-4 border rounded-md shadow-sm bg-white"
  >
    <p><strong>Order ID:</strong> {order._id}</p>
    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
    <p><strong>Status:</strong> {order.status}</p>
    <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
    <p><strong>Total:</strong> ${order.totalPrice?.toFixed(2) || "0.00"}</p>
    <button
      onClick={() => navigate("/order", { state: { order } })}
      className="mt-3 bg-emerald-500 text-white px-4 py-2 rounded-md"
    >
      View Details
    </button>
  </div>
))}


      </div>
    </div>
  );
};

export default OrderHistory;
