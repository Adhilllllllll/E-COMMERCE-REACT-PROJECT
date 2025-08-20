import React, { createContext, useContext, useEffect, useState } from "react";
import { productAPI } from "../Api";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { loggedInUser } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(productAPI);
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
