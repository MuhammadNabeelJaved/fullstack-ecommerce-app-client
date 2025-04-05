import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  CreditCard,
  ChevronDown,
  ChevronRight,
  User,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  Check,
  Plus,
  FileText,
  Star,
  StarHalf
} from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [spendingRangeFilter, setSpendingRangeFilter] = useState([0, 5000]);
  
  // Sample data
  const customers = [
    {
      id: 1,
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      registrationDate: '2022-05-15',
      orders: 12,
      totalSpent: 1245.80,
      status: 'active',
      membership: 'gold',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
      lastOrder: '2023-07-28',
      notes: 'Prefers email communication. Interested in electronics.',
      paymentMethods: ['visa', 'paypal']
    },
    {
      id: 2,
      name: 'David Thompson',
      email: 'david.thompson@example.com',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, San Francisco, CA 94101',
      registrationDate: '2022-08-21',
      orders: 5,
      totalSpent: 678.50,
      status: 'active',
      membership: 'silver',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastOrder: '2023-08-12',
      notes: 'Prefers phone calls for order issues.',
      paymentMethods: ['mastercard']
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      email: 'maria.r@example.com',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Miami, FL 33101',
      registrationDate: '2021-12-10',
      orders: 24,
      totalSpent: 3567.90,
      status: 'active',
      membership: 'platinum',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      lastOrder: '2023-08-15',
      notes: 'VIP customer, provide priority support.',
      paymentMethods: ['visa', 'apple_pay', 'paypal']
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.w@example.com',
      phone: '+1 (555) 222-3333',
      address: '101 Elm St, Chicago, IL 60601',
      registrationDate: '2023-01-05',
      orders: 1,
      totalSpent: 89.99,
      status: 'inactive',
      membership: 'bronze',
      avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
      lastOrder: '2023-01-05',
      notes: 'New customer, first purchase was made in January.',
      paymentMethods: ['visa']
    },
    {
      id: 5,
      name: 'Sophia Lee',
      email: 'sophia.lee@example.com',
      phone: '+1 (555) 777-8888',
      address: '222 Maple Ave, Seattle, WA 98101',
      registrationDate: '2022-07-18',
      orders: 9,
      totalSpent: 856.45,
      status: 'active',
      membership: 'silver',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      lastOrder: '2023-08-01',
      notes: 'Prefers eco-friendly products.',
      paymentMethods: ['mastercard', 'google_pay']
    },
    {
      id: 6,
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+1 (555) 444-5555',
      address: '333 Cedar Blvd, Austin, TX 78701',
      registrationDate: '2022-03-29',
      orders: 7,
      totalSpent: 523.75,
      status: 'active',
      membership: 'bronze',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      lastOrder: '2023-07-15',
      notes: 'Interested in discounts and promotions.',
      paymentMethods: ['paypal']
    },
    {
      id: 7,
      name: 'Olivia Garcia',
      email: 'olivia.g@example.com',
      phone: '+1 (555) 111-2222',
      address: '444 Birch St, Denver, CO 80201',
      registrationDate: '2022-10-12',
      orders: 4,
      totalSpent: 302.20,
      status: 'inactive',
      membership: 'bronze',
      avatar: 'https://randomuser.me/api/portraits/women/88.jpg',
      lastOrder: '2023-03-25',
      notes: 'Has not made a purchase in over 120 days.',
      paymentMethods: ['visa']
    },
    {
      id: 8,
      name: 'Robert Martinez',
      email: 'robert.m@example.com',
      phone: '+1 (555) 999-0000',
      address: '555 Pine St, Portland, OR 97201',
      registrationDate: '2021-09-05',
      orders: 18,
      totalSpent: 2456.30,
      status: 'active',
      membership: 'gold',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      lastOrder: '2023-08-10',
      notes: 'Frequent buyer of electronics and accessories.',
      paymentMethods: ['mastercard', 'apple_pay']
    }
  ];
  
  // Handle sort toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort customers
  let filteredCustomers = [...customers];
  
  // Apply search filter
  if (searchTerm) {
    filteredCustomers = filteredCustomers.filter(
      customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredCustomers = filteredCustomers.filter(customer => customer.status === statusFilter);
  }
  
  // Apply membership filter
  if (membershipFilter !== 'all') {
    filteredCustomers = filteredCustomers.filter(customer => customer.membership === membershipFilter);
  }
  
  // Apply spending range filter
  filteredCustomers = filteredCustomers.filter(
    customer => customer.totalSpent >= spendingRangeFilter[0] && customer.totalSpent <= spendingRangeFilter[1]
  );
  
  // Apply sorting
  filteredCustomers.sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'orders') {
      comparison = a.orders - b.orders;
    } else if (sortField === 'totalSpent') {
      comparison = a.totalSpent - b.totalSpent;
    } else if (sortField === 'registrationDate') {
      comparison = new Date(a.registrationDate) - new Date(b.registrationDate);
    } else if (sortField === 'lastOrder') {
      comparison = new Date(a.lastOrder) - new Date(b.lastOrder);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get membership details
  const getMembershipDetails = (membership) => {
    switch (membership) {
      case 'platinum':
        return {
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
          label: 'Platinum',
          stars: 3
        };
      case 'gold':
        return {
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
          label: 'Gold',
          stars: 2
        };
      case 'silver':
        return {
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400',
          label: 'Silver',
          stars: 1
        };
      default:
        return {
          color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
          label: 'Bronze',
          stars: 0.5
        };
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
  };
  
  // Handle selecting a customer
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view customer information</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Split View - Customers List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Customers List */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
                  placeholder="Search customers..."
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
              </div>
            </div>
            
            {/* Filters Panel */}
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                {/* Membership Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Membership
                  </label>
                  <select
                    value={membershipFilter}
                    onChange={(e) => setMembershipFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Memberships</option>
                    <option value="platinum">Platinum</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>
                
                {/* Spending Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Spent (${spendingRangeFilter[0]} - ${spendingRangeFilter[1]})
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={spendingRangeFilter[0]}
                      onChange={(e) => setSpendingRangeFilter([parseInt(e.target.value), spendingRangeFilter[1]])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">to</span>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={spendingRangeFilter[1]}
                      onChange={(e) => setSpendingRangeFilter([spendingRangeFilter[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('name')}>
                      Customer
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('orders')}>
                      Orders
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('totalSpent')}>
                      Total Spent
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('lastOrder')}>
                      Last Order
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr 
                      key={customer.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                        selectedCustomer && selectedCustomer.id === customer.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                      }`}
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={customer.avatar} 
                              alt={customer.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status === 'active' ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : null}
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(customer.lastOrder)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectCustomer(customer);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Right Panel - Customer Details */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {selectedCustomer ? (
            <div className="h-full flex flex-col">
              {/* Customer Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedCustomer.avatar} 
                    alt={selectedCustomer.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedCustomer.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                        {selectedCustomer.status === 'active' ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : null}
                        {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                      </span>
                      
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipDetails(selectedCustomer.membership).color}`}>
                        {getMembershipDetails(selectedCustomer.membership).label}
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap -mx-2">
                  <div className="px-2 w-full sm:w-1/2 lg:w-full xl:w-1/2 mb-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {selectedCustomer.email}
                    </div>
                  </div>
                  <div className="px-2 w-full sm:w-1/2 lg:w-full xl:w-1/2 mb-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {selectedCustomer.phone}
                    </div>
                  </div>
                  <div className="px-2 w-full sm:w-1/2 lg:w-full xl:w-1/2 mb-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {selectedCustomer.address}
                    </div>
                  </div>
                  <div className="px-2 w-full sm:w-1/2 lg:w-full xl:w-1/2 mb-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      Customer since {formatDate(selectedCustomer.registrationDate)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customer Stats */}
              <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                  <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Total Orders</div>
                  <div className="flex items-center">
                    <ShoppingBag className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCustomer.orders}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                  <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Total Spent</div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(selectedCustomer.totalSpent)}</span>
                  </div>
                </div>
              </div>
              
              {/* Membership Details */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Membership Status</h3>
                <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getMembershipDetails(selectedCustomer.membership).color}`}>
                        {getMembershipDetails(selectedCustomer.membership).stars >= 3 ? (
                          <Star className="h-5 w-5" />
                        ) : getMembershipDetails(selectedCustomer.membership).stars >= 2 ? (
                          <Star className="h-5 w-5" />
                        ) : getMembershipDetails(selectedCustomer.membership).stars >= 1 ? (
                          <Star className="h-5 w-5" />
                        ) : (
                          <StarHalf className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {getMembershipDetails(selectedCustomer.membership).label} Member
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedCustomer.membership === 'platinum' 
                            ? 'Premium benefits & priority support'
                            : selectedCustomer.membership === 'gold'
                              ? 'Exclusive offers & fast shipping'
                              : selectedCustomer.membership === 'silver'
                                ? 'Special discounts'
                                : 'Standard benefits'}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(Math.floor(getMembershipDetails(selectedCustomer.membership).stars))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500" />
                      ))}
                      {getMembershipDetails(selectedCustomer.membership).stars % 1 !== 0 && (
                        <StarHalf className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedCustomer.membership === 'bronze' 
                      ? `Spend ${formatCurrency(500 - selectedCustomer.totalSpent)} more to reach Silver status`
                      : selectedCustomer.membership === 'silver'
                        ? `Spend ${formatCurrency(1000 - selectedCustomer.totalSpent)} more to reach Gold status`
                        : selectedCustomer.membership === 'gold'
                          ? `Spend ${formatCurrency(2500 - selectedCustomer.totalSpent)} more to reach Platinum status`
                          : 'Maximum membership level reached'}
                  </div>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Notes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-750 p-3 rounded-md">
                  {selectedCustomer.notes || 'No notes available for this customer.'}
                </p>
                
                <div className="mt-6 flex space-x-2">
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Order History
                  </button>
                  <button
                    onClick={() => {}}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Customer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 h-full text-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 mb-4">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No customer selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Select a customer from the list to view details and manage their information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers; 