import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { userApi } from "../Api";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { loggedInUser } = useContext(AuthContext); 
  console.log(loggedInUser);

  console.log(loggedInUser, "from caRT PROVIDERRRRRR");
  const navigate = useNavigate();

  //function to fetch cartt
  async function fetchCart(userID) {
    try {
      const { data } = await axios.get(`http://localhost:3000/user/${userID}`);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Fetch cart items when user logs in
  useEffect(() => {
    fetchCart(loggedInUser?.id);
  }, []);



  // useEffect(() => {
  //   if (loggedInUser && loggedInUser.id) {
  //     fetchCart(loggedInUser.id);
  //   } else {
  //     setCart([]); // clear cart when logged out
  //   }
  // }, [loggedInUser]);

  // const fetchCart = async (userId) => {
  //   try {
  //     const { data } = await axios.get(`${CART_API}?userId=${userId}`);
  //     setCart(data);
  //   } catch (err) {
  //     console.error("❌ Error fetching cart:", err);
  //   }
  // };

  // Add to Cart
  const addToCart = async (product) => {
    try {
      console.log(loggedInUser);
      if (!loggedInUser) {
        alert("⚠️ You must be logged in to add items to cart.");
        navigate('/login');
        
      }

      const existingItem = cart.find((item) => item.productId === product.id);

      if (existingItem) {
        await updateQuantity(existingItem.id, 1);
      } else {
        const newItem = {
          userId: loggedInUser.id,
          productId: product.id,
          name: product.title || product.name,
          brand: product.brand,
          price: product.price,
          image: product.image || product.images?.[0],
          size: product.size || "50ml",
          quantity: 1,
        };

        const { data } = await axios.post(CART_API, newItem);
        setCart((prev) => [...prev, data]);
      }

      // ✅ redirect to cart page after adding
      // navigate("/cart");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
    }
  };

  // Remove from Cart
  // const removeFromCart = async (cartItemId) => {
  //   try {
  //     await axios.delete(`${CART_API}/${cartItemId}`);
  //     setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  //   } catch (err) {
  //     console.error("❌ Error removing from cart:", err);
  //   }
  // };

  // Update Quantity
  // const updateQuantity = async (cartItemId, change) => {
  //   try {
  //     const item = cart.find((c) => c.id === cartItemId);
  //     if (!item) return;

  //     const newQuantity = Math.max(1, item.quantity + change);
  //     const updatedItem = { ...item, quantity: newQuantity };

  //     await axios.put(`${CART_API}/${cartItemId}`, updatedItem);

  //     setCart((prev) =>
  //       prev.map((c) => (c.id === cartItemId ? updatedItem : c))
  //     );
  //   } catch (err) {
  //     console.error("❌ Error updating quantity:", err);
  //   }
  // };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
