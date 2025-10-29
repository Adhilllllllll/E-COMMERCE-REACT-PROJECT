// import React, { createContext, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export const BASE_URL = "http://localhost:7000/api/v1";
// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState(null); // store user & token only in memory
//   const navigate = useNavigate();

//   // REGISTER
//   const registration = async (formData) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/auth/signup`, formData);
//       if (res.data.status === "success") {
//         toast.success("🎉 Registration successful! Please login.");
//         navigate("/login");
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed!");
//     }
//   };

//   // LOGIN
//   const login = async (email, password) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/auth/login`,
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.data.status === "success") {
//         const userData = res.data.data; // assume { token, name, email, role }
//         setLoggedInUser(userData);
//         toast.success("Logged in successfully!");

//         // redirect
//         if (userData.role === "admin") navigate("/admin");
//         else navigate("/");
//       } else {
//         toast.error("Invalid login credentials!");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed!");
//     }
//   };

//   // LOGOUT
//   const logout = async () => {
//     setLoggedInUser(null);
//     toast.info("👋 Logged out successfully!");
//     navigate("/login");
//   };

//   // FORGOT PASSWORD
//   const forgotPassword = async (email) => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/users/forgetPassword`,
//         { email },
//         { withCredentials: true }
//       );
//       toast.success(res.data.message);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error sending reset link");
//     }
//   };

//   // RESET PASSWORD
//   const resetPassword = async (password, passwordConfirm, token) => {
//     try {
//       const res = await axios.patch(
//         `${BASE_URL}/users/resetPassword/${token}`,
//         {
//           password,
//           passwordConfirm,
//         },
//         { withCredentials: true }
//       );
//       toast.success(res.data.message);
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password reset failed");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         loggedInUser,
//         setLoggedInUser,
//         registration,
//         login,
//         logout,
//         forgotPassword,
//         resetPassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;



import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 import api from "../api/Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // REGISTER
  const registration = async (formData) => {
    try {
      const res = await api.post("/auth/signup", formData);
      if (res.data.status === "success") {
        toast.success("🎉 Registration successful! Please login.");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.status === "success") {
        const userData = res.data.data;
        setLoggedInUser(userData);
        localStorage.setItem("token", userData.token); // ✅ persist token
        toast.success("Logged in successfully!");

        if (userData.role === "admin") navigate("/admin");
        else navigate("/");
      } else {
        toast.error("Invalid login credentials!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  // LOGOUT
  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("token");
    toast.info("👋 Logged out successfully!");
    navigate("/login");
  };

  // FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/users/forgetPassword", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset link");
    }
  };

  // RESET PASSWORD
  const resetPassword = async (password, passwordConfirm, token) => {
    try {
      const res = await api.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  // Load token on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !loggedInUser) {
      setLoggedInUser({ token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        registration,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

