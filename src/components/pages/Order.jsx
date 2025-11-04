 


import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/Api";
import { AuthContext } from "../../context/AuthProvider";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const orderId = location.state?.order?._id || location.state?.order?.id;

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!loggedInUser || !orderId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user's orders from backend
        const { data } = await api.get(`/users/${loggedInUser._id}`);
        const userOrders = data.orders || data.data?.orders || [];

        // Find the current order by _id or id
        const latestOrder = userOrders.find(
          (o) => o._id === orderId || o.id === orderId
        );
        setOrder(latestOrder || location.state?.order || null);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setOrder(location.state?.order || null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [loggedInUser, orderId, location.state?.order]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No order found</h2>
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

  const displayDate = order.createdAt ? new Date(order.createdAt) : new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white mt-7 shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ORDER PLACED SUCCESSFULLY
        </h1>
<div className="mb-6">
  <p className="text-gray-700"><strong>Order ID:</strong> {order._id}</p>
  <p className="text-gray-700">
    <strong>Date:</strong>{" "}
    {new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
  </p>
  <p className="text-gray-700"><strong>Status:</strong> {order.status}</p>
  <p className="text-gray-700">
    <strong>Payment Status:</strong> {order.paymentStatus?.toUpperCase()}
  </p>
  {order.paymentMethod && (
    <p className="text-gray-700"><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
  )}
</div>

        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="space-y-4 mb-6">
          {order.products?.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.productId?.name || item.name}</p>
                <p className="text-gray-500 text-sm">
                  Qty: {item.quantity} {item.size ? `| Size: ${item.size}` : ""}
                </p>
              </div>
              <p className="font-medium">
                ${(item.productId?.price * item.quantity || item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="text-gray-700 mb-6">
          {typeof order.address === "string" ? (
            <p>{order.address}</p>
          ) : (
            <>
              <p>{order.address?.street}</p>
              <p>{order.address?.city}</p>
              <p>{order.address?.state} - {order.address?.pin}</p>
              <p>Mobile: {order.address?.mobile}</p>
            </>
          )}
        </div>

       <div className="border-t pt-4">
  <h2 className="text-xl font-semibold">
    Total: ${order.totalPrice?.toFixed(2) || 0}
  </h2>
</div>


        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
