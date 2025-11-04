// import React, { useContext } from "react";
// import { useWishlist } from "../../context/WishListProvider";
// import { ProductContext } from "../../context/ProductProvider";
// import { CartContext } from "../../context/CartProvider";
// import { AuthContext } from "../../context/AuthProvider";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();
//   const { products } = useContext(ProductContext);
//   const { addToCart } = useContext(CartContext);
//   const { loggedInUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const wishlistProducts = products.filter(product =>
//     wishlist.includes(Number(product.id))
//   );

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   const handleRemoveFromWishlist = (productId) => {
//     removeFromWishlist(productId);
//     toast.success("Removed from wishlist");
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/productdetails/${productId}`);
//   };

//   const renderRating = (rating) => (
//     [...Array(5)].map((_, i) => (
//       <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
//         ★
//       </span>
//     ))
//   );

//   if (wishlist.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">❤️</div>
//           <h2 className="text-2xl font-medium text-gray-800 mb-2">
//             Your wishlist is empty
//           </h2>
//           <p className="text-gray-600 mb-6">Start adding items you love!</p>
//           <button
//             onClick={() => navigate("/shopping")}
//             className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
//           <span className="text-gray-600">{wishlist.length} items</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {wishlistProducts.map((product) => (
//             <motion.div
//               key={product.id}
//               whileHover={{ y: -8 }}
//               className="relative bg-white rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200/80 overflow-hidden group"
//             >
//               <button
//                 onClick={() => handleRemoveFromWishlist(product.id)}
//                 className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:scale-110 transition-all duration-200 shadow-xs"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-rose-500">
//                   <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                 </svg>
//               </button>

//               <div className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
//                 <div className="relative pt-[100%] bg-gray-50/50 flex items-center justify-center">
//                   {product.images?.[0] ? (
//                     <motion.img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="absolute top-0 left-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
//                       whileHover={{ scale: 1.1 }}
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-5 flex-grow flex flex-col">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-lg font-medium text-gray-800 line-clamp-1 tracking-tight">
//                       {product.name}
//                     </h3>
//                     <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full ml-2 font-medium">
//                       {product.category}
//                     </span>
//                   </div>

//                   <div className="flex items-center mb-3">
//                     <div className="mr-2 text-sm">{renderRating(product.rating)}</div>
//                     <span className="text-xs text-gray-500 font-medium">({product.rating.toFixed(1)})</span>
//                   </div>

//                   <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow font-light tracking-tight">
//                     {product.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
//                     <div>
//                       <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
//                       {product.originalPrice && (
//                         <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
//                       )}
//                     </div>

//                     <button
//                       onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
//                       className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;


// import React, { useContext } from "react";
// import { useWishlist } from "../../context/WishListProvider"
// import { ProductContext } from "../../context/ProductProvider";
// import { CartContext } from "../../context/CartProvider";
// import { AuthContext } from "../../context/AuthProvider";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist, loading } = useWishlist();
//   const { products } = useContext(ProductContext);
//   const { addToCart } = useContext(CartContext);
//   const { loggedInUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Show loading while wishlist is being fetched
//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading wishlist...</div>;

//   // Filter products that are in the wishlist
//   const wishlistProducts = products.filter(product =>
//     wishlist.includes(product._id)
//   );

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     toast.success("Added to cart");
//   };

//   const handleRemoveFromWishlist = (productId) => {
//     removeFromWishlist(productId);
//     toast.success("Removed from wishlist");
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/productdetails/${productId}`);
//   };

//   const renderRating = (rating) => (
//     [...Array(5)].map((_, i) => (
//       <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
//         ★
//       </span>
//     ))
//   );

//   if (!wishlistProducts.length) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">❤️</div>
//           <h2 className="text-2xl font-medium text-gray-800 mb-2">
//             Your wishlist is empty
//           </h2>
//           <p className="text-gray-600 mb-6">Start adding items you love!</p>
//           <button
//             onClick={() => navigate("/shop")}
//             className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
//           <span className="text-gray-600">{wishlistProducts.length} items</span>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {wishlistProducts.map((product) => (
//             <motion.div
//               key={product.id || product._id}
//               whileHover={{ y: -8 }}
//               className="relative bg-white rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200/80 overflow-hidden group"
//             >
//               <button
//                 onClick={() => handleRemoveFromWishlist(product.id || product._id)}
//                 className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:scale-110 transition-all duration-200 shadow-xs"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-rose-500">
//                   <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                 </svg>
//               </button>

//               <div className="cursor-pointer" onClick={() => handleProductClick(product.id || product._id)}>
//                 <div className="relative pt-[100%] bg-gray-50/50 flex items-center justify-center">
//                   {product.images?.[0] ? (
//                     <motion.img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="absolute top-0 left-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
//                       whileHover={{ scale: 1.1 }}
//                     />
//                   ) : (
//                     <div className="absolute inset-0 flex items-center justify-center text-gray-300">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-5 flex-grow flex flex-col">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-lg font-medium text-gray-800 line-clamp-1 tracking-tight">
//                       {product.name}
//                     </h3>
//                     <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full ml-2 font-medium">
//                       {product.category}
//                     </span>
//                   </div>

//                   <div className="flex items-center mb-3">
//                     <div className="mr-2 text-sm">{renderRating(product.rating)}</div>
//                     <span className="text-xs text-gray-500 font-medium">({product.rating.toFixed(1)})</span>
//                   </div>

//                   <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow font-light tracking-tight">
//                     {product.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
//                     <div>
//                       <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
//                       {product.originalPrice && (
//                         <span className="ml-2 text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
//                       )}
//                     </div>

//                     <button
//                       onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
//                       className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;



import React, { useContext } from "react";
import { useWishlist } from "../../context/WishListProvider";
import { ProductContext } from "../../context/ProductProvider";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Show loading spinner
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading wishlist...
      </div>
    );

  // ✅ Filter only products that exist in wishlist
  const wishlistProducts = products.filter(product =>
    wishlist.includes(product._id)
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart");
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  const renderRating = (rating = 0) => (
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
        ★
      </span>
    ))
  );

  // ✅ If wishlist is empty
  if (!wishlistProducts.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-medium text-gray-800 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">Start adding items you love!</p>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ✅ Wishlist grid
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          <span className="text-gray-600">{wishlistProducts.length} items</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200/80 overflow-hidden group"
            >
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:scale-110 transition-all duration-200 shadow-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-rose-500"
                >
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              <div
                className="cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="relative pt-[100%] bg-gray-50/50 flex items-center justify-center">
                  {product.image?.[0] ? (
                    <motion.img
                      src={product.image[0]}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-medium text-gray-800 line-clamp-1 tracking-tight">
                      {product.name}
                    </h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full ml-2 font-medium">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="mr-2 text-sm">{renderRating(product.rating)}</div>
                    <span className="text-xs text-gray-500 font-medium">
                      ({product.rating?.toFixed(1) || "0.0"})
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow font-light tracking-tight">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
