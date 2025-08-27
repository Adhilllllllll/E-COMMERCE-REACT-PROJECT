import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../Api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState();

  // fetching all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(userApi);
      setUsers(data);
    } catch (error) {
      console.error("error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // block and unblock users
  const toggleBlockUser = async (id) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;

      const updateUser = { ...user, isBlock: !user.isBlock };
      await axios.put(`${userApi}/${id}`, updateUser);

      setUsers(users.map((u) => (u.id === id ? updateUser : u)));
      toast.success(`User ${updateUser.isBlock ? "blocked" : "unblocked"}`);
    } catch (error) {
      console.error("Error toggling User:", error);
      toast.error("Failed to update user");
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${userApi}/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted");
    } catch (error) {
      console.error("Error deleting User:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
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
