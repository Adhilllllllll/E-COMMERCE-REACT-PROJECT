import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

const productAPI = "http://localhost:3000/products";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setPsearch] = useState("");
  const [selectGender, setSelectGender] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(productAPI);
      const normalized = data.map((p) => ({ ...p, id: p.id || p._id }));
      setProducts(normalized);
      setFilteredProducts(normalized);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtering
  useEffect(() => {
    let temp = [...products];

    if (selectGender !== "all") {
      temp = temp.filter((p) => p.gender && p.gender.toLowerCase() === selectGender.toLowerCase());
    }

    if (productSearch) {
      temp = temp.filter((p) =>
        (p.name || "").toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(temp);
  }, [products, productSearch, selectGender]);

  const filterProduct = (gender) => setSelectGender(gender);

  // Add Product
  const addProduct = async (newProduct) => {
    try {
      const { data } = await axios.post(productAPI, newProduct);
      setProducts((prev) => [...prev, { ...data, id: data.id || data._id }]);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  // Edit Product
  const editProduct = async (id, updatedProduct) => {
    try {
      const { data } = await axios.put(`${productAPI}/${id}`, updatedProduct);
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
    } catch (error) {
      console.error("Error editing product:", error.message);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${productAPI}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        productSearch,
        setPsearch,
        filterProduct,
        addProduct,
        editProduct,
        deleteProduct,
        fetchProducts,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
