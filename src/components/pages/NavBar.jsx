import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="fixed w-full z-50 bg-white bg-opacity-90 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-serif tracking-wider text-gray-900"
          >
            Parfum Éternel
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {["Home", "Shop", "About"].map((item) => (
              <motion.a
                key={item}
                href={item === "Home" ? "/" : `${item.toLowerCase()}`}
                whileHover={{ y: -2 }}
                className="text-sm uppercase tracking-wider text-gray-600 hover:text-black relative group"
              >
                {item}
                <motion.span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('/cart')}
              className="p-1 text-gray-600 hover:text-black"
            >
              {/* CART ICONN  */}
              <FiShoppingBag className="h-5 w-5" /> 
            </motion.button>
            
            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('/login')}
              className="text-sm uppercase tracking-wider px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Login
            </motion.button>

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
      </div>

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
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                  className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="#login"
                className="block text-sm uppercase tracking-wider text-gray-600 hover:text-black"
                whileHover={{ x: 5 }}
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;