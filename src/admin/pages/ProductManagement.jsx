import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Swal from "sweetalert2";

const defaultForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "Active",
  images: [""], // Now an array for multiple images
};

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } =
    useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(defaultForm);

  const openForm = (product = null) => {
    setEditingProduct(product);
    setFormData(product || defaultForm);
    setShowForm(true);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImageField = () =>
    setFormData({ ...formData, images: [...formData.images, ""] });

  const handleRemoveImageField = (index) =>
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredImages = formData.images.filter((img) => img.trim() !== "");
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      filteredImages.length === 0
    ) {
      alert("Please fill all required fields and add at least one image.");
      return;
    }

    const normalizedData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: filteredImages,
    };

    editingProduct
      ? editProduct(editingProduct.id, normalizedData)
      : addProduct(normalizedData);

    setShowForm(false);
    setFormData(defaultForm);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Management
        </h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm mt-4 md:mt-0"
        >
          + Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Images",
                "Product",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 flex gap-2">
                  {p.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ))}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">{p.name}</td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {p.category}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">${p.price}</td>
                <td className="px-6 py-3 text-sm text-gray-800">{p.stock}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : p.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-3">
                  <button
                    onClick={() => openForm(p)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won’t be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProduct(p.id);
                          Swal.fire(
                            "Deleted!",
                            "Product has been deleted.",
                            "success"
                          );
                        }
                      });
                    }}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Multiple Images */}
              {/* Multiple Images */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Images
                </label>
                {formData.images.map((img, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text" // <-- changed from "url" to "text"
                      placeholder="Image URL or path"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImageField(idx)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="text-blue-600"
                >
                  + Add More Images
                </button>
              </div>

              {/* Status */}
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {["Active", "Low Stock", "Inactive"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
