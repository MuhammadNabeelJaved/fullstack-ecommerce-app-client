import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  RiShoppingBag3Line,
  RiHeartLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
  RiCalendarLine,
  RiArrowRightLine,
  RiShoppingBag2Line,
  RiTruckLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { useAuth } from "../../contextApi/Context.jsx";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useAuth(); // Assuming you have a user context or prop

  console.log("User in dashboard:", user);

  // Get current date and time

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${day}/${month}/${year}`;

  console.log("Current date:", formattedDate);

  // Listen for dark mode changes from the parent component
  // In a real app, this would be done with Context API or Redux
  useEffect(() => {
    // Check if parent has dark mode class
    const isDark =
      document.body.classList.contains("dark") ||
      document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    // This is a simplified implementation - in a real app,
    // you would subscribe to a theme context or use Redux
  }, []);

  const stats = [
    {
      title: "Total Orders",
      value: "24",
      icon: <RiShoppingBag3Line className="text-2xl" />,
      change: "+12%",
      trend: "up",
      color: "indigo",
    },
    {
      title: "Wishlist Items",
      value: "8",
      icon: <RiHeartLine className="text-2xl" />,
      change: "+3",
      trend: "up",
      color: "pink",
    },
    {
      title: "Pending Orders",
      value: "2",
      icon: <RiTimeLine className="text-2xl" />,
      change: "-1",
      trend: "down",
      color: "amber",
    },
    {
      title: "Total Spent",
      value: "$1,248",
      icon: <RiMoneyDollarCircleLine className="text-2xl" />,
      change: "+$248",
      trend: "up",
      color: "emerald",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      date: "2024-03-15",
      status: "Delivered",
      total: "$156.00",
      items: 3,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120",
    },
    {
      id: "#ORD-002",
      date: "2024-03-14",
      status: "Processing",
      total: "$249.99",
      items: 2,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=120",
    },
    {
      id: "#ORD-003",
      date: "2024-03-12",
      status: "Shipped",
      total: "$89.99",
      items: 1,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120",
    },
  ];

  const upcomingDeliveries = [
    {
      id: "#TRK-001",
      product: "Wireless Headphones",
      date: "Tomorrow",
      carrier: "FedEx",
      status: "In Transit",
    },
    {
      id: "#TRK-002",
      product: "Smart Speaker",
      date: "Mar 24, 2024",
      carrier: "UPS",
      status: "Preparing",
    },
  ];

  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <RiCheckboxCircleLine className="text-emerald-500" />;
      case "processing":
        return <RiTimeLine className="text-amber-500" />;
      case "shipped":
      case "in transit":
        return <RiTruckLine className="text-blue-500" />;
      default:
        return <RiShoppingBag2Line className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard Overview
        </h1>
        <div
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
            isDarkMode
              ? "bg-indigo-900/40 text-indigo-300"
              : "bg-indigo-50 text-indigo-700"
          }`}
        >
          <RiCalendarLine className="mr-1.5" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Welcome Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`p-6 rounded-xl overflow-hidden relative ${
          isDarkMode
            ? "bg-gradient-to-r from-indigo-900/70 to-purple-900/70 border border-indigo-800/50"
            : "bg-gradient-to-r from-indigo-600 to-purple-600"
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 -mt-12 -mr-12 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFFFFF"
              d="M47.9,-57.2C59.8,-47.8,66.2,-30.6,68.6,-13.5C71,3.6,69.4,20.7,60.9,33.4C52.5,46.1,37.2,54.3,21.2,59.9C5.2,65.4,-11.6,68.3,-29.4,65C-47.3,61.6,-66.1,52.1,-72.9,37.2C-79.7,22.3,-74.5,2.1,-68.2,-15.7C-61.9,-33.5,-54.5,-48.7,-42.6,-58C-30.6,-67.3,-15.3,-70.7,1.2,-72.2C17.7,-73.6,35.9,-66.6,47.9,-57.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-indigo-100 mb-6 max-w-xl">
            Here's an overview of your recent activity and stats for{" "}
            {formattedDate}.
            {/* You have 2 pending orders and 1 delivery scheduled for tomorrow. */}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard/orders"
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-colors"
            >
              View Orders
              <RiArrowRightLine className="ml-1.5" />
            </Link>
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white backdrop-blur-sm transition-colors"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 shadow-none"
                : "bg-white border-gray-100 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isDarkMode
                    ? `bg-${stat.color}-900/30 text-${stat.color}-500`
                    : `bg-${stat.color}-50 text-${stat.color}-600`
                }`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up"
                    ? isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-600"
                    : isDarkMode
                    ? "text-red-400"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {stat.title}
            </h3>
            <p
              className={`text-2xl font-bold mt-1 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`lg:col-span-2 rounded-xl border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Recent Orders
            </h2>
            <Link
              to="/dashboard/orders"
              className={`text-sm font-medium inline-flex items-center ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              View All
              <RiArrowRightLine className="ml-1" />
            </Link>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden mr-4 flex-shrink-0 border dark:border-gray-700">
                      <img
                        src={order.image}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {order.id}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {order.total}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {order.items} items
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
                        ${
                          order.status === "Delivered"
                            ? isDarkMode
                              ? "bg-emerald-900/40 text-emerald-400"
                              : "bg-emerald-100 text-emerald-800"
                            : order.status === "Processing"
                            ? isDarkMode
                              ? "bg-amber-900/40 text-amber-400"
                              : "bg-amber-100 text-amber-800"
                            : isDarkMode
                            ? "bg-blue-900/40 text-blue-400"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-xl border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-100 shadow-sm"
          }`}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Upcoming Deliveries
            </h2>
          </div>

          {upcomingDeliveries.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {delivery.product}
                      </p>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        } mt-1`}
                      >
                        {delivery.carrier} - {delivery.id}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                        delivery.date === "Tomorrow"
                          ? isDarkMode
                            ? "bg-blue-900/40 text-blue-400"
                            : "bg-blue-100 text-blue-700"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {delivery.date}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center">
                    {getStatusIcon(delivery.status)}
                    <span
                      className={`text-sm ml-1.5 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <RiTruckLine
                className={`w-12 h-12 mx-auto ${
                  isDarkMode ? "text-gray-600" : "text-gray-300"
                }`}
              />
              <p
                className={`mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No upcoming deliveries
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <h2
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl text-white relative overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-r from-indigo-900 to-indigo-700 shadow-lg shadow-indigo-900/20"
              : "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-600/20"
          }`}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <RiShoppingBag3Line className="text-3xl mb-4 relative" />
          <h3 className="text-lg font-semibold relative">Track Order</h3>
          <p className="text-indigo-200 mt-1 relative">
            Check your order status
          </p>
          <Link
            to="/dashboard/orders"
            className="absolute inset-0"
            aria-label="Track Order"
          >
            <span className="sr-only">Track Order</span>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl text-white relative overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-r from-pink-900 to-pink-700 shadow-lg shadow-pink-900/20"
              : "bg-gradient-to-r from-pink-600 to-pink-500 shadow-lg shadow-pink-600/20"
          }`}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <RiHeartLine className="text-3xl mb-4 relative" />
          <h3 className="text-lg font-semibold relative">View Wishlist</h3>
          <p className="text-pink-200 mt-1 relative">See your saved items</p>
          <Link
            to="/dashboard/wishlist"
            className="absolute inset-0"
            aria-label="View Wishlist"
          >
            <span className="sr-only">View Wishlist</span>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-6 rounded-xl text-white relative overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-r from-emerald-900 to-emerald-700 shadow-lg shadow-emerald-900/20"
              : "bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-600/20"
          }`}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          <RiMoneyDollarCircleLine className="text-3xl mb-4 relative" />
          <h3 className="text-lg font-semibold relative">Payment Methods</h3>
          <p className="text-emerald-200 mt-1 relative">
            Manage your payment options
          </p>
          <Link
            to="/dashboard/profile"
            className="absolute inset-0"
            aria-label="Payment Methods"
          >
            <span className="sr-only">Payment Methods</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
