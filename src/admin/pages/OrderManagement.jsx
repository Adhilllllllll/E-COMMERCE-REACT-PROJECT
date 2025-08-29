import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../context/ProductProvider";

const ProductManagement = () => {
  const {
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
  } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "Men",
    price: "",
    rating: "",
    stock: "",
    images: [],
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts(); // always load fresh products
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // edit mode
      editProduct(editId, formData);
      setEditId(null);
    } else {
      // add mode
      addProduct(formData);
    }

    setFormData({
      name: "",
      brand: "",
      category: "",
      gender: "Men",
      price: "",
      rating: "",
      stock: "",
      images: [],
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      {/* 🔍 Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={productSearch}
          onChange={(e) => setPsearch(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <select
          onChange={(e) => filterProduct(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      {/* 📝 Add / Edit Product Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* 📦 Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.name}</td>
                <td className="p-2 border">{p.brand}</td>
                <td className="p-2 border">{p.category}</td>
                <td className="p-2 border">{p.gender}</td>
                <td className="p-2 border">${p.price}</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManagement;
