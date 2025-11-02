import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderProvider";

export default function OrderManagement() {
  const { orders, fetchAllOrders, updateOrderStatus, loading } = useContext(OrderContext);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = (orderId, e) => {
    const newStatus = e.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              {/* Order Info */}
              <div className="mb-3">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Order ID:</strong> {order._id || order.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">User:</strong>{" "}
                  {order.user?.name || "Unknown"} ({order.user?.email || "No Email"})
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Total:</strong> ₹{order.totalAmount || 0}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Status:</strong>{" "}
                  <span className="font-medium text-blue-600">{order.status || "Not Set"}</span>
                </p>
              </div>

              {/* Order Items */}
              {order.orderItems && order.orderItems.length > 0 && (
                <div className="mb-3">
                  <p className="text-gray-700 font-semibold mb-1">Items:</p>
                  <ul className="list-disc ml-5 text-gray-600 text-sm">
                    {order.orderItems.map((item, i) => (
                      <li key={i}>
                        {item.productName} × {item.quantity} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Status Dropdown */}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id || order.id, e)}
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
