import React from 'react';
import { motion } from 'framer-motion';
import {
  RiShoppingBag3Line,
  RiHeartLine,
  RiTimeLine,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      icon: <RiShoppingBag3Line className="text-2xl text-indigo-600" />,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Wishlist Items',
      value: '8',
      icon: <RiHeartLine className="text-2xl text-pink-600" />,
      change: '+3',
      trend: 'up',
    },
    {
      title: 'Pending Orders',
      value: '2',
      icon: <RiTimeLine className="text-2xl text-yellow-600" />,
      change: '-1',
      trend: 'down',
    },
    {
      title: 'Total Spent',
      value: '$1,248',
      icon: <RiMoneyDollarCircleLine className="text-2xl text-green-600" />,
      change: '+$248',
      trend: 'up',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      date: '2024-03-15',
      status: 'Delivered',
      total: '$156.00',
      items: 3,
    },
    {
      id: '#ORD-002',
      date: '2024-03-14',
      status: 'Processing',
      total: '$249.99',
      items: 2,
    },
    {
      id: '#ORD-003',
      date: '2024-03-12',
      status: 'Shipped',
      total: '$89.99',
      items: 1,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="divide-y">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items} items</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-indigo-600 rounded-xl text-white text-left"
        >
          <RiShoppingBag3Line className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold">Track Order</h3>
          <p className="text-indigo-200 mt-1">Check your order status</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-pink-600 rounded-xl text-white text-left"
        >
          <RiHeartLine className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold">View Wishlist</h3>
          <p className="text-pink-200 mt-1">See your saved items</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-green-600 rounded-xl text-white text-left"
        >
          <RiMoneyDollarCircleLine className="text-3xl mb-4" />
          <h3 className="text-lg font-semibold">Payment Methods</h3>
          <p className="text-green-200 mt-1">Manage your payment options</p>
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard; 