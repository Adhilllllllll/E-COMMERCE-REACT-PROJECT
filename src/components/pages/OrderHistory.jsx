  

import React, { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderProvider";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { orders, loading, fetchMyOrders } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders(); // Load user orders on mount
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading orders...</p>
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
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 mt-7">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            {/* Top Info */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>

            {/* Order Summary */}
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentStatus?.toUpperCase()}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice?.toFixed(2)}</p>

            {/* 🛒 Product list */}
            <div className="mt-4 border-t pt-3 space-y-3">
              <h3 className="font-medium text-gray-700 mb-2">Items:</h3>
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
                      <p className="font-medium">{item.productId?.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ₹{(item.productId?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* View button */}
            <button
              onClick={() => navigate("/order", { state: { order } })}
              className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-md"
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

