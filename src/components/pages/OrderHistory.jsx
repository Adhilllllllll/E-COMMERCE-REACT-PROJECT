import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../context/OrderProvider";

const OrderHistory = () => {
  const { loggedInUser } = useContext(AuthContext);
  // const { orders } = useContext(OrderContext);
  const navigate = useNavigate();

  if (!loggedInUser?.orders || loggedInUser.orders.length === 0) {
   

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
    <div className="max-w-4xl  mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6"><br/>My Orders</h1>
      <div className="space-y-6">
        {loggedInUser.orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-md shadow-sm bg-white">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
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
