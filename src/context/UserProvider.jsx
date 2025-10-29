import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import { userApi } from "../api/Api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { loggedInUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!loggedInUser?.token) return;
    try {
      const { data } = await axios.get(userApi, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [loggedInUser?.token]);

  const toggleBlockUser = async (id) => {
    if (!loggedInUser?.token) return;
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;

      const updatedUser = { ...user, isBlock: !user.isBlock };
      await axios.put(`${userApi}/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });

      setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
      toast.success(`User ${updatedUser.isBlock ? "blocked" : "unblocked"}`);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (!loggedInUser?.token) return;
    try {
      await axios.delete(`${userApi}/${id}`, {
        headers: { Authorization: `Bearer ${loggedInUser.token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, toggleBlockUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
