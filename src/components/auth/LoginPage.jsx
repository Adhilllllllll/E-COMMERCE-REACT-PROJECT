import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [storedUser, setUser] = useState(null);
  const { loggedInUser, login } = useContext(AuthContext);
  const [isUserExist, setUserExist] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  
  useEffect(() => {
  // Check context
  if (loggedInUser) {
    navigate("/", { replace: true });
    return;
  }

  // Check localStorage (for page refresh)
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));   // update state
    navigate("/", { replace: true });  // redirect
  }
}, [loggedInUser, navigate]);

// form filling
const handleChange = (event) => {
  setLoginData({ ...loginData, [event.target.name]: event.target.value });
};

const handleLogin = (event) => {
  event.preventDefault();

  // Call AuthContext login
  login(loginData.email, loginData.password);

  // Just log loginData (not loggedInUser, since it's async update)
  console.log("Login attempt:", loginData);
};



  return (
    <>
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
          <form className="space-y-6" onSubmit={(event) => handleLogin(event)}>
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
                  onChange={(event) => handleChange(event)}
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
                  onChange={(e) => handleChange(e)}
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

              <Link to = "/register" className="border-amber-300 bg-violet-300 ">
              <u>New to Anora ? .Register Your Account</u>
              </Link>
            </div>
          </form>
        </div>
        </div>
      
    </>
  );
}
