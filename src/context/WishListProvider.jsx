import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider"; // adjust path

export const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(
          JSON.parse(savedWishlist).map(id => Number(id)).filter(Boolean)
        );
      } catch (e) {
        console.error("Error parsing wishlist from localStorage:", e);
      }
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (productId) => {
    if (!loggedInUser) {
      alert("Please login to add items to wishlist");
      return;
    }
    const id = Number(productId);
    if (!id) return;
    setWishlist(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (productId) => {
    const id = Number(productId);
    setWishlist(prev => prev.filter(itemId => itemId !== id));
  };

  const toggleWishlist = (productId) => {
    if (!loggedInUser) {
      alert("Please login to add items to wishlist");
      return;
    }
    const id = Number(productId);
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(Number(productId));

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount: wishlist.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
