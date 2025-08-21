import React, { useContext, useState } from 'react';
 import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userApi } from '../../Api';

const Payment = () => {
   const { cart, removeFromCart, fetchCart }=useContext(CartContext)
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate order totals
  const itemCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = itemCost * 0.1; // 10% tax
  const totalCost = itemCost + tax;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Create order object
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        total: totalCost,
        status: 'processing',
        shippingAddress: loggedInUser.address
      };
      
      // Update user in the database
      const updatedUser = {
        ...loggedInUser,
        orders: [...loggedInUser.orders, order],
        cart: [], // Clear cart after successful payment
        orderHistory: [...loggedInUser.orderHistory, order]
      };
      
      // Send update to server
      await axios.patch(`${userApi}/${loggedInUser.id}`, updatedUser);
      
      // Update local state
      setLoggedInUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Clear cart in context
      fetchCart(loggedInUser.id);
      
      // Navigate to success page
      navigate('/order-success', { state: { order } });
      
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/products')}
            className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Payment Form */}
          <div className="md:w-2/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="flex space-x-4 mb-6">
                <button 
                  onClick={() => setPaymentMethod('creditCard')}
                  className={`px-4 py-2 rounded-md ${
                    paymentMethod === 'creditCard' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Credit Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('paypal')}
                  className={`px-4 py-2 rounded-md ${
                    paymentMethod === 'paypal' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === 'creditCard' ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full ${
                      isProcessing ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-700'
                    } text-white font-medium py-3 px-4 rounded-md cursor-pointer`}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${totalCost.toFixed(2)}`}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full ${
                      isProcessing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-medium py-3 px-4 rounded-md cursor-pointer`}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to PayPal'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">
                        Qty: {item.quantity} | Size: {item.size}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p>${itemCost.toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">Tax (10%)</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between font-bold text-lg mt-4">
                  <p>Total</p>
                  <p>${totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {loggedInUser?.address && (
              <div className="mt-4 bg-white shadow rounded-lg p-6">
                <h3 className="font-medium mb-2">Delivery Information</h3>
                <p className="text-gray-600">{loggedInUser.address.street}</p>
                <p className="text-gray-600">{loggedInUser.address.city}</p>
                <p className="text-gray-600">
                  {loggedInUser.address.state} - {loggedInUser.address.pin}
                </p>
                <p className="text-gray-600 mt-2">Mobile: {loggedInUser.address.mobile}</p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="mt-3 text-emerald-500 text-sm font-medium"
                >
                  Change address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;