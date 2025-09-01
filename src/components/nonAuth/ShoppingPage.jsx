import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import { CartContext } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
import { AuthContext } from "../../context/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShoppingPage = () => {
  const { filteredProducts, filterProduct, productSearch, setPsearch } =
    useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [select, setSelect] = useState("all");

  useEffect(() => {
    filterProduct(select);
  }, [select]);

  const handleFilter = (e) => setSelect(e.target.value);

  const handleProductClick = (productId) => navigate(`/productdetails/${productId}`);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to cart!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const handleWishlistClick = (product, e) => {
    e.stopPropagation();
    if (!loggedInUser) {
      Swal.fire({
        icon: "info",
        title: "Please login to add to wishlist",
      });
      navigate("/login");
      return;
    }
    toggleWishlist(product.id);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: isInWishlist(product.id) ? "error" : "success",
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const isInCart = (productId) => cart.some((item) => item.productId === productId);

  const renderRating = (rating = 0) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>★</span>
    ));

  const HeartIcon = ({ filled }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-5 w-5 ${filled ? "text-rose-500" : "text-gray-400 hover:text-rose-400"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex gap-4 mb-6 mt-10">
          <select
            value={select}
            onChange={handleFilter}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="Men">Men</option>
            <option value="Women">Female</option>
          </select>
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-tight">CURATED COLLECTION</h1>
          <div className="w-24 h-0.5 bg-amber-400 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Discover our selection of premium products</p>
          <div className="relative w-full max-w-sm mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setPsearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors duration-200"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.slice().reverse().map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex flex-col border border-gray-200/80 overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Wishlist */}
              <button
                onClick={(e) => handleWishlistClick(product, e)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:scale-110 transition-all duration-200 shadow-xs"
              >
                <HeartIcon filled={isInWishlist(product.id)} />
              </button>

              {/* Image */}
              <div className="relative pt-[100%] bg-gray-50/50 flex items-center justify-center">
                {product.images?.[0] ? (
                  <motion.img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium text-gray-800 line-clamp-1 tracking-tight">{product.name}</h3>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full ml-2 font-medium">{product.category}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="mr-2 text-sm">{renderRating(product.rating)}</div>
                  <span className="text-xs text-gray-500 font-medium">({Number(product.rating ?? 0).toFixed(1)})</span>
                </div>

                <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow font-light tracking-tight">{product.description}</p>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/80">
                  <div>
                    <span className="text-xl font-bold text-gray-900">${Number(product.price ?? 0).toFixed(2)}</span>
                    {product.originalPrice !== undefined && (
                      <span className="ml-2 text-sm text-gray-400 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                    )}
                  </div>

                  {isInCart(product.id) ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate("/cart"); }}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      View in Cart
                    </button>
                  ) : (
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
