import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  Truck,
  Package,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  FileText,
  Send
} from 'lucide-react';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4" /> },
    { value: 'processing', label: 'Processing', icon: <Package className="h-4 w-4" /> },
    { value: 'shipped', label: 'Shipped', icon: <Truck className="h-4 w-4" /> },
    { value: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="h-4 w-4" /> },
    { value: 'cancelled', label: 'Cancelled', icon: <XCircle className="h-4 w-4" /> },
  ];
  
  const dateFilters = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' },
  ];
  
  const orders = [
    {
      id: 'ORD-7352',
      customer: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      date: '2024-03-18 10:45 AM',
      total: 156.00,
      status: 'pending',
      paymentMethod: 'Credit Card',
      items: [
        { id: 1, name: 'Wireless Headphones', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
        { id: 2, name: 'Phone Case', price: 24.99, quantity: 1, image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100' }
      ],
      shippingAddress: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      }
    },
    {
      id: 'ORD-7351',
      customer: {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      date: '2024-03-18 09:12 AM',
      total: 249.99,
      status: 'processing',
      paymentMethod: 'PayPal',
      items: [
        { id: 2, name: 'Smart Watch Series 5', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100' }
      ],
      shippingAddress: {
        street: '456 Park Avenue',
        city: 'Boston',
        state: 'MA',
        zip: '02108',
        country: 'USA'
      }
    },
    {
      id: 'ORD-7350',
      customer: {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      date: '2024-03-17 03:22 PM',
      total: 89.99,
      status: 'shipped',
      paymentMethod: 'Credit Card',
      items: [
        { id: 3, name: 'Bluetooth Speaker', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=100' },
        { id: 4, name: 'USB-C Cable', price: 9.99, quantity: 1, image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=100' }
      ],
      tracking: {
        number: 'TRK123456789',
        carrier: 'FedEx',
        estimatedDelivery: '2024-03-20'
      },
      shippingAddress: {
        street: '789 Elm Street',
        city: 'Chicago',
        state: 'IL',
        zip: '60007',
        country: 'USA'
      }
    },
    {
      id: 'ORD-7349',
      customer: {
        name: 'Sophia Davis',
        email: 'sophia.davis@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      date: '2024-03-17 09:45 AM',
      total: 345.00,
      status: 'delivered',
      paymentMethod: 'Credit Card',
      items: [
        { id: 5, name: 'Laptop Backpack', price: 49.99, quantity: 1, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=100' },
        { id: 6, name: 'Ultra HD Monitor 27"', price: 295.00, quantity: 1, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100' }
      ],
      tracking: {
        number: 'TRK987654321',
        carrier: 'UPS',
        deliveredDate: '2024-03-18 12:30 PM'
      },
      shippingAddress: {
        street: '321 Oak Drive',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        country: 'USA'
      }
    },
    {
      id: 'ORD-7348',
      customer: {
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      },
      date: '2024-03-16 06:18 PM',
      total: 59.99,
      status: 'cancelled',
      paymentMethod: 'Credit Card',
      items: [
        { id: 7, name: 'Wireless Charging Pad', price: 35.99, quantity: 1, image: 'https://images.unsplash.com/photo-1608751819407-8c8672b7878b?w=100' },
        { id: 8, name: 'Phone Screen Protector', price: 12.00, quantity: 2, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100' }
      ],
      cancellationReason: 'Customer requested cancellation',
      shippingAddress: {
        street: '555 Maple Lane',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        country: 'USA'
      }
    }
  ];
  
  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter orders
  let filteredOrders = [...orders];
  
  // Apply search filter
  if (searchTerm) {
    filteredOrders = filteredOrders.filter(
      order => order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
             order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter
  if (selectedStatus !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
  }
  
  // Apply sorting
  filteredOrders.sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortField === 'total') {
      comparison = a.total - b.total;
    } else if (sortField === 'id') {
      comparison = a.id.localeCompare(b.id);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30';
      case 'shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/30';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/30';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800/30';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'processing':
        return <Package className="w-4 h-4 mr-1" />;
      case 'shipped':
        return <Truck className="w-4 h-4 mr-1" />;
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return <AlertCircle className="w-4 h-4 mr-1" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and process customer orders</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today's Orders
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4">
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
                placeholder="Search by order ID, customer name or email..."
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filters panel */}
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedStatus(option.value)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                        selectedStatus === option.value
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'
                      }`}
                    >
                      {option.icon && <span className="mr-1.5">{option.icon}</span>}
                      {option.label}
                      {selectedStatus === option.value && (
                        <span className="ml-1.5 text-xs bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-300 rounded-full px-1.5">
                          {filteredOrders.filter(o => option.value === 'all' ? true : o.status === option.value).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Orders List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    Order ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center">
                    Total
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${expandedOrder === order.id ? 'bg-gray-50 dark:bg-gray-750' : ''}`}
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <img className="h-8 w-8 rounded-full" src={order.customer.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{order.customer.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <Link to={`/cms/orders/${order.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Show dropdown menu
                          }}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded order details */}
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50 dark:bg-gray-750">
                      <td colSpan="6" className="px-6 py-4">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Order Items */}
                            <div className="md:col-span-2 space-y-4">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Order Items</h3>
                              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                  {order.items.map((item) => (
                                    <li key={item.id} className="p-3 flex items-center">
                                      <div className="h-12 w-12 flex-shrink-0 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <img className="h-full w-full object-cover" src={item.image} alt="" />
                                      </div>
                                      <div className="ml-4 flex-1">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                          ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            {/* Order Details */}
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Order Details</h3>
                              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 space-y-3">
                                <div>
                                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Shipping Address</div>
                                  <div className="text-sm text-gray-900 dark:text-white mt-1">
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                                    {order.shippingAddress.country}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Payment Method</div>
                                  <div className="text-sm text-gray-900 dark:text-white mt-1">{order.paymentMethod}</div>
                                </div>
                                
                                {order.tracking && (
                                  <div>
                                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Tracking Information</div>
                                    <div className="text-sm text-gray-900 dark:text-white mt-1">
                                      {order.tracking.carrier}: {order.tracking.number}<br />
                                      {order.tracking.estimatedDelivery && (
                                        <span>Est. Delivery: {order.tracking.estimatedDelivery}</span>
                                      )}
                                      {order.tracking.deliveredDate && (
                                        <span>Delivered: {order.tracking.deliveredDate}</span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                
                                {order.cancellationReason && (
                                  <div>
                                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Cancellation Reason</div>
                                    <div className="text-sm text-red-600 dark:text-red-400 mt-1">{order.cancellationReason}</div>
                                  </div>
                                )}
                                
                                <div className="pt-2 flex space-x-2">
                                  <Link 
                                    to={`/cms/orders/${order.id}`}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <FileText className="h-3 w-3 mr-1" />
                                    Details
                                  </Link>
                                  <button
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    <Send className="h-3 w-3 mr-1" />
                                    Email Customer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                <span className="font-medium">{filteredOrders.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders; 