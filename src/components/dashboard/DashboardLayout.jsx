import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiFileList3Line,
  RiUserSettingsLine,
  RiSettings4Line,
  RiCustomerService2Line,
  RiHeartLine,
  RiLogoutBoxRLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiNotification3Line,
} from 'react-icons/ri';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <RiDashboardLine className="text-xl" />,
      path: '/dashboard',
    },
    {
      title: 'Orders',
      icon: <RiShoppingBag3Line className="text-xl" />,
      path: '/dashboard/orders',
    },
    {
      title: 'Order History',
      icon: <RiFileList3Line className="text-xl" />,
      path: '/dashboard/order-history',
    },
    {
      title: 'Wishlist',
      icon: <RiHeartLine className="text-xl" />,
      path: '/dashboard/wishlist',
    },
    {
      title: 'Profile Settings',
      icon: <RiUserSettingsLine className="text-xl" />,
      path: '/dashboard/profile',
    },
    {
      title: 'Support',
      icon: <RiCustomerService2Line className="text-xl" />,
      path: '/dashboard/support',
    },
    {
      title: 'Settings',
      icon: <RiSettings4Line className="text-xl" />,
      path: '/dashboard/settings',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ width: isSidebarOpen ? 240 : 80 }}
          animate={{ width: isSidebarOpen ? 240 : 80 }}
          exit={{ width: 80 }}
          className={`bg-white shadow-lg h-screen sticky top-0 ${
            isSidebarOpen ? 'w-60' : 'w-20'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {isSidebarOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-gray-800"
              >
                Dashboard
              </motion.h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <RiMenuFoldLine className="text-xl" />
              ) : (
                <RiMenuUnfoldLine className="text-xl" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col h-[calc(100vh-4rem)]">
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300
                    ${
                      location.pathname === item.path
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item.icon}
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              <button
                className={`flex items-center space-x-2 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300`}
              >
                <RiLogoutBoxRLine className="text-xl" />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    Logout
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)?.title || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <RiNotification3Line className="text-xl" />
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 