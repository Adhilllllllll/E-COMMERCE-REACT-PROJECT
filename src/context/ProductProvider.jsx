import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { productAPI } from "../Api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(productAPI);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search filtering
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
      )
    );
  }, [productSearch, products]);

  // Gender filter
  const filterProduct = (select) => {
    if (select === "all") {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter((product) =>
        product.gender.toLowerCase().includes(select.toLowerCase())
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        filterProduct,
        productSearch,
        setProductSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
