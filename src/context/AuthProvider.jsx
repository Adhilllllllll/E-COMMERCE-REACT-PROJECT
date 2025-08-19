import React, { createContext, useState } from "react";
import axios from "axios";
import { userApi } from "../Api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  //// REGISTER
  const registration = async (formData) => {
    try {
      const res = await axios.post(userApi, formData);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  ////// LOGIN
  const login = async (email, password) => {
    try {
      const { data } = await axios.get(userApi); // get all users
      const user = data.find(
        (u) => u.email === email && u.password === password
      ); // check directly in fetched data

      if (user) {
        setLoggedInUser(user);
       
        alert("Successfully Logged in 🎉");
        navigate("/");
      } else {
        alert("Sorry... User not found 😥");
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, registration, login, setLoggedInUser }}>
     
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
