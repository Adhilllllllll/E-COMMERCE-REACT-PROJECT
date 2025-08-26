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
      setFilteredProducts(data);  
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

  //add new product(admin)

  const addProduct=(newProdcut)=>{
    setProducts(prev=>[...prev,{...newProdcut,id:Date.now().toString() }]);
  };

  //edit product(admin)

  const editProduct=(id,updatedProduct)=>{
    setProducts(prev=>prev.map(p=>(p.id===id?{...p,...updatedProduct}:p)));
  };

  //delete product (admin)

  const deleteProduct=(id)=>{
setProducts(prev=>prev.filter(p=>p.id !==id));
  }



  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      filterProduct,
      productSearch,
      setPsearch,
      addProduct,
      editProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
