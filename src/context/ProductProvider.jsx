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

//export default ProductProvider;

// src/context/ProductProvider.jsx
import React, { createContext, useEffect, useState, useContext } from "react";
// import api from "../api/api"; // centralized axios instance
import { UserContext } from "./UserProvider";
import api from "../api/Api"
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { loggedInUser } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectGender, setSelectGender] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products"); // token auto-attached
      const productList = (data.products || data.data || []).map((p) => ({
        ...p,
        id: p._id,
        images: Array.isArray(p.image) ? p.image : [p.image],
      }));
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by gender and search
  useEffect(() => {
    let temp = [...products];
    if (selectGender !== "all") {
      temp = temp.filter((p) => p.gender?.toLowerCase() === selectGender.toLowerCase());
    }
    if (productSearch) {
      temp = temp.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
    }
    setFilteredProducts(temp);
  }, [products, productSearch, selectGender]);

  // Filter setter
  const filterProduct = (gender) => setSelectGender(gender);

  // Add a new product
  const addProduct = async (newProduct) => {
    try {
      const { data } = await api.post("/products", newProduct);
      const added = {
        ...data,
        id: data._id,
        images: Array.isArray(data.image) ? data.image : [data.image],
      };
      setProducts((prev) => [...prev, added]);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };

  // Edit existing product
  const editProduct = async (id, updatedProduct) => {
    try {
      const { data } = await api.put(`/products/${id}`, updatedProduct);
      const updated = {
        ...data,
        id: data._id,
        images: Array.isArray(data.image) ? data.image : [data.image],
      };
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error) {
      console.error("Error editing product:", error.response?.data || error.message);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        productSearch,
        setProductSearch,
        selectGender,
        filterProduct,
        addProduct,
        editProduct,
        deleteProduct,
        fetchProducts,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

