//  import React, { useContext } from 'react'
// import { ProductContext } from '../../context/ProductProvider';

//  const ProductManagement = () => {

//  const {products,addProduct,editProduct,deleteProduct}=useContext(ProductContext);

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-800">Product Management</h2>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
//           Add New Product
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     product.status === 'Active' ? 'bg-green-100 text-green-800' :
//                     product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {product.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

//  export default ProductManagement

import React, { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductProvider";
import Swal from "sweetalert2";

const defaultForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  status: "Active",
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

 const handleSubmit = (e) => {
  e.preventDefault();

  const normalizedData = {
    ...formData,
    price: Number(formData.price),
    stock: Number(formData.stock),
  };

  editingProduct
    ? editProduct(editingProduct.id, normalizedData)
    : addProduct(normalizedData);

  setShowForm(false);
};

  const formFields = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "category", type: "text", placeholder: "Category" },
    { name: "price", type: "number", placeholder: "Price" },
    { name: "stock", type: "number", placeholder: "Stock" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Product Management
        </h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 md:mt-0"
        >
          Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">${p.price}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
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
                <td className="px-4 py-3">
                  <button
                    onClick={() => openForm(p)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
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
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map(({ name, type, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              ))}
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                {["Active", "Low Stock", "Inactive"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
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
