import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./context/AuthProvider";
import ProductProvider from "./context/ProductProvider";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
        <AppRoutes />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
