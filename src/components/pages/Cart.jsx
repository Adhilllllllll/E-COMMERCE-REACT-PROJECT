 



// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/Api"; // Axios instance with baseURL
// import { AuthContext } from "../../context/AuthProvider";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { loggedInUser } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart items
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!loggedInUser) {
//         setCartItems([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get(`/cart`); // backend should return user's cart
//         setCartItems(res.data.cart || []);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//         setCartItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [loggedInUser]);

//   // Update quantity
//   const updateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     try {
//       const res = await api.get(`/cart/${productId}`, { quantity: newQuantity });
//       setCartItems(res.data.cart || []);
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//     }
//   };

//   // Remove item
//   const removeFromCart = async (productId) => {
//     try {
//       await api.delete(`/cart/${productId}`);
//       setCartItems(cartItems.filter((item) => item.productId._id !== productId));
//     } catch (err) {
//       console.error("Failed to remove item:", err);
//     }
//   };

//   // Calculate total
//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//     0
//   );

//   // Handle checkout
//   const handleCheckout = () => {
//     navigate("/payment", { state: { cartItems, totalPrice } });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-700 text-lg">Loading your cart...</p>
//       </div>
//     );
//   }

//   if (!cartItems.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//           <button
//             onClick={() => navigate("/shop")}
//             className="bg-emerald-500 text-white px-6 py-2 rounded-md"
//           >
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

//         <div className="space-y-4 mb-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.productId._id}
//               className="flex justify-between items-center border-b pb-2"
//             >
//               <div>
//                 <p className="font-medium">{item.productId.name}</p>
//                 <p className="text-gray-500 text-sm">
//                   Price: ${item.productId.price.toFixed(2)}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   Qty:{" "}
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       updateQuantity(item.productId._id, parseInt(e.target.value))
//                     }
//                     className="w-16 text-center border rounded-md px-2 py-1"
//                   />
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <p className="font-medium">
//                   ${(item.productId.price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => removeFromCart(item.productId._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t pt-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 text-white px-6 py-2 rounded-md"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;




// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/Api"; // Axios instance with baseURL
// import { AuthContext } from "../../context/AuthProvider";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { loggedInUser } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch user's cart items
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!loggedInUser) {
//         setCartItems([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.get(`/cart`); // backend: getCartItems
//         setCartItems(res.data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch cart:", err);
//         setCartItems([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [loggedInUser]);

//   // ✅ Update item quantity
//   const updateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     try {
//       const res = await api.put(`/cart/updateCartItem/${productId}`, {
//         quantity: newQuantity,
//       });
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.productId._id === productId
//             ? { ...item, quantity: newQuantity }
//             : item
//         )
//       );
//     } catch (err) {
//       console.error("Failed to update quantity:", err);
//     }
//   };

//   // ✅ Remove item from cart
//   const removeFromCart = async (productId) => {
//     try {
//       await api.delete(`/cart/deleteFromCart/${productId}`);
//       setCartItems((prev) =>
//         prev.filter((item) => item.productId._id !== productId)
//       );
//     } catch (err) {
//       console.error("Failed to remove item:", err);
//     }
//   };

//   // ✅ Calculate total price
//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//     0
//   );

//   // ✅ Handle checkout
//   const handleCheckout = () => {
//     navigate("/payment", { state: { cartItems, totalPrice } });
//   };

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-700 text-lg">Loading your cart...</p>
//       </div>
//     );
//   }

//   // ✅ Empty cart state
//   if (!cartItems.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
//           <button
//             onClick={() => navigate("/shop")}
//             className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition"
//           >
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Main cart display
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">🛍️ Your Cart</h1>

//         <div className="space-y-6 mb-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.productId._id}
//               className="flex justify-between items-center border-b pb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.productId.image || "/placeholder.png"}
//                   alt={item.productId.name}
//                   className="w-20 h-20 object-cover rounded-md"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-800">
//                     {item.productId.name}
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     ${item.productId.price?.toFixed(2)}
//                   </p>
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.productId._id, item.quantity - 1)
//                       }
//                       disabled={item.quantity <= 1}
//                       className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
//                     >
//                       -
//                     </button>
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateQuantity(
//                           item.productId._id,
//                           parseInt(e.target.value)
//                         )
//                       }
//                       className="w-14 text-center border-t border-b border-gray-300"
//                     />
//                     <button
//                       onClick={() =>
//                         updateQuantity(item.productId._id, item.quantity + 1)
//                       }
//                       className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col items-end">
//                 <p className="font-medium text-lg text-gray-800">
//                   ${(item.productId.price * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => removeFromCart(item.productId._id)}
//                   className="text-red-500 text-sm mt-2 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="border-t pt-6 flex justify-between items-center">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Total: ${totalPrice.toFixed(2)}
//           </h2>
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../api/Api"
import { toast } from "react-toastify";

const Cart = () => {
  console.log('ggyjgjyjgy')
  const { loggedInUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCartItems = async () => {
    if (!loggedInUser) {
      toast.error("Please login to view your cart!");
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/carts", { withCredentials: true });
      setCartItems(res.data.data || []);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  fetchCartItems();
}, [loggedInUser]);

const removeFromCart = async (productId) => {
  try {
    await api.delete(`/carts/deleteFromCart/${productId}`, { withCredentials: true });
    setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
    toast.success("Removed from cart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove item");
  }
};

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.image || "/placeholder.png"}
                  alt={item.productId?.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.productId?.name}</h3>
                  <p className="text-gray-600">
                    ₹{item.productId?.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
