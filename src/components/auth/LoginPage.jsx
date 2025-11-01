import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loggedInUser, loading, login } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!loading && loggedInUser) {
      navigate(
        loggedInUser.role?.toLowerCase().trim() === "admin" ? "/admin" : "/",
        { replace: true }
      );
    }
  }, [loggedInUser, loading, navigate]);

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(loginData.email, loginData.password);
  };

  if (loading) {
    // Show this while AuthProvider is checking cookie / user
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-700">
        <p className="text-white">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-700 px-6 py-12">
      <div className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-8">
        {/* Logo & Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 font-serif">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 italic">Luxury Perfume Store</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              required
              autoComplete="email"
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                Password
              </label>
              <Link
                to="/forget-password"
                className="text-sm font-semibold text-purple-700 hover:text-purple-600"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              required
              autoComplete="current-password"
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-800 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <Link to="/register" className="mt-4 text-sm font-medium text-indigo-500 hover:underline">
              New to our store? Register your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
