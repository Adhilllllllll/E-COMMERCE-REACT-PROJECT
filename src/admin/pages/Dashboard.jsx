import { useState } from "react";
import { FiBarChart2, FiUsers, FiBarChart, FiArrowUp, FiArrowDown } from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <DashboardContent />
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState("last3months");

  const statsData = [
    {
      title: "Total Revenue",
      value: "$1,250.00",
      trend: "up",
      trendText: "Trending up this month",
      icon: <FiBarChart2 className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "New Customers",
      value: "1,234",
      trend: "down",
      trendText: "Down 20% this period",
      icon: <FiUsers className="text-purple-500" />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Active Accounts",
      value: "45,678",
      trend: "up",
      trendText: "Strong user retention",
      icon: <FiUsers className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Growth Rate",
      value: "4.5%",
      trend: "up",
      trendText: "Steady performance increase",
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
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
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

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
            Visitors for the last 6 months
          </h2>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTimeFilter === "last3months"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTimeFilter("last3months")}
            >
              Last 3 months
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTimeFilter === "last30days"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTimeFilter("last30days")}
            >
              Last 30 days
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTimeFilter === "last7days"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTimeFilter("last7days")}
            >
              Last 7 days
            </button>
          </div>
        </div>
        <div className="h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-xl font-semibold">Visitors Chart</p>
            <p className="mt-2">Visualization of visitor data</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://i.pravatar.cc/150?img=1"
                      alt=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">john.doe@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  Placed an order
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  Aug 25, 2025
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://i.pravatar.cc/150?img=2"
                      alt=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                      <div className="text-sm text-gray-500">jane.smith@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  Created an account
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  Aug 24, 2025
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    New
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
