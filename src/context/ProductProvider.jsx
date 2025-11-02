// import React, { createContext, useEffect, useState, useContext } from "react";
// import api from "../api/Api";
// import { AuthContext } from "./AuthProvider";

// export const ProductContext = createContext();

// const ProductProvider = ({ children }) => {
//   const { loggedInUser } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productSearch, setPsearch] = useState("");
//   const [selectGender, setSelectGender] = useState("all"); // optional if you add gender in backend
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/products"); // uses centralized API
//       const normalized = data.products.map((p) => ({
//         ...p,
//         id: p._id,
//         images: p.image || [], // map backend "image" field to "images"
//       }));
//       setProducts(normalized);
//       setFilteredProducts(normalized);
//     } catch (error) {
//       console.error("Error fetching products:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [loggedInUser?.token]);

//   // Filtering (optional)
//   useEffect(() => {
//     let temp = [...products];
//     if (selectGender !== "all")
//       temp = temp.filter((p) => p.gender?.toLowerCase() === selectGender.toLowerCase());
//     if (productSearch)
//       temp = temp.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
//     setFilteredProducts(temp);
//   }, [products, productSearch, selectGender]);

//   const filterProduct = (gender) => setSelectGender(gender);

//   const addProduct = async (newProduct) => {
//     try {
//       const { data } = await api.post("/products", newProduct);
//       setProducts((prev) => [...prev, { ...data, id: data._id, images: data.image || [] }]);
//     } catch (error) {
//       console.error("Error adding product:", error.message);
//     }
//   };

//   const editProduct = async (id, updatedProduct) => {
//     try {
//       const { data } = await api.put(`/products/${id}`, updatedProduct);
//       setProducts((prev) =>
//         prev.map((p) => (p.id === id ? { ...data, id: data._id, images: data.image || [] } : p))
//       );
//     } catch (error) {
//       console.error("Error editing product:", error.message);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error.message);
//     }
//   };

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         filteredProducts,
//         productSearch,
//         setPsearch,
//         filterProduct,
//         addProduct,
//         editProduct,
//         deleteProduct,
//         fetchProducts,
//         loading,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductProvider;


// import React, { createContext, useEffect, useState, useContext } from "react";
// import api from "../api/Api";
// import { AuthContext } from "./AuthProvider";

// export const ProductContext = createContext();

// const ProductProvider = ({ children }) => {
//   const { loggedInUser } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productSearch, setPsearch] = useState("");
//   const [selectGender, setSelectGender] = useState("all");
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/products"); // token sent automatically
//       const normalized = data.products.map((p) => ({
//         ...p,
//         id: p._id,
//         images: p.image || [],
//       }));
//       setProducts(normalized);
//       setFilteredProducts(normalized);
//     } catch (error) {
//       console.error("Error fetching products:", error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//    fetchProducts();
//   },[]);

//   useEffect(() => {
//     let temp = [...products];
//     if (selectGender !== "all")
//       temp = temp.filter((p) => p.gender?.toLowerCase() === selectGender.toLowerCase());
//     if (productSearch)
//       temp = temp.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
//     setFilteredProducts(temp);
//   }, [products, productSearch, selectGender]);

//   const filterProduct = (gender) => setSelectGender(gender);

//   const addProduct = async (newProduct) => {
//     try {
//       const { data } = await api.post("/products", newProduct);
//       setProducts(prev => [...prev, { ...data, id: data._id, images: data.image || [] }]);
//     } catch (error) {
//       console.error("Error adding product:", error.response?.data || error.message);
//     }
//   };

//   const editProduct = async (id, updatedProduct) => {
//     try {
//       const { data } = await api.put(`/products/${id}`, updatedProduct);
//       setProducts(prev => prev.map(p => (p.id === id ? { ...data, id: data._id, images: data.image || [] } : p)));
//     } catch (error) {
//       console.error("Error editing product:", error.response?.data || error.message);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       setProducts(prev => prev.filter(p => p.id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <ProductContext.Provider
//       value={{ products, filteredProducts, productSearch, setPsearch, filterProduct, addProduct, editProduct, deleteProduct, fetchProducts, loading }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };


// import React, { createContext, useEffect, useState, useContext } from "react";
// import { UserContext } from "./UserProvider";
// import api from "../api/Api";

// export const ProductContext = createContext();

// const ProductProvider = ({ children }) => {
//   const { loggedInUser } = useContext(UserContext);

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [productSearch, setProductSearch] = useState("");
//   const [selectGender, setSelectGender] = useState("all");
//   const [loading, setLoading] = useState(false);

//   // Fetch all products (admin & general)
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/products"); // public route
//       const data = res.data.data || res.data.products || []; // ensure array

//       const productList = data.map((p) => ({
//         ...p,
//         id: p._id,
//         images: Array.isArray(p.image) ? p.image : [p.image],
//       }));

//       setProducts(productList);
//       setFilteredProducts(productList);
//     } catch (err) {
//       console.error("Error fetching products:", err.response?.data || err.message);
//       setProducts([]);
//       setFilteredProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add product (Admin route)
//   const addProduct = async (newProduct) => {
//     try {
//       const res = await api.post("/admin/addProduct", newProduct);
//       const data = res.data.data;

//       const added = {
//         ...data,
//         id: data._id,
//         images: Array.isArray(data.image) ? data.image : [data.image],
//       };

//       setProducts((prev) => [...prev, added]);
//       setFilteredProducts((prev) => [...prev, added]);
//     } catch (err) {
//       console.error("Error adding product:", err.response?.data || err.message);
//     }
//   };

//   // Edit product (Admin route)
//   const editProduct = async (id, updatedProduct) => {
//     try {
//       const res = await api.put(`/admin/editProduct/${id}`, updatedProduct);
//       const data = res.data.data;

//       const updated = {
//         ...data,
//         id: data._id,
//         images: Array.isArray(data.image) ? data.image : [data.image],
//       };

//       setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
//       setFilteredProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
//     } catch (err) {
//       console.error("Error editing product:", err.response?.data || err.message);
//     }
//   };

//   // Delete product (Admin route)
//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/admin/deleteProduct/${id}`);
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//       setFilteredProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error("Error deleting product:", err.response?.data || err.message);
//     }
//   };

//   // Fetch products on mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         filteredProducts,
//         productSearch,
//         setProductSearch,
//         selectGender,
//         setSelectGender,
//         addProduct,
//         editProduct,
//         deleteProduct,
//         fetchProducts,
//         loading,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductProvider;

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
      return data.data.url; // Cloudinary URL
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err.message);
      return null;
    }
  };

  // Add product
  const addProduct = async (product, files = []) => {
    try {
      const uploadedImages = [];
      for (const file of files) {
        const url = await uploadImage(file);
        if (url) uploadedImages.push(url);
      }

      const payload = { ...product, image: uploadedImages };
      const { data } = await api.post("/admin/addProduct", payload);

      const added = {
        ...data.data,
        id: data.data._id,
        images: Array.isArray(data.data.image) ? data.data.image : [data.data.image],
        status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
        stock: data.data.count,
      };
      setProducts((prev) => [...prev, added]);
    } catch (err) {
      console.error("Error adding product:", err.response?.data || err.message);
    }
  };

  // Edit product
  const editProduct = async (id, updatedProduct, files = []) => {
    try {
      const uploadedImages = [];
      for (const file of files) {
        const url = await uploadImage(file);
        if (url) uploadedImages.push(url);
      }

      const payload = {
        ...updatedProduct,
        image: uploadedImages.length > 0 ? uploadedImages : updatedProduct.images,
      };

      const { data } = await api.put(`/admin/editProduct/${id}`, payload);

      const updated = {
        ...data.data,
        id: data.data._id,
        images: Array.isArray(data.data.image) ? data.data.image : [data.data.image],
        status: data.data.count === 0 ? "Out of Stock" : data.data.isActive ? "Active" : "Inactive",
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
