import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Swal from "sweetalert2";

const defaultForm = {
  name: "",
  category: "",
  price: "",
  count: 0,
  isActive: true,       // status field
  image: null,
  description: "",      // description field
};

const ProductManagement = () => {
  const { products, addProduct, editProduct, deleteProduct } =
    useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(defaultForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Open form for adding or editing product
  const openForm = (product = null) => {
    setEditingProduct(product);
    if (product) {
      // Ensure isActive is boolean
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product Management</h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Product
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mb-6">
        <thead>
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
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.count}</td>
              <td>{p.isActive ? "Active" : "Inactive"}</td>
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
              <input type="file" accept="image/*" onChange={handleFileChange} />

              {previewImage && (
                <div className="mt-2 relative w-32 h-32">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewImage(null);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    &times;
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
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
