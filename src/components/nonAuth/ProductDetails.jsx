import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductProvider";
import { CartContext } from "../../context/CartProvider";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id,"ig");
  
  const navigate = useNavigate();
  const products = useContext(ProductContext);

  const productsString = JSON.stringify(products, null, 2);
  console.log(productsString,"mypeo");
  
  const { addToCart } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const product = products.find(p => p.id === id);

  console.log(product,"proiou");
  

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-800">Product not found</h2>
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

  const toggleWishlist = () => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderRating = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-amber-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

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
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4 h-96 flex items-center justify-center">
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-300">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded border p-1 h-20 flex items-center justify-center ${
                      selectedImage === index ? "border-amber-400" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <button
                onClick={toggleWishlist}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Add to wishlist"
              >
                <HeartIcon filled={wishlist.includes(product.id)} />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="mr-2 text-lg">
                {renderRating(product.rating)}
              </div>
              <span className="text-gray-500">
                ({product.rating.toFixed(1)})
              </span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;