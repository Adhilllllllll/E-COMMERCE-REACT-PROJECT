 

import React, { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import api from "../api/Api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { loggedInUser } = useContext(UserContext);

  // All products from API
  const [products, setProducts] = useState([]);
  // Filtered products for display
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Search text
  const [productSearch, setProductSearch] = useState("");
  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      const productList = (data.products || []).map((p) => ({
        ...p,
        id: p._id,
        images: Array.isArray(p.image) ? p.image : [p.image],
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

  // Filter products based on category & search
  const filterProduct = (category = selectedCategory) => {
    setSelectedCategory(category);

    let filtered = [...products];

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Search filter
    if (productSearch.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Update filteredProducts whenever products, search, or category changes
  useEffect(() => {
    filterProduct(selectedCategory);
  }, [products, productSearch, selectedCategory]);

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data.urls; // Cloudinary URL
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      return null;
    }
  };

  // Add product
 const addProduct = async (product, files = []) => {
  try {
    const formData = new FormData();

    // Append all product fields
    Object.keys(product).forEach(key => formData.append(key, product[key]));

    // Append files
    files.forEach(file => formData.append("image", file)); // "image" must match multer field name

    const { data } = await api.post("/admin/addProduct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const added = {
      ...data.data,
      id: data.data._id,
      images: Array.isArray(data.data.image) ? data.data.image : [data.data.image],
      status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
      stock: data.data.count,
    };

    setProducts(prev => [...prev, added]);
  } catch (err) {
    console.error("Error adding product:", err.response?.data || err.message);
  }
};


//   // Edit product
//   const editProduct = async (id, updatedProduct, files = []) => {
//     try {
//       const uploadedImages = [];
//       for (const file of files) {
//         const url = await uploadImage(file);
//         if (url) uploadedImages.push(url);
//       }

 
// const payload = {
//   ...updatedProduct,
//   image: [
//     // ensure existing images are strings
//     ...(Array.isArray(updatedProduct.images)
//       ? updatedProduct.images.flat().map(img => String(img).trim())
//       : updatedProduct.images
//       ? [String(updatedProduct.images).trim()]
//       : []),
//     // ensure newly uploaded images are strings
//     ...uploadedImages.map(img => String(img).trim()),
//   ].filter(Boolean), // remove any empty values
// };




//       const { data } = await api.put(`/admin/editProduct/${id}`, payload);

//       const updated = {
//         ...data.data,
//         id: data.data._id,
//         images: Array.isArray(data.data.image) ? data.data.image : [data.data.image],
//         status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
//         stock: data.data.count,
//       };

//       setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
//     } catch (err) {
//       console.error("Error editing product:", err.response?.data || err.message);
//     }
//   };



// Edit product
const editProduct = async (id, updatedProduct, files = [], payloadImages = []) => {
  try {
    const uploadedImages = [];
    for (const file of files) {
      const url = await uploadImage(file);
      if (url) uploadedImages.push(url);
    }

    // Merge existing + uploaded images correctly
    const payload = {
      ...updatedProduct,
      image: [
        ...payloadImages.filter((img) => typeof img === "string" && img.startsWith("http")),
        ...uploadedImages,
      ],
    };

    const { data } = await api.put(`/admin/editProduct/${id}`, payload);

    const updated = {
      ...data.data,
      id: data.data._id,
      images: Array.isArray(data.data.image) ? data.data.image : [data.data.image],
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


  // Delete product
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
