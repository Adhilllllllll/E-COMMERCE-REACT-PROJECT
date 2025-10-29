// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthProvider";
// import { useNavigate } from "react-router-dom";
// import  api from "../api/Api";

// export const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   const { loggedInUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     if (loggedInUser?.id) {
//       setCart(loggedInUser.cart || []);
//       fetchCart(loggedInUser.id);
//     } else {
//       setCart([]);
//     }
//   }, [loggedInUser]);

//   const fetchCart = async (userId) => {
//     try {
//       const { data } = await axios.get(`${userApi}/${userId}`);
//       setCart(data.cart || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   const updateUserCart = async (userId, newCart) => {
//     try {
//       await axios.patch(`${userApi}/${userId}`, { cart: newCart });
//       setCart(newCart);
//     } catch (err) {
//       console.error(" Error updating cart:", err);
//     }
//   };

//   const addToCart = async (product) => {
//     if (!loggedInUser) {
//       alert("⚠️ You must be logged in to add items to cart.");
//       navigate("/login");
//       return;
//     }

//     //  use productId consistently
//     const existingItem = cart.find((item) => item.productId === product.id);
//     let newCart;
//     if (existingItem) {
//       newCart = cart.map((item) =>
//         item.productId === product.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       const newItem = {
//         productId: product.id,
//         name: product.title || product.name,
//         brand: product.brand,
//         price: product.price,
//         image: product.image || product.images?.[0],
//         size: product.size || "50ml",
//         quantity: 1,
//         id: Date.now(),
//       };
//       newCart = [...cart, newItem];
//     }
//     await updateUserCart(loggedInUser.id, newCart);
//   };

//   const removeFromCart = async (cartItemId) => {
//     if (!loggedInUser) return;
//     const newCart = cart.filter((item) => item.id !== cartItemId);
//     await updateUserCart(loggedInUser.id, newCart);
//   };

//   const updateQuantity = async (cartItemId, change) => {
//     if (!loggedInUser) return;
//     const newCart = cart.map((item) =>
//       item.id === cartItemId
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     await updateUserCart(loggedInUser.id, newCart);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         fetchCart,
//         cartCount: cart.reduce((sum, item) => sum + item.quantity, 0)
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;


import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../api/Api"; // ✅ Axios instance

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (loggedInUser?._id) {
      fetchCart(loggedInUser._id);
    } else {
      setCart([]);
    }
  }, [loggedInUser]);

  // ✅ Fetch user cart from MongoDB
  const fetchCart = async (userId) => {
    try {
      const { data } = await api.get(`/users/${userId}/cart`);
      setCart(data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ✅ Update user cart in MongoDB
  const updateUserCart = async (userId, newCart) => {
    try {
      await api.patch(`/users/${userId}/cart`, { cart: newCart });
      setCart(newCart);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (product) => {
    if (!loggedInUser) {
      alert("⚠️ You must be logged in to add items to cart.");
      navigate("/login");
      return;
    }

    const existingItem = cart.find((item) => item.productId === product._id);
    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem = {
        productId: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      newCart = [...cart, newItem];
    }
    await updateUserCart(loggedInUser._id, newCart);
  };

  // ✅ Remove from cart
  const removeFromCart = async (cartItemId) => {
    if (!loggedInUser) return;
    const newCart = cart.filter((item) => item.productId !== cartItemId);
    await updateUserCart(loggedInUser._id, newCart);
  };

  // ✅ Update quantity
  const updateQuantity = async (cartItemId, change) => {
    if (!loggedInUser) return;
    const newCart = cart.map((item) =>
      item.productId === cartItemId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    await updateUserCart(loggedInUser._id, newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
