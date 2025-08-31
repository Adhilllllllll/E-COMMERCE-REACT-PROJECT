import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const { registration } = useContext(AuthContext);
  const [registrationForm, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    address: {
      mobile: "",
      street: "",
      city: "",
      state: "",
      pin: "",
    },
    isBlock: false,
    isDelete: false,
    cart: [],
    orders: [],
    wishlist: [],
    orderHistory: [],
    created_at: new Date().toISOString(),
  });

  const handleChange = (event) => {
    setFormData({
      ...registrationForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registration(registrationForm);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-700 px-6 py-12">
      <div className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-8">
        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 font-serif">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 italic">
            Luxury Perfume Store
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={registrationForm.name}
              required
              autoComplete="name"
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={registrationForm.email}
              required
              autoComplete="email"
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-purple-700 hover:text-purple-600"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
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
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="mt-4 text-sm font-medium text-indigo-500 hover:underline"
            >
              Already registered? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
