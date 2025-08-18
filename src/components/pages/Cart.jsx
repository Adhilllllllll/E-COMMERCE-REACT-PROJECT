const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                <div className="col-span-5 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700">Price</div>
                <div className="col-span-3 font-medium text-gray-700">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700">Total</div>
              </div>
              
              {/* Cart Item 1 */}
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <img 
                      className="h-24 w-24 rounded object-cover" 
                      src="https://via.placeholder.com/150?text=Perfume+1" 
                      alt="Chanel No. 5" 
                    />
                  </div>
                  <div className="md:grid md:grid-cols-12 w-full items-center">
                    <div className="md:col-span-5 mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-900">Chanel No. 5</h3>
                      <p className="text-gray-500">Eau de Parfum - 100ml</p>
                    </div>
                    <div className="md:col-span-2 mb-4 md:mb-0">
                      <p className="text-gray-900 font-medium">$120.00</p>
                    </div>
                    <div className="md:col-span-3 mb-4 md:mb-0">
                      <div className="flex items-center border rounded-md w-24">
                        <button className="px-2 py-1 text-gray-600">-</button>
                        <span className="px-2 py-1 text-center flex-1">1</span>
                        <button className="px-2 py-1 text-gray-600">+</button>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-between items-center">
                      <p className="text-gray-900 font-medium">$120.00</p>
                      <button className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cart Item 2 */}
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                    <img 
                      className="h-24 w-24 rounded object-cover" 
                      src="https://via.placeholder.com/150?text=Perfume+2" 
                      alt="Dior Sauvage" 
                    />
                  </div>
                  <div className="md:grid md:grid-cols-12 w-full items-center">
                    <div className="md:col-span-5 mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-900">Dior Sauvage</h3>
                      <p className="text-gray-500">Eau de Toilette - 60ml</p>
                    </div>
                    <div className="md:col-span-2 mb-4 md:mb-0">
                      <p className="text-gray-900 font-medium">$95.00</p>
                    </div>
                    <div className="md:col-span-3 mb-4 md:mb-0">
                      <div className="flex items-center border rounded-md w-24">
                        <button className="px-2 py-1 text-gray-600">-</button>
                        <span className="px-2 py-1 text-center flex-1">2</span>
                        <button className="px-2 py-1 text-gray-600">+</button>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex justify-between items-center">
                      <p className="text-gray-900 font-medium">$190.00</p>
                      <button className="text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cart Footer */}
              <div className="p-4 flex justify-between items-center">
                <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  Update Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">$310.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$24.80</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">$339.80</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">We Accept</h3>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img className="h-8" src="https://via.placeholder.com/40?text=CC1" alt="Credit Card" />
                  </div>
                  <div className="flex-shrink-0">
                    <img className="h-8" src="https://via.placeholder.com/40?text=CC2" alt="Credit Card" />
                  </div>
                  <div className="flex-shrink-0">
                    <img className="h-8" src="https://via.placeholder.com/40?text=CC3" alt="Credit Card" />
                  </div>
                  <div className="flex-shrink-0">
                    <img className="h-8" src="https://via.placeholder.com/40?text=CC4" alt="Credit Card" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Promo Code</h2>
              <p className="text-gray-600 mb-4">Enter your promo code if you have one</p>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                />
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;