// import React, { createContext, useState, useContext, useEffect } from "react";
// import { AuthContext } from "./AuthProvider"; // adjust path
// import api from  "../api/Api"

// export const WishlistContext = createContext();

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error("useWishlist must be used within a WishlistProvider");
//   }
//   return context;
// };

// export const WishlistProvider = ({ children }) => {
//   const { loggedInUser } = useContext(AuthContext);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load wishlist from backend
//   useEffect(() => {
//     if (!loggedInUser) {
//       setWishlist([]);
//       return;
//     }

//     const fetchWishlist = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get("/wishlist"); // using api.js
//         const productIds = res.data.data.map(item => item.productId._id);
//         setWishlist(productIds);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, [loggedInUser]);

//   const addToWishlist = async (productId) => {
//     if (!loggedInUser) {
//       alert("Please login to add items to wishlist");
//       return;
//     }

//     try {
//       const res = await api.post(`/wishlist/addToWishlist/${productId}`);
//       if (res.data.status === "success") {
//         setWishlist(prev => (prev.includes(productId) ? prev : [...prev, productId]));
//       }
//     } catch (err) {
//       console.error("Error adding to wishlist:", err);
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     if (!loggedInUser) {
//       alert("Please login first");
//       return;
//     }

//     try {
//       const res = await api.delete(`/wishlist/deleteWishList/${productId}`);
//       if (res.data.status === "success") {
//         setWishlist(prev => prev.filter(id => id !== productId));
//       }
//     } catch (err) {
//       console.error("Error removing from wishlist:", err);
//     }
//   };

//   const toggleWishlist = (productId) => {
//     if (wishlist.includes(productId)) {
//       removeFromWishlist(productId);
//     } else {
//       addToWishlist(productId);
//     }
//   };

//   const isInWishlist = (productId) => wishlist.includes(productId);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         toggleWishlist,
//         isInWishlist,
//         wishlistCount: wishlist.length,
//         loading,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export default WishlistProvider;


// import React, { createContext, useState, useContext, useEffect } from "react";
// import { AuthContext } from "./AuthProvider";
// // import api from "../api/api" // centralized api with token
// import api from "../api/Api";
// export const WishlistContext = createContext();

// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
//   return context;
// };

// export const WishlistProvider = ({ children }) => {
//   const { loggedInUser } = useContext(AuthContext);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load wishlist from backend
//  useEffect(() => {
//   if(!loggedInUser)return;

//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/wishlist");
//       setWishlist(res.data.data.map(item => item.productId._id));
//     } catch (err) {
//       console.log("Error fetching wishlist:", err.response?.data || err.message);
//     }
//   };

//   fetchWishlist();
// }, [loggedInUser]);

//   const addToWishlist = async (productId) => {
//     if (!loggedInUser) return alert("Please login first");
//     try {
//       const res = await api.post(`/wishlist/addToWishlist/${productId}`);
//       if (res.data.status === "success") {
//         setWishlist(prev => (prev.includes(productId) ? prev : [...prev, productId]));
//       }
//     } catch (err) {
//       console.error("Error adding to wishlist:", err.response?.data || err.message);
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     if (!loggedInUser) return alert("Please login first");
//     try {
//       const res = await api.delete(`/wishlist/deleteWishList/${productId}`);
//       if (res.data.status === "success") {
//         setWishlist(prev => prev.filter(id => id !== productId));
//       }
//     } catch (err) {
//       console.error("Error removing from wishlist:", err.response?.data || err.message);
//     }
//   };

//   const toggleWishlist = (productId) =>
//     wishlist.includes(productId) ? removeFromWishlist(productId) : addToWishlist(productId);

//   const isInWishlist = (productId) => wishlist.includes(productId);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount: wishlist.length, loading }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export default WishlistProvider;


import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import api from "../api/Api"; // Axios instance configured with withCredentials: true

export const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load wishlist from backend when user is logged in
  useEffect(() => {
    // If user not logged in, clear and stop loading
    if (!loggedInUser) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      setLoading(true);
      try {
        // withCredentials ensures cookie JWT is sent
        const res = await api.get("/wishlist", { withCredentials: true });

        if (res.data?.data) {
          // Filter null productIds safely
          const validWishlist = res.data.data
            .filter(item => item.productId && item.productId._id)
            .map(item => item.productId._id);

          setWishlist(validWishlist);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.log("Error fetching wishlist:", err.response?.data || err.message);
        setWishlist([]); // reset on error
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [loggedInUser]);

  // ✅ Add to wishlist
  const addToWishlist = async (productId) => {
    if (!loggedInUser) return alert("Please login first");
    try {
      const res = await api.post(
        `/wishlist/addToWishlist/${productId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        setWishlist(prev =>
          prev.includes(productId) ? prev : [...prev, productId]
        );
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err.response?.data || err.message);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!loggedInUser) return alert("Please login first");
    try {
      const res = await api.delete(`/wishlist/deleteWishList/${productId}`, {
        withCredentials: true,
      });
      if (res.data.status === "success") {
        setWishlist(prev => prev.filter(id => id !== productId));
      }
    } catch (err) {
      console.error(
        "Error removing from wishlist:",
        err.response?.data || err.message
      );
    }
  };

  // ✅ Toggle wishlist
  const toggleWishlist = (productId) => {
    wishlist.includes(productId)
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };

  // ✅ Check if product is in wishlist
  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
