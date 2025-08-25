import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 w-64 bg-blue-900 text-white h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-blue-800">
          <h1 className="text-xl font-bold">E-Commerce Admin</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button
                onClick={() => navigate("/admin")}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <FiHome className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => navigate("/admin/products")}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <FiPackage className="mr-3" />
                <span>Product Management</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => navigate("/admin/users")}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <FiUsers className="mr-3" />
                <span>User Management</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => navigate("/admin/orders")}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <FiShoppingBag className="mr-3" />
                <span>Order Management</span>
              </button>
            </li>
            <li className="mb-2 mt-8">
              <button className="w-full flex items-center p-2 rounded hover:bg-blue-800 transition-colors duration-200">
                <FiSettings className="mr-3" />
                <span>Settings</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={logout}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800 transition-colors duration-200"
              >
                <FiLogOut className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4 text-gray-600"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center">
              {/* <div className="relative mr-4 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search..."
                />
              </div> */}
              <button className="p-2 mr-4 text-gray-600 hover:text-gray-900 relative">
                <FiBell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://ui-avatars.com/api/?name=Admin+User&background=random"
                  alt="Admin User"
                />
                <span className="ml-2 text-sm font-medium hidden md:inline">
                  Admin User
                </span>
                <FiChevronDown className="ml-1 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Nested Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />{" "}
          {/* This is where Dashboard, ProductManagement, etc. will render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
