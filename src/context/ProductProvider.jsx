import React, { createContext, useEffect, useState } from "react";
import { productAPI } from "../Api";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(productAPI);
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.error(error.messag);
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
