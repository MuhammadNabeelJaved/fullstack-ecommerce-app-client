import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  ArrowRight,
  ChevronDown,
  RefreshCcw
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('last30Days');
  const [isLoading, setIsLoading] = useState(false);
  
  // Sample data
  const salesData = {
    total: 256489.99,
    trend: 0.24,
    previous: 206612.50
  };
  
  const ordersData = {
    total: 1254,
    trend: 0.12,
    previous: 1120
  };
  
  const customersData = {
    total: 856,
    trend: -0.08,
    previous: 930
  };
  
  const conversionData = {
    total: 3.6,
    trend: 0.4,
    previous: 2.6
  };
  
  const topProducts = [
    { id: 1, name: "Premium Noise-Cancelling Headphones", sales: 124, revenue: 24800 },
    { id: 2, name: "Wireless Ergonomic Keyboard", sales: 98, revenue: 9800 },
    { id: 3, name: "Ultra HD Smart TV 55\"", sales: 56, revenue: 53200 },
    { id: 4, name: "Professional Digital Camera", sales: 45, revenue: 31500 },
    { id: 5, name: "Portable Bluetooth Speaker", sales: 112, revenue: 8960 }
  ];
  
  const recentOrders = [
    { id: "ORD-9385", customer: "John Smith", date: "2023-09-22", total: 599.95, status: "completed" },
    { id: "ORD-9384", customer: "Emma Johnson", date: "2023-09-22", total: 129.99, status: "processing" },
    { id: "ORD-9383", customer: "Michael Brown", date: "2023-09-21", total: 849.50, status: "completed" },
    { id: "ORD-9382", customer: "Sarah Williams", date: "2023-09-21", total: 45.99, status: "shipped" },
    { id: "ORD-9381", customer: "David Miller", date: "2023-09-20", total: 239.99, status: "completed" }
  ];
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get trend elements
  const getTrendIndicator = (trend) => {
    const isPositive = trend >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive 
      ? 'text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900/30' 
      : 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    
    return (
      <div className={`flex items-center px-2 py-1 rounded-full ${colorClass}`}>
        <Icon className="w-3 h-3 mr-1" />
        <span>{Math.abs(trend * 100).toFixed(1)}%</span>
      </div>
    );
  };
  
  // Handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  // Select time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'today':
        return 'Today';
      case 'yesterday':
        return 'Yesterday';
      case 'last7Days':
        return 'Last 7 Days';
      case 'last30Days':
        return 'Last 30 Days';
      case 'thisMonth':
        return 'This Month';
      case 'lastMonth':
        return 'Last Month';
      case 'thisYear':
        return 'This Year';
      default:
        return 'Custom Range';
    }
  };
  
  // Order status badge
  const getOrderStatusBadge = (status) => {
    let colorClass = '';
    
    switch (status) {
      case 'completed':
        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        break;
      case 'processing':
        colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        break;
      case 'shipped':
        colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
        break;
      case 'cancelled':
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monitor your store performance and sales</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none pl-3 pr-9 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:text-white"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisYear">This Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleRefreshData}
            disabled={isLoading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Sales</h3>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(salesData.total)}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">vs {getTimeRangeLabel()} {formatCurrency(salesData.previous)}</div>
            {getTrendIndicator(salesData.trend)}
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <ShoppingBag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {ordersData.total.toLocaleString()}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">vs {getTimeRangeLabel()} {ordersData.previous.toLocaleString()}</div>
            {getTrendIndicator(ordersData.trend)}
          </div>
        </div>
        
        {/* New Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">New Customers</h3>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {customersData.total.toLocaleString()}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">vs {getTimeRangeLabel()} {customersData.previous.toLocaleString()}</div>
            {getTrendIndicator(customersData.trend)}
          </div>
        </div>
        
        {/* Conversion Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Conversion Rate</h3>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {conversionData.total.toFixed(1)}%
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500 dark:text-gray-400">vs {getTimeRangeLabel()} {conversionData.previous.toFixed(1)}%</div>
            {getTrendIndicator(conversionData.trend)}
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sales Over Time</h3>
          </div>
          <div className="p-5 flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <LineChart className="w-10 h-10 mb-2" />
              <p className="text-sm">Sales chart would be rendered here</p>
              <p className="text-xs mt-1">Using a chart library like Chart.js or Recharts</p>
            </div>
          </div>
        </div>
        
        {/* Sales by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sales by Category</h3>
          </div>
          <div className="p-5 flex items-center justify-center h-64">
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <PieChart className="w-10 h-10 mb-2" />
              <p className="text-sm">Category chart would be rendered here</p>
              <p className="text-xs mt-1">Using a chart library like Chart.js or Recharts</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Selling Products</h3>
            <Link to="/cms/products" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{product.sales} units</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(product.revenue)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h3>
            <Link to="/cms/orders" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatCurrency(order.total)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getOrderStatusBadge(order.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 