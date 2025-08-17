import React, { createContext, useState } from "react";
import axios from "axios";
import { userApi } from "../Api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  //// REGISTER

  const registration = async (formData) => {
    try {
      // if (!formData.email || !formData.password) {
      //   alert("Email and Password are required!");
      //   return;
      // }
      const res = await axios.post(userApi, formData);
      setUser(res.data);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  ////// LOGIN

  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.get(
        `${userApi}?email=${email}&password=${password}`
      );
      setUser(data);
      //  console.log(user);
      return true;
    } catch (error) {
      console.error("error:", error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, registration, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
