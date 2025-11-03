import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Api"; // centralized axios instance
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Fetch cart items when user logs in
  useEffect(() => {
    if (!loggedInUser) return;
    fetchCart();
  }, [loggedInUser]);

  //  Fetch cart helper
  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/carts", { withCredentials: true });
      setCart(data.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  //  Add item to cart
  const addToCart = async (product) => {
    if (!loggedInUser) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const { data } = await api.post(`/carts/addToCart/${product._id}`, {}, { withCredentials: true });
      // update the cart state with new item
      if (data.data) {
        setCart((prev) => {
          const existing = prev.find((item) => item.productId._id === product._id);
          if (existing) {
            // update quantity if item already exists
            return prev.map((item) =>
              item.productId._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prev, data.data];
          }
        });
        toast.success("Added to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      toast.error("Failed to add item to cart");
    }
  };

  //  Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/carts/deleteFromCart/${productId}`, { withCredentials: true });
      setCart((prev) => prev.filter((item) => item.productId._id !== productId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
      toast.error("Failed to remove item");
    }
  };

  // ✅ Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const { data } = await api.put(`/carts/updateCartItem/${productId}`, { quantity }, { withCredentials: true });
      setCart((prev) =>
        prev.map((item) =>
          item.productId._id === productId ? { ...item, quantity } : item
        )
      );
      toast.info("Quantity updated");
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data || err.message);
      toast.error("Failed to update quantity");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount: cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
