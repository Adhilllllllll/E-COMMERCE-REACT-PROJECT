import React, { useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserProvider";

const UserManagement = () => {
  const { users, toggleBlockUser, deleteUser } = useContext(UserContext);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          User Management
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-center">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Email", "Role", "Status", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-300 text-center"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-gray-500 italic text-center"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50 transition-all border-b border-gray-200 text-center align-middle"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {u.role}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        u.isBlocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  {/* ✅ Centered Action Buttons */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => toggleBlockUser(u._id)}
                        className={`${
                          u.isBlocked
                            ? "text-green-600 hover:text-green-800"
                            : "text-yellow-600 hover:text-yellow-700"
                        } font-medium transition-all`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>

                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "This action cannot be undone!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteUser(u._id);
                              Swal.fire(
                                "Deleted!",
                                "User has been deleted.",
                                "success"
                              );
                            }
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
    </div>
  );
};

export default UserManagement;
