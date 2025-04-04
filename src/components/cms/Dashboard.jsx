import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ClipboardCheck,
  AlertTriangle,
  Eye,
  Calendar,
  ArrowRight,
  ExternalLink,
  Mail,
  Clock
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Sales',
      value: '$12,486',
      change: '+16%',
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'indigo',
      period: 'from last month'
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'emerald',
      period: 'from last month'
    },
    {
      title: 'Total Products',
      value: '89',
      change: '+3',
      trend: 'up',
      icon: <Package className="h-5 w-5" />,
      color: 'purple',
      period: 'new products'
    },
    {
      title: 'Total Customers',
      value: '1,256',
      change: '+18%',
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'blue',
      period: 'from last month'
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-7352',
      customer: 'John Smith',
      date: '2024-03-18 10:45 AM',
      total: '$156.00',
      status: 'Pending',
      items: 3,
    },
    {
      id: '#ORD-7351',
      customer: 'Emma Wilson',
      date: '2024-03-18 09:12 AM',
      total: '$249.99',
      status: 'Processing',
      items: 2,
    },
    {
      id: '#ORD-7350',
      customer: 'Michael Brown',
      date: '2024-03-17 03:22 PM',
      total: '$89.99',
      status: 'Shipped',
      items: 1,
    },
    {
      id: '#ORD-7349',
      customer: 'Sophia Davis',
      date: '2024-03-17 09:45 AM',
      total: '$345.00',
      status: 'Delivered',
      items: 4,
    },
    {
      id: '#ORD-7348',
      customer: 'Robert Johnson',
      date: '2024-03-16 06:18 PM',
      total: '$59.99',
      status: 'Cancelled',
      items: 1,
    }
  ];

  const lowStockProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      stock: 3,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120',
      price: '$129.99',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch Series 5',
      stock: 2,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120',
      price: '$299.99',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Phone Case - iPhone 14',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=120',
      price: '$24.99',
      category: 'Accessories'
    }
  ];

  const recentCustomerMessages = [
    {
      id: 1,
      name: 'Emma Wilson',
      message: 'I haven\'t received my order yet and it\'s been 5 days. Can you check the status?',
      time: '35 mins ago',
      isRead: false
    },
    {
      id: 2,
      name: 'David Thompson',
      message: 'Is the Smart Watch Series 5 compatible with Android phones?',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      message: 'I want to return my purchase. How do I initiate a return?',
      time: '5 hours ago',
      isRead: true
    }
  ];
  
  // Sales data for the chart
  const salesData = [4200, 5800, 5200, 6000, 7800, 8200, 7600];
  const maxSalesValue = Math.max(...salesData);
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                {stat.icon}
              </div>
              <span
                className={`text-sm font-medium flex items-center ${
                  stat.trend === 'up' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.period}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Sales</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sales performance for the last 7 days</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
                <Calendar className="w-3 h-3 mr-1" />
                Last 7 days
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {salesData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxSalesValue) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-indigo-500 dark:bg-indigo-600 rounded-t-md"
                    style={{ width: '60%', marginLeft: '20%' }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mt-1"
                    style={{ marginBottom: '-20px' }}
                  >
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Weekly Sales</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">$46,250</p>
            </div>
            <Link to="/cms/analytics" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:underline">
              View detailed report
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>

        {/* Low Stock Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Low Stock Products</h2>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {lowStockProducts.length} items
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</span>
                      <span className="mx-1.5 text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{product.price}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock <= 2 
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                        : 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {product.stock} left
                    </span>
                    <Link 
                      to={`/cms/products/edit/${product.id}`}
                      className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center hover:underline"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-750/50 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/cms/products/inventory"
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:underline"
            >
              Manage inventory
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
              <Link 
                to="/cms/orders"
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:underline"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/cms/orders/${order.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Inquiries</h2>
              <Link 
                to="/cms/support"
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:underline"
              >
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentCustomerMessages.map((message) => (
              <div key={message.id} className={`p-4 ${message.isRead ? '' : 'bg-indigo-50/50 dark:bg-indigo-900/10'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <span className="font-medium text-sm">{message.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {message.name}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {message.message}
                    </p>
                    <div className="mt-2 flex space-x-2">
                      <Link 
                        to={`/cms/support/${message.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 focus:outline-none"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Reply
                      </Link>
                      <Link 
                        to={`/cms/support/${message.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-750/50 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/cms/support"
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium inline-flex items-center hover:underline"
            >
              View all messages
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 