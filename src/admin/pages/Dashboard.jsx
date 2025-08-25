import { useState } from 'react';
import { FiHome, FiPieChart, FiRefreshCw, FiBarChart2, FiBriefcase, FiUsers, FiFile, FiBook, FiBarChart, FiMessageCircle, FiMoreHorizontal, FiSearch, FiBell, FiChevronDown, FiArrowUp, FiArrowDown, FiShoppingCart, FiPackage, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPageContent = () => {
    switch(activePage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'products':
        return <ProductManagement />;
      case 'users':
        return <UserManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed md:relative z-50 w-64 bg-blue-900 text-white h-full transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-blue-800">
          <h1 className="text-xl font-bold">E-Commerce Admin</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center p-2 rounded transition-colors duration-200 ${activePage === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
              >
                <FiHome className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActivePage('product')}
                className={`w-full flex items-center p-2 rounded transition-colors duration-200 ${activePage === 'products' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
              >
                <FiPackage className="mr-3" />
                <span >Product Management</span>
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActivePage('users')}
                className={`w-full flex items-center p-2 rounded transition-colors duration-200 ${activePage === 'users' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
              >
                <FiUsers className="mr-3" />
                <span>User Management</span>
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => setActivePage('orders')}
                className={`w-full flex items-center p-2 rounded transition-colors duration-200 ${activePage === 'orders' ? 'bg-blue-800' : 'hover:bg-blue-800'}`}
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
              <button className="w-full flex items-center p-2 rounded hover:bg-blue-800 transition-colors duration-200">
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-800 capitalize">{activePage === 'dashboard' ? 'Dashboard Overview' : activePage.replace(/([A-Z])/g, ' $1')}</h1>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search..."
                />
              </div>
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
                <span className="ml-2 text-sm font-medium hidden md:inline">Admin User</span>
                <FiChevronDown className="ml-1 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('last3months');

  const statsData = [
    {
      title: 'Total Revenue',
      value: '$1,250.00',
      trend: 'up',
      trendText: 'Trending up this month',
      icon: <FiBarChart2 className="text-blue-500" />,
      bgColor: 'bg-blue-100'
    },
    {
      title: 'New Customers',
      value: '1,234',
      trend: 'down',
      trendText: 'Down 20% this period',
      icon: <FiUsers className="text-purple-500" />,
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Accounts',
      value: '45,678',
      trend: 'up',
      trendText: 'Strong user retention',
      icon: <FiUsers className="text-green-500" />,
      bgColor: 'bg-green-100'
    },
    {
      title: 'Growth Rate',
      value: '4.5%',
      trend: 'up',
      trendText: 'Steady performance increase',
      icon: <FiBarChart className="text-orange-500" />,
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
            <div className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend === 'up' ? <FiArrowUp /> : <FiArrowDown />}
              <span className="text-sm ml-1">{stat.trendText}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Visitors for the last 6 months</h2>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm ${activeTimeFilter === 'last3months' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTimeFilter('last3months')}
            >
              Last 3 months
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm ${activeTimeFilter === 'last30days' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTimeFilter('last30days')}
            >
              Last 30 days
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-sm ${activeTimeFilter === 'last7days' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTimeFilter('last7days')}
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">john.doe@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Placed an order</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Aug 25, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=2" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                      <div className="text-sm text-gray-500">jane.smith@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Created an account</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Aug 24, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">New</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=3" alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                      <div className="text-sm text-gray-500">robert@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Updated payment method</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Aug 23, 2025</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Product Management Component
// const ProductManagement = () => {
//   const products = [
//     { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$99.99', stock: 45, status: 'Active' },
//     { id: 2, name: 'Running Shoes', category: 'Footwear', price: '$79.99', stock: 12, status: 'Active' },
//     { id: 3, name: 'Smart Watch', category: 'Electronics', price: '$199.99', stock: 8, status: 'Low Stock' },
//     { id: 4, name: 'Cotton T-Shirt', category: 'Clothing', price: '$24.99', stock: 67, status: 'Active' },
//     { id: 5, name: 'Coffee Maker', category: 'Appliances', price: '$49.99', stock: 0, status: 'Out of Stock' },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-800">Product Management</h2>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
//           Add New Product
//         </button>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     product.status === 'Active' ? 'bg-green-100 text-green-800' : 
//                     product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {product.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// User Management Component
const UserManagement = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', status: 'Active', joinDate: 'Aug 20, 2025' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Admin', status: 'Active', joinDate: 'Jul 15, 2025' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Customer', status: 'Inactive', joinDate: 'Aug 5, 2025' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Customer', status: 'Active', joinDate: 'Aug 18, 2025' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Moderator', status: 'Active', joinDate: 'Jul 28, 2025' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 md:mt-0">
          Add New User
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/150?img=${user.id}`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.joinDate}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// // Order Management Component
// const OrderManagement = () => {
//   const orders = [
//     { id: '#ORD-001', customer: 'John Doe', date: 'Aug 25, 2025', amount: '$99.99', status: 'Delivered' },
//     { id: '#ORD-002', customer: 'Jane Smith', date: 'Aug 24, 2025', amount: '$149.99', status: 'Shipped' },
//     { id: '#ORD-003', customer: 'Robert Johnson', date: 'Aug 23, 2025', amount: '$79.99', status: 'Processing' },
//     { id: '#ORD-004', customer: 'Sarah Williams', date: 'Aug 22, 2025', amount: '$199.99', status: 'Delivered' },
//     { id: '#ORD-005', customer: 'Michael Brown', date: 'Aug 21, 2025', amount: '$49.99', status: 'Cancelled' },
//   ];

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-800">Order Management</h2>
//         <div className="flex space-x-2 mt-4 md:mt-0">
//           <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
//             Export CSV
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//             Create Order
//           </button>
//         </div>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
//                     order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
//                     order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
//                   <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
//                   <button className="text-gray-600 hover:text-gray-900">Edit</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

export default Dashboard;