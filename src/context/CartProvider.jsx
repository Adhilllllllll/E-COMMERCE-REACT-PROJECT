 
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
 import api from "../api/Api"; // centralized axios instance
import { UserContext } from "./UserProvider";
import { AuthContext } from "./AuthProvider";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items when user logs in
  useEffect(() => {
    if(!loggedInUser)return;
    const fetchCart = async () => {
      
      try {
        const { data } = await api.get("/carts"); // token auto-attached
        setCart(data.data || []);
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      }
    };

    fetchCart();
  }, [loggedInUser]);

  // Add item to cart
  const addToCart = async (product) => {
    if (!loggedInUser) {
      alert("You must be logged in to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.post(`/carts/addToCart/${product._id}`);
      if (data.data) setCart((prev) => [...prev, data.data]);
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/carts/deleteFromCart/${productId}`);
      setCart(data.data || []);
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const { data } = await api.put(`/carts/updateCartItem/${productId}`, { quantity });
      setCart((prev) =>
        prev.map((item) => (item.productId._id === productId ? data.data : item))
      );
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data || err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount: cart.reduce((sum, item) => sum + (item.quantity|| 0),0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
