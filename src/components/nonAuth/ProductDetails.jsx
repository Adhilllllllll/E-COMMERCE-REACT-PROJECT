import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductProvider";
import { CartContext } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { loggedInUser } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);

  // Set product based on URL param
  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === id); // use id from ProductProvider
      setProduct(found || null);
    }
  }, [products, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-800">
            Product not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleCartClick = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to cart successfully!");
  };

  const handleWishlistClick = () => {
    if (!loggedInUser) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    toggleWishlist(product.id);
    toast.success(
      isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const renderRating = (rating) =>
    [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
        ★
      </span>
    ));

  const HeartIcon = ({ filled }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-6 w-6 ${
        filled ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={product.image?.[0] || ""} // fallback
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded border p-1 h-20 flex items-center justify-center ${
                      selectedImage === index
                        ? "border-amber-400"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <button
                onClick={handleWishlistClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <HeartIcon filled={isInWishlist(product.id)} />
              </button>
            </div>

            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-xl font-semibold mb-2">${product.price}</p>
            <div className="mb-4">
              {renderRating(Math.round(product.rating))}
            </div>

            <button
              onClick={handleCartClick}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
