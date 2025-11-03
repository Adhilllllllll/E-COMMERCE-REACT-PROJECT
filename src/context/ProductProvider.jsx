import React, { createContext, useEffect, useState, useContext } from "react";
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      const productList = (data.products || []).map((p) => ({
        ...p,
        id: p._id,
        image: p.image, // single image
        status: p.count === 0 ? "Out of Stock" : p.isActive ? "Active" : "Inactive",
        stock: p.count,
      }));
      setProducts(productList);
    } catch (err) {
      console.error("Error fetching products:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterProduct = (category = selectedCategory) => {
    setSelectedCategory(category);
    let filtered = [...products];
    if (category !== "all") filtered = filtered.filter((p) => p.category === category);
    if (productSearch.trim() !== "")
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
      );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProduct(selectedCategory);
  }, [products, productSearch, selectedCategory]);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.url; // Cloudinary URL for single image
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      return null;
    }
  };

  const addProduct = async (product, file = null) => {
    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => formData.append(key, product[key]));
      if (file) formData.append("image", file);

      const { data } = await api.post("/admin/addProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const added = {
        ...data.data,
        id: data.data._id,
        image: data.data.image,
        status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
        stock: data.data.count,
      };

      setProducts((prev) => [...prev, added]);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  const editProduct = async (id, updatedProduct, file = null) => {
    try {
      let imageUrl = updatedProduct.image || null;

      // If a new file is selected, upload it
      if (file) {
        const uploadedUrl = await uploadImage(file);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const payload = {
        ...updatedProduct,
        image: imageUrl,
      };

      const { data } = await api.put(`/admin/editProduct/${id}`, payload);

      const updated = {
        ...data.data,
        id: data.data._id,
        image: data.data.image,
        status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
        stock: data.data.count,
      };

      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      console.error("Error editing product:", err.response?.data || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
    }
  };

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
