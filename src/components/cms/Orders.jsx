import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  ChevronRight,
  Download,
  Printer
} from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Sample data
  const sampleOrders = [
    {
      id: 'ORD-9385',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        address: '123 Main St, Anytown, CA 94566'
      },
      date: '2023-09-22T08:40:51.620Z',
      items: [
        { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1 },
        { id: 2, name: 'USB-C Cable', price: 19.99, quantity: 2 }
      ],
      total: 239.97,
      status: 'processing',
      paymentMethod: 'credit_card',
      shippingMethod: 'express'
    },
    {
      id: 'ORD-9384',
      customer: {
        name: 'Emma Johnson',
        email: 'emma@example.com',
        address: '456 Oak Ave, Springfield, IL 62701'
      },
      date: '2023-09-22T07:15:22.120Z',
      items: [
        { id: 3, name: 'Smartphone Case', price: 29.99, quantity: 1 }
      ],
      total: 29.99,
      status: 'delivered',
      paymentMethod: 'paypal',
      shippingMethod: 'standard'
    },
    {
      id: 'ORD-9383',
      customer: {
        name: 'Michael Brown',
        email: 'michael@example.com',
        address: '789 Pine Rd, Westfield, NJ 07090'
      },
      date: '2023-09-21T14:30:11.830Z',
      items: [
        { id: 4, name: 'Smart Watch', price: 299.99, quantity: 1 },
        { id: 5, name: 'Wireless Charger', price: 49.99, quantity: 1 },
        { id: 6, name: 'Screen Protector', price: 14.99, quantity: 2 }
      ],
      total: 379.96,
      status: 'shipped',
      paymentMethod: 'credit_card',
      shippingMethod: 'standard'
    },
    {
      id: 'ORD-9382',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        address: '101 Cedar St, Portland, OR 97205'
      },
      date: '2023-09-21T09:22:45.330Z',
      items: [
        { id: 7, name: 'Bluetooth Speaker', price: 89.99, quantity: 1 }
      ],
      total: 89.99,
      status: 'delivered',
      paymentMethod: 'paypal',
      shippingMethod: 'standard'
    },
    {
      id: 'ORD-9381',
      customer: {
        name: 'David Miller',
        email: 'david@example.com',
        address: '222 Elm St, Austin, TX 78701'
      },
      date: '2023-09-20T16:45:33.220Z',
      items: [
        { id: 8, name: 'Wireless Keyboard', price: 129.99, quantity: 1 },
        { id: 9, name: 'Mouse Pad', price: 19.99, quantity: 1 }
      ],
      total: 149.98,
      status: 'processing',
      paymentMethod: 'credit_card',
      shippingMethod: 'express'
    },
    {
      id: 'ORD-9380',
      customer: {
        name: 'Jennifer Davis',
        email: 'jennifer@example.com',
        address: '333 Maple Dr, Chicago, IL 60611'
      },
      date: '2023-09-19T11:10:09.910Z',
      items: [
        { id: 10, name: 'External Hard Drive', price: 149.99, quantity: 1 }
      ],
      total: 149.99,
      status: 'cancelled',
      paymentMethod: 'credit_card',
      shippingMethod: 'standard'
    },
    {
      id: 'ORD-9379',
      customer: {
        name: 'Robert Wilson',
        email: 'robert@example.com',
        address: '444 Birch Ln, Seattle, WA 98101'
      },
      date: '2023-09-18T13:25:47.720Z',
      items: [
        { id: 11, name: 'Gaming Mouse', price: 79.99, quantity: 1 },
        { id: 12, name: 'Gaming Keyboard', price: 129.99, quantity: 1 }
      ],
      total: 209.98,
      status: 'delivered',
      paymentMethod: 'paypal',
      shippingMethod: 'express'
    },
    {
      id: 'ORD-9378',
      customer: {
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        address: '555 Spruce Ct, Denver, CO 80202'
      },
      date: '2023-09-17T09:50:33.550Z',
      items: [
        { id: 13, name: 'Laptop Sleeve', price: 39.99, quantity: 1 },
        { id: 14, name: 'USB Hub', price: 29.99, quantity: 1 }
      ],
      total: 69.98,
      status: 'pending',
      paymentMethod: 'credit_card',
      shippingMethod: 'standard'
    }
  ];
  
  // Load orders
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 500);
  }, []);
  
  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    let bgColor = '';
    
    switch (status) {
      case 'pending':
        bgColor = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        break;
      case 'processing':
        bgColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        break;
      case 'shipped':
        bgColor = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
        break;
      case 'delivered':
        bgColor = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        break;
      case 'cancelled':
        bgColor = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm && !(
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'customer':
        comparison = a.customer.name.localeCompare(b.customer.name);
        break;
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'total':
        comparison = a.total - b.total;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and track customer orders</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              placeholder="Search orders..."
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Status Filter Buttons */}
            <div className="hidden lg:flex gap-2">
              {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none ${
                    status === statusFilter
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-500'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650'
                  }`}
                >
                  {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Order Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time Period
                </label>
                <select
                  className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
                >
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>This month</option>
                  <option>Last month</option>
                  <option>Custom range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
                >
                  <option>All methods</option>
                  <option>Credit Card</option>
                  <option>PayPal</option>
                  <option>Bank Transfer</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-indigo-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading orders...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center cursor-pointer">
                      Order
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    onClick={() => handleSort('customer')}
                  >
                    <div className="flex items-center cursor-pointer">
                      Customer
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    onClick={() => handleSort('date')}
                  >
                    <div className="flex items-center cursor-pointer">
                      Date
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    onClick={() => handleSort('total')}
                  >
                    <div className="flex items-center cursor-pointer">
                      Total
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  sortedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{order.id}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{order.items.length} item(s)</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{order.customer.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{order.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(order.total)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{order.paymentMethod.replace('_', ' ')}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/cms/orders/${order.id}`}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 flex items-center justify-end"
                        >
                          View
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 