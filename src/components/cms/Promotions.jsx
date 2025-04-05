import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  Tag,
  Percent,
  Clock,
  Calendar,
  Gift,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Users,
  ShoppingBag,
  AlertTriangle,
  Zap,
  Eye
} from 'lucide-react';

const Promotions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Sample data
  const promotions = [
    {
      id: 1,
      code: 'SUMMER25',
      title: 'Summer Sale - 25% Off',
      description: 'Get 25% off on all summer items. Limited time offer!',
      type: 'percentage',
      value: 25,
      minPurchase: 50,
      maxDiscount: 100,
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: 'active',
      usageLimit: 1000,
      usageCount: 450,
      applicableProducts: ['all'],
      excludedProducts: ['clearance'],
      eligibleCustomers: 'all',
      createdBy: 'Admin',
      createdAt: '2023-05-15',
      isHighlighted: true
    },
    {
      id: 2,
      code: 'WELCOME10',
      title: 'New Customer Discount',
      description: '$10 off on your first order.',
      type: 'fixed',
      value: 10,
      minPurchase: 20,
      maxDiscount: 10,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'active',
      usageLimit: 0, // unlimited
      usageCount: 1250,
      applicableProducts: ['all'],
      excludedProducts: [],
      eligibleCustomers: 'new',
      createdBy: 'Admin',
      createdAt: '2022-12-20',
      isHighlighted: false
    },
    {
      id: 3,
      code: 'FREESHIP50',
      title: 'Free Shipping on Orders Over $50',
      description: 'Free standard shipping on all orders over $50.',
      type: 'shipping',
      value: 100,
      minPurchase: 50,
      maxDiscount: null,
      startDate: '2023-05-15',
      endDate: '2023-12-31',
      status: 'active',
      usageLimit: 0, // unlimited
      usageCount: 875,
      applicableProducts: ['all'],
      excludedProducts: [],
      eligibleCustomers: 'all',
      createdBy: 'Admin',
      createdAt: '2023-05-10',
      isHighlighted: false
    },
    {
      id: 4,
      code: 'BOGO50',
      title: 'Buy One Get One 50% Off',
      description: 'Buy one product and get another 50% off. Applies to items of equal or lesser value.',
      type: 'bogo',
      value: 50,
      minPurchase: 0,
      maxDiscount: null,
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      status: 'expired',
      usageLimit: 500,
      usageCount: 432,
      applicableProducts: ['clothing'],
      excludedProducts: ['clearance', 'accessories'],
      eligibleCustomers: 'all',
      createdBy: 'Admin',
      createdAt: '2023-06-20',
      isHighlighted: false
    },
    {
      id: 5,
      code: 'VIP20',
      title: 'VIP Customer Discount',
      description: '20% off for VIP customers. Exclusive offer for our most loyal customers.',
      type: 'percentage',
      value: 20,
      minPurchase: 0,
      maxDiscount: 100,
      startDate: '2023-06-15',
      endDate: '2023-12-31',
      status: 'active',
      usageLimit: 0, // unlimited
      usageCount: 210,
      applicableProducts: ['all'],
      excludedProducts: ['clearance'],
      eligibleCustomers: 'vip',
      createdBy: 'Admin',
      createdAt: '2023-06-10',
      isHighlighted: true
    },
    {
      id: 6,
      code: 'FLASH30',
      title: 'Flash Sale - 30% Off',
      description: '30% off on selected electronics. Flash sale for 48 hours only!',
      type: 'percentage',
      value: 30,
      minPurchase: 100,
      maxDiscount: 150,
      startDate: '2023-09-01',
      endDate: '2023-09-02',
      status: 'scheduled',
      usageLimit: 500,
      usageCount: 0,
      applicableProducts: ['electronics'],
      excludedProducts: [],
      eligibleCustomers: 'all',
      createdBy: 'Admin',
      createdAt: '2023-08-15',
      isHighlighted: true
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
  
  // Filter and sort promotions
  let filteredPromotions = [...promotions];
  
  // Apply search filter
  if (searchTerm) {
    filteredPromotions = filteredPromotions.filter(
      promo => 
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredPromotions = filteredPromotions.filter(promo => promo.status === statusFilter);
  }
  
  // Apply type filter
  if (typeFilter !== 'all') {
    filteredPromotions = filteredPromotions.filter(promo => promo.type === typeFilter);
  }
  
  // Apply sorting
  filteredPromotions.sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'code') {
      comparison = a.code.localeCompare(b.code);
    } else if (sortField === 'title') {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === 'value') {
      comparison = a.value - b.value;
    } else if (sortField === 'startDate') {
      comparison = new Date(a.startDate) - new Date(b.startDate);
    } else if (sortField === 'endDate') {
      comparison = new Date(a.endDate) - new Date(b.endDate);
    } else if (sortField === 'usageCount') {
      comparison = a.usageCount - b.usageCount;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get promotion status UI elements
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'expired':
        return <XCircle className="h-4 w-4 mr-1" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  // Get promotion type UI elements
  const getTypeIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-4 w-4 mr-1" />;
      case 'fixed':
        return <Tag className="h-4 w-4 mr-1" />;
      case 'shipping':
        return <ShoppingBag className="h-4 w-4 mr-1" />;
      case 'bogo':
        return <Gift className="h-4 w-4 mr-1" />;
      default:
        return <Tag className="h-4 w-4 mr-1" />;
    }
  };
  
  // Format discount value
  const formatDiscount = (promotion) => {
    switch (promotion.type) {
      case 'percentage':
        return `${promotion.value}% off`;
      case 'fixed':
        return `$${promotion.value} off`;
      case 'shipping':
        return `Free shipping`;
      case 'bogo':
        return `Buy one, get one ${promotion.value}% off`;
      default:
        return `$${promotion.value} off`;
    }
  };
  
  // Handle selecting a promotion
  const handleSelectOffer = (promotion) => {
    setSelectedOffer(promotion);
  };
  
  // Calculate promotion status
  const calculateStatus = (promotion) => {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    
    if (now < startDate) {
      return 'scheduled';
    } else if (now > endDate) {
      return 'expired';
    } else {
      return 'active';
    }
  };
  
  // Check if promotion is about to expire (within 7 days)
  const isAboutToExpire = (promotion) => {
    if (promotion.status === 'expired') return false;
    
    const now = new Date();
    const endDate = new Date(promotion.endDate);
    const daysUntilExpiry = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Offers & Promotions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage discounts and special offers</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Promotion
          </button>
        </div>
      </div>
      
      {/* Split View - Promotions List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Promotions List */}
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
                  placeholder="Search promotions..."
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
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4"
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
                    <option value="scheduled">Scheduled</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="shipping">Free Shipping</option>
                    <option value="bogo">Buy One Get One</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Promotions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('code')}>
                      Code
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('title')}>
                      Promotion
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort('endDate')}>
                      Expiry
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPromotions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      No promotions found.
                    </td>
                  </tr>
                ) : (
                  filteredPromotions.map((promotion) => (
                    <tr 
                      key={promotion.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                        selectedOffer && selectedOffer.id === promotion.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                      }`}
                      onClick={() => handleSelectOffer(promotion)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {promotion.code}
                          </span>
                          {promotion.isHighlighted && (
                            <span className="ml-2 flex-shrink-0 inline-block px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{promotion.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{promotion.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                          {getTypeIcon(promotion.type)}
                          {formatDiscount(promotion)}
                        </span>
                        {promotion.minPurchase > 0 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Min. order: ${promotion.minPurchase}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                          {getStatusIcon(promotion.status)}
                          {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {promotion.status === 'scheduled' ? (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                              Starts {formatDate(promotion.startDate)}
                            </div>
                          ) : isAboutToExpire(promotion) ? (
                            <div className="flex items-center text-amber-600 dark:text-amber-400">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Expires in {Math.ceil((new Date(promotion.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {promotion.status === 'expired' ? 'Ended' : 'Ends'} {formatDate(promotion.endDate)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle copy
                              navigator.clipboard.writeText(promotion.code);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                            title="Copy code"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOffer(promotion);
                            }}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit
                            }}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                            title="Edit promotion"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            title="Delete promotion"
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
        
        {/* Right Panel - Promotion Details */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {selectedOffer ? (
            <div className="h-full flex flex-col">
              {/* Promotion Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOffer.status)}`}>
                      {getStatusIcon(selectedOffer.status)}
                      {selectedOffer.status.charAt(0).toUpperCase() + selectedOffer.status.slice(1)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {}}
                        className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                        title="Edit promotion"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {}}
                        className="inline-flex items-center p-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                        title="Delete promotion"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedOffer.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {selectedOffer.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
                      <code className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{selectedOffer.code}</code>
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedOffer.code)}
                        className="ml-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center px-3 py-2 font-medium text-sm rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400">
                      {getTypeIcon(selectedOffer.type)}
                      {formatDiscount(selectedOffer)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Promotion Details */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Valid From</div>
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {formatDate(selectedOffer.startDate)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Expires On</div>
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                      {formatDate(selectedOffer.endDate)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Usage & Limits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                      <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Total Usage</div>
                      <div className="flex items-center">
                        <Tag className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{selectedOffer.usageCount}</span>
                        {selectedOffer.usageLimit > 0 && (
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400"> / {selectedOffer.usageLimit}</span>
                        )}
                      </div>
                      {selectedOffer.usageLimit > 0 && (
                        <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full" 
                            style={{ width: `${Math.min(100, (selectedOffer.usageCount / selectedOffer.usageLimit) * 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4">
                      <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 mb-1">Minimum Purchase</div>
                      <div className="flex items-center">
                        <ShoppingBag className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${selectedOffer.minPurchase}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Eligibility</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Customer Eligibility</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedOffer.eligibleCustomers === 'all'
                            ? 'Available to all customers'
                            : selectedOffer.eligibleCustomers === 'new'
                              ? 'New customers only'
                              : selectedOffer.eligibleCustomers === 'vip'
                                ? 'VIP customers only'
                                : 'Custom customer group'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Applicable Products</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedOffer.applicableProducts.includes('all')
                            ? 'All products'
                            : selectedOffer.applicableProducts.join(', ')}
                          {selectedOffer.excludedProducts.length > 0 && 
                            ` (excluding ${selectedOffer.excludedProducts.join(', ')})`}
                        </div>
                      </div>
                    </div>
                    {selectedOffer.maxDiscount && (
                      <div className="flex items-start">
                        <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Maximum Discount</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Up to ${selectedOffer.maxDiscount} discount per order
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Created by {selectedOffer.createdBy} on {formatDate(selectedOffer.createdAt)}
                    </div>
                    <div className="flex space-x-2">
                      {/* Action buttons can go here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 h-full text-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 mb-4">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No promotion selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                Select a promotion from the list to view details and manage it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotions; 