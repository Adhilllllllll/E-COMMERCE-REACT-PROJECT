import React, { useContext } from "react";
 
import { CartContext } from "../../context/CartProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, loading } =
    useContext(CartContext);
    const navigate = useNavigate();
  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <img
          src="/empty-cart.png"
          alt="Empty cart"
          className="w-40 h-40 mb-4 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => (window.location.href = "/shop")}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">🛒 Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 bg-white hover:shadow-md transition"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.productId?.image?.[0] || "/placeholder.png"}
                alt={item.productId?.name}
                className="w-24 h-24 object-cover rounded-lg border border-gray-100"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {item.productId?.name}
                </h3>
                <p className="text-gray-600">
                  ₹{item.productId?.price} × {item.quantity}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity - 1)
                }
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                −
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity + 1)
                }
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="mt-10 border-t border-gray-200 pt-6 text-right">
        <p className="text-xl font-semibold">
          Total: ₹
          {cart
            .reduce(
              (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
              0
            )
            .toFixed(2)}
        </p>

        {/* <button
          onClick={() => (window.location.href = "/payment")}
          className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Proceed to Checkout
        </button> */}

        <button
          onClick={() => navigate("/payment")}
          className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
