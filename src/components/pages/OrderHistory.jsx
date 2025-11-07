 

import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/Api";

const OrderHistory = () => {
  const { orders, loading, fetchMyOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  // 🧩 Cancel order handler
  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      const res = await api.put(`/orders/cancel/${orderId}`, {}, { withCredentials: true });
      toast.success(res.data.message || "Order cancelled successfully!");
      fetchMyOrders(); // refresh the list after cancellation
    } catch (err) {
      console.error("Cancel order error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

  // 🧩 Load user orders on mount
  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No orders found</h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-md transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 mt-5 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            {/* 🔹 Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>

            {/* 🔹 Order Summary */}
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "cancelled"
                      ? "text-red-600"
                      : order.status === "delivered"
                      ? "text-green-600"
                      : "text-blue-600"
                  } font-medium capitalize`}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus?.toUpperCase()}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalPrice?.toFixed(2)}
              </p>
            </div>

            {/* 🔹 Product List */}
            <div className="mt-4 border-t pt-3 space-y-3">
              <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
              {order.products?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.productId?.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-14 h-14 rounded object-cover border"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{item.productId?.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-800">
                    ₹{(item.productId?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* 🔹 Action Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => navigate("/order", { state: { order } })}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-all"
              >
                View Details
              </button>

              {order.status !== "cancelled" && order.status !== "delivered" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
