import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      await forgotPassword(email);
      toast.success("Reset link sent! Check your email.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-700 px-6 py-12">
      <div className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 font-serif">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 italic">
            Enter your email to receive reset link
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-800 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
