import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { userApi } from "../Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  // Keep localStorage in sync with loggedInUser
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [loggedInUser]);

  // Register new user
  const registration = async (formData) => {
    try {
      await axios.post(userApi, formData);
      navigate("/login");
      toast.success("Registration successful! Please login.");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Registration failed. Try again!");
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.get(userApi);
      const user = data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        setLoggedInUser(user);
        toast.success("🎉 Successfully Logged in!");
        navigate("/");
      } else {
        toast.error("😥 Sorry... User not found!");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Try again!");
    }
  };

  // Logout
  const logout = () => {
    setLoggedInUser(null);
    toast.success("👋 Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,  
        registration,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
