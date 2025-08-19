import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

import { AuthContext } from "../../context/AuthProvider";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);


  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // Example 8% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cart.map((item) => (
              <div key={item.id} className="border-b py-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      {item.brand || "Brand"}
                    </p>
                    <p className="text-sm">Size: {item.size || "50ml"}</p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 border rounded"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 border rounded"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:w-80 bg-gray-50 p-4 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 border p-2 rounded text-sm"
                />
                <button className="bg-black text-white px-4 py-2 rounded text-sm">
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Try WELCOME10 or SAVE20
              </p>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="freeShipping" checked readOnly />
              <label htmlFor="freeShipping" className="text-sm">
                Free Shipping
                <br />
                <span className="text-xs text-gray-500">
                  On orders over $75, Delivery in 3-5 business days.
                </span>
              </label>
            </div>

            <button className="w-full bg-black text-white py-3 rounded font-medium">
              Proceed to Checkout
            </button>

            <p className="text-xs text-center mt-4 text-gray-500">
              Secure checkout powered by SSL encryption
            </p>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-lg font-medium mb-2">Need Help?</h2>
        <p className="mb-4">
          Our fragrance experts are here to help you find the perfect scent.
        </p>
        <button className="border border-black px-4 py-2 rounded">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Cart;
