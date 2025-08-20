import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { userApi } from "../Api";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch cart items when user logs in
  useEffect(() => {
    if (loggedInUser?.id) {
      fetchCart(loggedInUser.id);
    } else {
      setCart([]); // clear cart if logged out
    }
  }, [loggedInUser]);

  // Fetch cart for user
  const fetchCart = async (userId) => {
    try {
      const { data } = await axios.get(`${userApi}/${userId}`);
      setCart(data.cart || []);
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // Helper to update user's cart on server
  const updateUserCart = async (userId, newCart) => {
    try {
      await axios.patch(`${userApi}/${userId}`, { cart: newCart });
      setCart(newCart);
    } catch (err) {
      console.error("❌ Error updating cart:", err);
    }
  };

  // Add to Cart
  const addToCart = async (product) => {
    if (!loggedInUser) {
      alert("⚠️ You must be logged in to add items to cart.");
      navigate('/login');
      return;
    }
    const existingItem = cart.find((item) => item.productId === product.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem = {
        productId: product.id,
        name: product.title || product.name,
        brand: product.brand,
        price: product.price,
        image: product.image || product.images?.[0],
        size: product.size || "50ml",
        quantity: 1,
        id: Date.now() // local id for rendering
      };
      newCart = [...cart, newItem];
    }
    await updateUserCart(loggedInUser.id, newCart);
    navigate("/cart");
  };

  // Remove from Cart
  const removeFromCart = async (cartItemId) => {
    if (!loggedInUser) return;
    const newCart = cart.filter((item) => item.id !== cartItemId);
    await updateUserCart(loggedInUser.id, newCart);
  };

  // Update Quantity
  const updateQuantity = async (cartItemId, change) => {
    if (!loggedInUser) return;
    const newCart = cart.map((item) =>
      item.id === cartItemId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    await updateUserCart(loggedInUser.id, newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
