import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { productAPI } from "../Api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setPsearch] = useState('');
  const [selectGender, setSelectGender] = useState('all');

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(productAPI);
      setProducts(data);
      setFilteredProducts(data); // initially show all products
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on gender and search
  useEffect(() => {
    let temp = [...products];

    if (selectGender !== 'all') {
      temp = temp.filter(p => p.gender.toLowerCase() === selectGender.toLowerCase());
    }

    if (productSearch) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(temp);
  }, [products, productSearch, selectGender]);

  const filterProduct = (gender) => {
    setSelectGender(gender);
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      filterProduct,
      productSearch,
      setPsearch
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
