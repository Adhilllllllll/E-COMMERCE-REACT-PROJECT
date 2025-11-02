// import axios from "axios";
// import React, { createContext, useEffect, useState, useContext } from "react";
// import { toast } from "react-toastify";
// import { AuthContext } from "./AuthProvider";
// import { userApi } from "../api/Api";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const { loggedInUser } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     if (!loggedInUser?.token) return;
//     try {
//       const { data } = await axios.get(userApi, {
//         headers: { Authorization: `Bearer ${loggedInUser.token}` },
//       });
//       setUsers(data);
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [loggedInUser?.token]);

//   const toggleBlockUser = async (id) => {
//     if (!loggedInUser?.token) return;
//     try {
//       const user = users.find((u) => u.id === id);
//       if (!user) return;

//       const updatedUser = { ...user, isBlock: !user.isBlock };
//       await axios.put(`${userApi}/${id}`, updatedUser, {
//         headers: { Authorization: `Bearer ${loggedInUser.token}` },
//       });

//       setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
//       toast.success(`User ${updatedUser.isBlock ? "blocked" : "unblocked"}`);
//     } catch (error) {
//       toast.error("Failed to update user");
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!loggedInUser?.token) return;
//     try {
//       await axios.delete(`${userApi}/${id}`, {
//         headers: { Authorization: `Bearer ${loggedInUser.token}` },
//       });
//       setUsers(users.filter((u) => u.id !== id));
//       toast.success("User deleted");
//     } catch (error) {
//       toast.error("Failed to delete user");
//     }
//   };

//   return (
//     <UserContext.Provider value={{ users, fetchUsers, toggleBlockUser, deleteUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
// import React, { createContext, useState, useEffect } from "react";
// // import api from "../api/api"; // centralized axios instance
// import { toast } from "react-toastify";
// import api from "../api/Api"
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/users/me"); // uses interceptor to attach token
//         setLoggedInUser(res.data.data || res.data.user);
//       } catch (err) {
//         console.log("User not logged in or session expired");
//         setLoggedInUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;


// src/context/UserProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/Api"; // ✅ Uses your axios instance with baseURL + token

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);       // All users for admin
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null);     // Error handling

  // ✅ Fetch all users (for admin)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users?page=1&limit=50");
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

  // ✅ Auto-fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Toggle block/unblock user
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

  // ✅ Delete user
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
