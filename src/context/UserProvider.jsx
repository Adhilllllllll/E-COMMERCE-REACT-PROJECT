 


// src/context/UserProvider.jsx
import React, { createContext, useState, useEffect,useContext} from "react";
import { toast } from "react-toastify";
import api from "../api/Api"; // ✅ Uses your axios instance with baseURL + token
import { AuthContext } from "./AuthProvider";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);       // All users for admin
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null);     // Error handling
  const {loggedInUser} =useContext(AuthContext);
  //  Fetch all users (for admin)
 const fetchUsers = async () => {
  try {
    setLoading(true);

    // Use withCredentials: true to send cookies
    const res = await api.get("/users?page=1&limit=50", { withCredentials: true });

    // Backend returns { status: "success", data: [...] }
    setUsers(res.data.data || []);
    setError(null);
  } catch (err) {
    console.error("Error fetching users:", err);
    setError("Failed to fetch users");
    toast.error("Failed to load users");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (loggedInUser?.role === "admin") {
    fetchUsers();
  } else {
    // console.log("Not an admin. Skipping fetchUsers.");
  }
}, [loggedInUser]);



  //  Toggle block/unblock user
  const toggleBlockUser = async (id) => {
    try {
      const res = await api.patch(`/users/${id}/block`);
      const updatedUser = res.data.data;

      // Update state with new block status
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? updatedUser : u))
      );

      toast.success(res.data.message || "User status updated");
    } catch (err) {
      console.error("Failed to block/unblock user:", err);
      toast.error("Failed to block/unblock user");
    }
  };

  //  Delete user
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        toggleBlockUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
