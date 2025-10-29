import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const ProductContext = createContext();
const productAPI = "http://localhost:7000/api/v1/products";

const ProductProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearch, setPsearch] = useState("");
  const [selectGender, setSelectGender] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!loggedInUser?.token) return;
    try {
      setLoading(true);
      const { data } = await axios.get(productAPI, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
      const normalized = data.products.map((p) => ({ ...p, id: p._id }));
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
  }, [loggedInUser?.token]);

  // Filtering
  useEffect(() => {
    let temp = [...products];
    if (selectGender !== "all") temp = temp.filter((p) => p.gender?.toLowerCase() === selectGender.toLowerCase());
    if (productSearch) temp = temp.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()));
    setFilteredProducts(temp);
  }, [products, productSearch, selectGender]);

  const filterProduct = (gender) => setSelectGender(gender);

  const addProduct = async (newProduct) => {
    if (!loggedInUser?.token) return;
    try {
      const { data } = await axios.post(productAPI, newProduct, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
      setProducts((prev) => [...prev, { ...data, id: data.id || data._id }]);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const editProduct = async (id, updatedProduct) => {
    if (!loggedInUser?.token) return;
    try {
      const { data } = await axios.put(`${productAPI}/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
    } catch (error) {
      console.error("Error editing product:", error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!loggedInUser?.token) return;
    try {
      await axios.delete(`${productAPI}/${id}`, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
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
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
