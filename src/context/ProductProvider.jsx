 


import React, { createContext, useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "./UserProvider";
import api from "../api/Api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { loggedInUser } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  //  Fetch products (runs once)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      const productList = (data.products || []).map((p) => ({
        ...p,
        id: p._id,
        image: p.image,
        status: p.count === 0 ? "Out of Stock" : p.isActive ? "Active" : "Inactive",
        stock: p.count,
      }));
      setProducts(productList);
      setFilteredProducts(productList); // default show all
    } catch (err) {
      console.error("Error fetching products:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  //  Stable filter function (prevents re-renders)
  const filterProduct = useCallback(
    (category = selectedCategory) => {
      setSelectedCategory(category);

      let filtered = [...products];

      if (category !== "all" && category.trim() !=="") {
        filtered = filtered.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
      }

      if (productSearch.trim() !== "") {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(productSearch.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    },
    [products, productSearch, selectedCategory]
  );

  //  Apply filter whenever products/search/category changes
  useEffect(() => {
    if (products.length > 0) {
      filterProduct(selectedCategory);
    }
  }, [products, productSearch, selectedCategory, filterProduct]);

  //  Upload product image
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.url;
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      return null;
    }
  };
//  Add new product
const addProduct = async (product, file = null) => {
  try {
    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));
    if (file) formData.append("image", file);

    //  Log what we’re sending — for debugging 400 errors
    console.log(" Sending product data:");
    for (let pair of formData.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    //  Make the API request
    const { data } = await api.post("/admin/addProduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const added = {
      ...data.data,
      id: data.data._id,
      image: data.data.image,
      status:
        data.data.count === 0
          ? "Out of Stock"
          : data.data.isActive
          ? "Active"
          : "Inactive",
      stock: data.data.count,
    };

    setProducts((prev) => [...prev, added]);
  } catch (err) {
    console.error("Error adding product:", err.response?.data || err.message);
  }
};

 

   const editProduct = async (id, updatedProduct, file = null) => {
    try {
      const formData = new FormData();

      // append all product fields
      Object.keys(updatedProduct).forEach((key) => {
        if (updatedProduct[key] !== undefined && updatedProduct[key] !== null) {
          formData.append(key, updatedProduct[key]);
        }
      });

      // append new image if user selected one
      if (file) {
        formData.append("image", file);
      }

      // PUT request as multipart/form-data (activates upload middleware)
      const { data } = await api.put(`/admin/editProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = {
        ...data.data,
        id: data.data._id,
        image: data.data.image,
        status:
          data.data.count === 0
            ? "Out of Stock"
            : data.data.isActive
            ? "Active"
            : "Inactive",
        stock: data.data.count,
      };

      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error("Error editing product:", err.response?.data || err.message);
    }
  };


  //  Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
    }
  };

  //  Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        filterProduct,
        productSearch,
        setProductSearch,
        selectedCategory,
        setSelectedCategory,
        loading,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
        uploadImage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
