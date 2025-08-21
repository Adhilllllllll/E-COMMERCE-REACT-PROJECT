import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loggedInUser, login } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [checkingAuth, setCheckingAuth] = useState(true); // ✅ new state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in via context
    if (loggedInUser) {
      navigate("/", { replace: true });
      return;
    }

    // Check localStorage (in case of refresh)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/", { replace: true });
      return;
    }

    // ✅ Once checks are done, allow rendering
    setCheckingAuth(false);
  }, [loggedInUser, navigate]);

  // handle form input
  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(loginData.email, loginData.password);
    console.log("Login attempt:", loginData);
  };

  // ✅ Prevent UI flash while checking auth
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                required
                autoComplete="email"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                required
                autoComplete="current-password"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>

            <Link
              to="/register"
              className="block mt-4 text-center text-sm text-indigo-600 hover:underline"
            >
              New to Anora? Register your account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
