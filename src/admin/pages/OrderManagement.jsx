import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderProvider";

export default function OrderManagement() {
  const { orders, fetchOrders, setOrderStatus } = useContext(OrderContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (userId, orderId, e) => {
    const newStatus = e.target.value;
    setOrderStatus(userId, orderId, newStatus);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <div className="mb-3">
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Order ID:</strong> {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">User:</strong> {order.userName} ({order.userEmail})
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Status:</strong>{" "}
                  <span className="font-medium text-blue-600">{order.status || "Not Set"}</span>
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.userId, order.id, e)}
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
