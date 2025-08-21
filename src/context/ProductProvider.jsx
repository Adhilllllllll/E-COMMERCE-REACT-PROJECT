import React, { createContext, useContext, useEffect, useState } from "react";
import { productAPI } from "../Api";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  // const { loggedInUser } = useContext(AuthContext);
  const[filteredProducts,setFproduct]=useState([]);
  const [productSearch,setPsearch]=useState('');
  

  //search

  useEffect(()=>{
    setFproduct(products.filter(product=>product.name.toLowerCase().includes(productSearch.toLowerCase())))
  },[productSearch])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(productAPI);
      setFproduct(data)
      setProducts(data);
      console.log(products);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const  filterProduct=(select)=>{
    if(select=== 'all'){
      setFproduct(products)
      return;

    }
      setFproduct(products.filter(product=>product.gender.toLowerCase().includes(select.toLowerCase())))
  }

  return (
    <ProductContext.Provider value={{products,filteredProducts, filterProduct,productSearch,setPsearch}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
