import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Swal from "sweetalert2";

const defaultForm = {
  name: "",
  category: "",
  price: "",
  count: 0,
  isActive: true,
  images: [],
};

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } =
    useContext(ProductContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const openForm = (product = null) => {
    setEditingProduct(product);
    setFormData(product || defaultForm);
    setSelectedFiles([]);
    setExistingImages(product?.images || []);
    setPreviewImages(product?.images || []);
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Generate temporary preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    // Combine existing images with newly selected files
    setPreviewImages([...existingImages, ...newPreviews]);
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
        // Pass existingImages so backend keeps them
        await editProduct(
          editingProduct.id,
          normalizedData,
          selectedFiles,
          existingImages
        );
      } else {
        await addProduct(normalizedData, selectedFiles);
      }
    } catch (err) {
      console.error("Error submitting product:", err);
    }

    // Reset form state
    setShowForm(false);
    setFormData(defaultForm);
    setSelectedFiles([]);
    setPreviewImages([]);
    setExistingImages([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Product
        </button>
      </div>

      {/* Products Table */}
      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead>
          <tr>
            {[
              "Images",
              "Name",
              "Category",
              "Price",
              "Stock",
              "Status",
              "Actions",
            ].map((col) => (
              <th key={col} className="px-4 py-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2">
                <img
                  src={Array.isArray(p.images) ? p.images[0] : p.images}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.status}</td>
              <td className="flex gap-2">
                <button onClick={() => openForm(p)} className="text-blue-600">
                  Edit
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) deleteProduct(p.id);
                    });
                  }}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
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
                required
              />

              {/* Image Upload & Preview */}
              <div className="w-full">
                <label className="block mb-1 font-medium">Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full border p-2 rounded"
                />
                <div className="flex gap-2 mt-2">
                  {previewImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`preview-${i}`}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <label>Status</label>
              <select
                value={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === "true",
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
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
