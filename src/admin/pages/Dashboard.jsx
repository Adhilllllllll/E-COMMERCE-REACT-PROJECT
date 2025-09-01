import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiUsers,
  FiBarChart,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { productAPI, userApi } from "../../Api";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardContent />
    </div>
  );
};

const DashboardContent = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState("last3months");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch products & users from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          fetch(productAPI), // adjust API endpoint
          fetch( userApi),
        ]);

        const productData = await productRes.json();
        const userData = await userRes.json();

        setProducts(productData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Derived Stats
  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.stock || 0),
    0
  );

  const totalUsers = users.length;
  const activeAccounts = users.filter((u) => !u.isBlock && !u.isDelete).length;

  const statsData = [
  {
    title: "Total Revenue",
    value: `$${totalRevenue.toLocaleString()}`,
    trend: "up",
    trendText: "Revenue from stock * price",
    icon: <FiBarChart2 className="text-blue-500" />,
    bgColor: "bg-blue-100",
  },
  {
    title: "New Customers",
    value: totalUsers.toString(),
    trend: "up",
    trendText: "All registered users",
    icon: <FiUsers className="text-purple-500" />,
    bgColor: "bg-purple-100",
  },
  {
    title: "Active Accounts",
    value: activeAccounts.toString(),
    trend: "up",
    trendText: "Users not blocked/deleted",
    icon: <FiUsers className="text-green-500" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Total Products",
    value: products.length.toString(),
    trend: "up",
    trendText: "Total products in inventory",
    icon: <FiBarChart className="text-orange-500" />,
    bgColor: "bg-orange-100",
  },
];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.title}
              </h3>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {stat.value}
            </p>
            <div
              className={`flex items-center ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.trend === "up" ? <FiArrowUp /> : <FiArrowDown />}
              <span className="text-sm ml-1">{stat.trendText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
            Visitors for the last 6 months
          </h2>
          <div className="flex space-x-2">
            {["last3months", "last30days", "last7days"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeTimeFilter === filter
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTimeFilter(filter)}
              >
                {filter === "last3months"
                  ? "Last 3 months"
                  : filter === "last30days"
                  ? "Last 30 days"
                  : "Last 7 days"}
              </button>
            ))}
          </div> */}
        {/* </div> */}
        {/* <div className="h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xl font-semibold">Visitors Chart</p>
            <p className="mt-2">Visualization of visitor data</p>
          </div>
        </div>
      </div> */}

      {/* Recent Activity (from users list) */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Users
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.slice(-5).map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        !user.isBlock && !user.isDelete
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {!user.isBlock && !user.isDelete
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
