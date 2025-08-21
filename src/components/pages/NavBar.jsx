import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { loggedInUser, logout } = useContext(AuthContext);

  // ✅ Confirm before logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="text-2xl font-serif tracking-wider text-gray-900">
          Parfum Éternel
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-8">
          {["Home", "Shop", "About"].map((item) => (
            <Link
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              key={item}
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-black"
            >
              {item}
            </Link>
          ))}

          {/* ✅ Orders visible only if logged in */}
          {loggedInUser && (
            <Link
              to="/orders"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-black"
            >
              Orders
            </Link>
          )}
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center space-x-6">
          {/* CART ICON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cart")}
            className="p-1 text-gray-600 hover:text-black"
          >
            <FiShoppingBag className="h-5 w-5" />
          </motion.button>

          {/* ✅ Login / Logout */}
          {loggedInUser ? (
            <LogoutButton onClick={handleLogout} />
          ) : (
            <LoginButton onClick={() => navigate("/login")} />
          )}

          {/* MOBILE MENU TOGGLE */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-1 text-gray-600 hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {["Home", "Shop", "About"].map((item) => (
                <motion.a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}

              {/* ✅ Orders only if logged in */}
              {loggedInUser && (
                <motion.a
                  href="/orders"
                  className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                  whileHover={{ x: 5 }}
                >
                  Orders
                </motion.a>
              )}

              {/* ✅ Login / Logout */}
              {loggedInUser ? (
                <motion.button
                  onClick={handleLogout}
                  className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                  whileHover={{ x: 5 }}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => navigate("/login")}
                  className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                  whileHover={{ x: 5 }}
                >
                  Login
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
