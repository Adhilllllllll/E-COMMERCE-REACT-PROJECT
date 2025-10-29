// import React, { useEffect, useState, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthProvider";
// import { userApi } from "../../api/Api";

// const Order = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { loggedInUser } = useContext(AuthContext);
//   const orderId = location.state?.order?.id;

//   const [order, setOrder] = useState(location.state?.order || null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       if (!loggedInUser || !orderId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch latest user data
//         const { data: userData } = await axios.get(`${userApi}/${loggedInUser.id}`);

//         // Find the latest version of the order
//         const latestOrder = userData.orders.find((o) => o.id === orderId);

//         setOrder(latestOrder || null);
//       } catch (error) {
//         console.error("Failed to fetch order:", error);
//         setOrder(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [loggedInUser, orderId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-700 text-lg">Loading order details...</p>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">No order found</h2>
//           <button
//             onClick={() => navigate("/products")}
//             className="bg-emerald-500 text-white px-6 py-2 rounded-md"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const displayDate = order.createdAt ? new Date(order.createdAt) : new Date();

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white mt-7 shadow rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//           ORDER PLACED SUCCESSFULLY
//         </h1>

//         <div className="mb-6">
//           <p className="text-gray-700">
//             <strong>Order ID:</strong> {order.id}
//           </p>
//           <p className="text-gray-700">
//             <strong>Date:</strong>{" "}
//             {displayDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
//           </p>
//           <p className="text-gray-700">
//             <strong>Status:</strong> {order.status}
//           </p>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Items</h2>
//         <div className="space-y-4 mb-6">
//           {order.items.map((item) => (
//             <div key={item.id} className="flex justify-between border-b pb-2">
//               <div>
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-gray-500 text-sm">
//                   Qty: {item.quantity} | Size: {item.size}
//                 </p>
//               </div>
//               <p className="font-medium">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </p>
//             </div>
//           ))}
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
//         <div className="text-gray-700 mb-6">
//           <p>{order.shippingAddress.street}</p>
//           <p>{order.shippingAddress.city}</p>
//           <p>
//             {order.shippingAddress.state} - {order.shippingAddress.pin}
//           </p>
//           <p>Mobile: {order.shippingAddress.mobile}</p>
//         </div>

//         <div className="border-t pt-4">
//           <h2 className="text-xl font-semibold">
//             Total: ${order.total.toFixed(2)}
//           </h2>
//         </div>

//         <div className="mt-6 flex gap-4">
//           <button
//             onClick={() => navigate("/shop")}
//             className="bg-emerald-500 text-white px-6 py-2 rounded-md"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={() => navigate("/orders")}
//             className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;



import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/Api"; // ✅ correct import
import { AuthContext } from "../../context/AuthProvider";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const orderId = location.state?.order?.id;

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!loggedInUser || !orderId) {
        setLoading(false);
        return;
      }

      try {
        // ✅ Fetch latest user data from backend
        const { data } = await api.get(`/users/${loggedInUser._id}`);
        const userData = data.data || data;

        // ✅ Find order in user data
        const latestOrder = userData.orders?.find((o) => o.id === orderId);
        setOrder(latestOrder || null);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [loggedInUser, orderId]);

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
          <p className="text-gray-700">
            <strong>Order ID:</strong> {order.id}
          </p>
          <p className="text-gray-700">
            <strong>Date:</strong>{" "}
            {displayDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong> {order.status}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="space-y-4 mb-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  Qty: {item.quantity} | Size: {item.size}
                </p>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="text-gray-700 mb-6">
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}</p>
          <p>
            {order.shippingAddress.state} - {order.shippingAddress.pin}
          </p>
          <p>Mobile: {order.shippingAddress.mobile}</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold">
            Total: ${order.total.toFixed(2)}
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
