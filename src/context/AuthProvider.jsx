import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/Api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        const user = res.data?.data;

        if (user) {
          if (user.role === "user") user.role = "customer";
          setLoggedInUser(user);
        } else {
          setLoggedInUser(null);
        }
      } catch (err) {
        // Silently handle 401 (already handled by interceptor)
        if (err.response?.status !== 401) {
          console.error("Auth fetch error:", err.response?.data || err.message);
        }
        setLoggedInUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


 

  // 🔹 REGISTER
  const registration = async (formData) => {
    try {
      const res = await api.post("/auth/signup", formData);
      if (res.data.status === "success") {
        toast.success("🎉 Registration successful! Please login.");
        navigate("/login", { replace: true });
      } else {
        toast.error(res.data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  // 🔹 LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password }, { withCredentials: true });

      if (res.data.status === "success") {
        const user = res.data.data.user;

        if (!user) throw new Error("Invalid login response");

        // Ensure role exists and normalize
        if (!user.role) user.role = "user"; // default
        if (user.role === "user") user.role = "customer"; // match AppRoutes

        setLoggedInUser(user);

        toast.success("Logged in successfully!");

        // Redirect based on role
        navigate(user.role.toLowerCase() === "admin" ? "/admin" : "/", {
          replace: true,
        });

        return;
      }

      toast.error(res.data.message || "Login failed!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed!"
      );
    }
  };

  // 🔹 LOGOUT
const logout = async () => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true }); // ensure cookie is sent
    setLoggedInUser(null);
    toast.info("👋 Logged out successfully!");
    navigate("/login", { replace: true });
  } catch (error) {
    console.warn("Logout: cookie may already be cleared or expired.", error?.response?.data || error.message);
    toast.error("Logout failed or already logged out!");
  } finally {
    // Double safety: clear user context even if server call fails
    setLoggedInUser(null);
  }
};


  // 🔹 FORGOT PASSWORD
  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/users/forgetPassword", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset link");
    }
  };

  // 🔹 RESET PASSWORD
  const resetPassword = async (password, passwordConfirm, token) => {
    try {
      const res = await api.patch(`/users/resetPassword/${token}`, {
        password,
        passwordConfirm,
      });
      toast.success(res.data.message);
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        loading,
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
