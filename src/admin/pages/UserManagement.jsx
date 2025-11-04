import React, { useContext} from 'react'
import Swal from 'sweetalert2';
import { UserContext } from '../../context/UserProvider';


const UserManagement = () => {
 const {users,toggleBlockUser,deleteUser}=useContext(UserContext)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        User Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              {/* <th className="px-4 py-3">Mobile</th> */}
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.role}</td>
                {/* <td className="px-4 py-3">{u.address?.mobile}</td> */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                      u.isBlock
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {u.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-3">
                  <button
                    onClick={() => toggleBlockUser(u._id)}
                    className={`${
                      u.isBlocked ? "text-green-600" : "text-yellow-600"
                    } hover:underline`}
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
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement