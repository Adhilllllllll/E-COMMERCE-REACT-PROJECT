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

  // Register new user (default role = customer, default isBlock = false)
  const registration = async (formData) => {
  try {
    // Fetch all users first
    const { data } = await axios.get(userApi);
    
    // Check if email already exists
    const emailExists = data.some(user => user.email === formData.email);
    if (emailExists) {
      toast.error("🚨 This email is already registered!");
      return;
    }

    // If not, proceed with registration
    await axios.post(userApi, { ...formData, role: "customer", isBlock: false });
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

      if (!user) {
        toast.error("😥 Sorry... User not found!");
        return;
      }

      // Check if user is blocked
      if (user.isBlock) {
        toast.error("🚫 Your account has been blocked. Please contact support.");
        return;
      }

      // Successful login
      setLoggedInUser(user);
      toast.success("🎉 Successfully Logged in!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
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
