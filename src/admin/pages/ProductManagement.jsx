import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Swal from "sweetalert2";

const defaultForm = {
  name: "",
  category: "",
  price: "",
  count: 0,
  isActive: true,
  image: null,
  description: "",
};

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } =
    useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const openForm = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        ...product,
        isActive: !!product.isActive,
      });
      setPreviewImage(product.image || null);
    } else {
      setFormData(defaultForm);
      setPreviewImage(null);
    }
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill all required fields.");
      return;
    }

    const normalizedData = {
      ...formData,
      price: Number(formData.price),
      count: Number(formData.count),
    };

    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, normalizedData, selectedFile);
      } else {
        await addProduct(normalizedData, selectedFile);
      }
    } catch (err) {
      console.error("Error submitting product:", err);
    }

    setShowForm(false);
    setFormData(defaultForm);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product Management
        </h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all"
        >
          + Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-center">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Image",
                "Name",
                "Category",
                "Description",
                "Price",
                "Stock",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-300"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-6 text-gray-500 italic text-center"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50 transition-all border-b border-gray-200"
                >
                  <td className="py-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover mx-auto rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{p.category}</td>
                  <td className="px-4 py-3 text-gray-600 truncate max-w-[200px] mx-auto">
                    {p.description}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">
                    ₹{p.price}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{p.count}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      p.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {p.isActive ? "Active" : "Inactive"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => openForm(p)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) deleteProduct(p.id);
                          });
                        }}
                        className="text-red-600 hover:text-red-800 font-medium transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border p-2 rounded"
                rows={3}
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.count}
                onChange={(e) =>
                  setFormData({ ...formData, count: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <select
                value={formData.isActive ? "Active" : "Inactive"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === "Active",
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
              />

              {previewImage && (
                <div className="mt-2 relative w-32 h-32 mx-auto">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                >
                  {editingProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
