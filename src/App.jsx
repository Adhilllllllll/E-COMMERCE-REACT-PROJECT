import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import WishlistProvider from "./context/WishListProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/UserProvider";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ProductProvider>
                <AppRoutes />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar
                />
              </ProductProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
