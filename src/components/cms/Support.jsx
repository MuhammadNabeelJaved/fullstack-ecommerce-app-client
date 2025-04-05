import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserCircle,
  Calendar,
  Download,
  ChevronDown,
  ArrowUpDown,
  Tag,
  Package,
  RefreshCw,

} from 'lucide-react';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Sample data
  const supportQueries = [
    {
      id: 'TKT-1001',
      customer: {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
      },
      subject: 'Order delivery delay',
      message: "I haven't received my order #ORD-7829 yet and it's been 5 days. The estimated delivery was supposed to be yesterday. Can you check the status?",
      date: '2023-08-15T14:30:00',
      status: 'pending',
      type: 'order',
      priority: 'high',
      assignedTo: 'John Doe',
      responses: [
        {
          from: 'system',
          message: 'Ticket created and assigned to support team',
          date: '2023-08-15T14:30:00'
        }
      ]
    },
    {
      id: 'TKT-1002',
      customer: {
        name: 'David Thompson',
        email: 'david.thompson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      subject: 'Product compatibility question',
      message: 'Is the Smart Watch Series 5 compatible with Android phones? The product description doesn\'t clearly specify this.',
      date: '2023-08-14T09:15:00',
      status: 'active',
      type: 'product',
      priority: 'medium',
      assignedTo: 'Sarah Johnson',
      responses: [
        {
          from: 'system',
          message: 'Ticket created and assigned to product team',
          date: '2023-08-14T09:15:00'
        },
        {
          from: 'Sarah Johnson',
          message: 'Hello David, thank you for your question. Yes, the Smart Watch Series 5 is compatible with all Android phones running Android 7.0 or newer. Let me know if you have any other questions!',
          date: '2023-08-14T10:22:00'
        }
      ]
    },
    {
      id: 'TKT-1003',
      customer: {
        name: 'Maria Rodriguez',
        email: 'maria.r@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      subject: 'Refund request',
      message: 'I want to return my purchase of the Bluetooth Headphones. They don\'t fit comfortably as described. I\'ve only used them once. How do I initiate a return?',
      date: '2023-08-13T16:45:00',
      status: 'resolved',
      type: 'refund',
      priority: 'high',
      assignedTo: 'Alex Chen',
      responses: [
        {
          from: 'system',
          message: 'Ticket created and assigned to returns team',
          date: '2023-08-13T16:45:00'
        },
        {
          from: 'Alex Chen',
          message: 'Hi Maria, I\'m sorry to hear the headphones didn\'t meet your expectations. I\'ve sent you an email with return instructions and a prepaid shipping label. Once we receive the item, we\'ll process your refund within 3-5 business days.',
          date: '2023-08-13T17:30:00'
        },
        {
          from: 'Maria Rodriguez',
          message: 'Thank you for the quick response! I\'ve received the email and will ship the item tomorrow.',
          date: '2023-08-13T18:10:00'
        },
        {
          from: 'Alex Chen',
          message: 'You\'re welcome! Let me know if you need any further assistance.',
          date: '2023-08-13T18:15:00'
        },
        {
          from: 'system',
          message: 'Ticket marked as resolved by Alex Chen',
          date: '2023-08-13T18:20:00'
        }
      ]
    },
    {
      id: 'TKT-1004',
      customer: {
        name: 'James Wilson',
        email: 'james.w@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/79.jpg'
      },
      subject: 'Website login issues',
      message: 'I\'m trying to log in to my account but keep getting an "invalid credentials" error even though I\'m sure my password is correct. I\'ve tried resetting it twice now.',
      date: '2023-08-14T11:20:00',
      status: 'active',
      type: 'technical',
      priority: 'medium',
      assignedTo: 'Tech Support',
      responses: [
        {
          from: 'system',
          message: 'Ticket created and assigned to technical team',
          date: '2023-08-14T11:20:00'
        },
        {
          from: 'Tech Support',
          message: 'Hello James, I\'ve checked your account and it appears there might be a caching issue. Could you please try clearing your browser cookies and cache, then attempt to log in again? If that doesn\'t work, please let us know and we\'ll investigate further.',
          date: '2023-08-14T11:45:00'
        }
      ]
    },
    {
      id: 'TKT-1005',
      customer: {
        name: 'Sophia Lee',
        email: 'sophia.lee@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
      },
      subject: 'Product damaged during shipping',
      message: 'I received my Ultra HD Monitor today but the screen is cracked. The packaging looked intact so it must have been damaged before shipping. I\'d like a replacement.',
      date: '2023-08-15T10:05:00',
      status: 'pending',
      type: 'order',
      priority: 'high',
      assignedTo: 'John Doe',
      responses: [
        {
          from: 'system',
          message: 'Ticket created and assigned to support team',
          date: '2023-08-15T10:05:00'
        }
      ]
    }
  ];
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Filter and sort the support queries
  let filteredQueries = [...supportQueries];
  
  // Apply search filter
  if (searchTerm) {
    filteredQueries = filteredQueries.filter(
      query => 
        query.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Apply status filter
  if (statusFilter !== 'all') {
    filteredQueries = filteredQueries.filter(query => query.status === statusFilter);
  }
  
  // Apply type filter
  if (typeFilter !== 'all') {
    filteredQueries = filteredQueries.filter(query => query.type === typeFilter);
  }
  
  // Apply sorting
  filteredQueries.sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortField === 'priority') {
      const priorityRank = { high: 3, medium: 2, low: 1 };
      comparison = priorityRank[a.priority] - priorityRank[b.priority];
    } else if (sortField === 'status') {
      const statusRank = { pending: 3, active: 2, resolved: 1 };
      comparison = statusRank[a.status] - statusRank[b.status];
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Get ticket status UI elements
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'active':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  // Get ticket type UI elements
  const getTypeIcon = (type) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4 mr-1" />;
      case 'product':
        return <Tag className="h-4 w-4 mr-1" />;
      case 'refund':
        return <RefreshCw className="h-4 w-4 mr-1" />;
      case 'technical':
        return <Tool className="h-4 w-4 mr-1" />;
      default:
        return <MessageSquare className="h-4 w-4 mr-1" />;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return formatDate(dateString);
    }
  };
  
  // Select a ticket to view details
  const handleSelectTicket = (ticket) => {
    setSelectedSupport(ticket);
  };
  
  // Add a response to a ticket (this would normally save to the backend)
  const [newResponse, setNewResponse] = useState('');
  
  const handleAddResponse = (e) => {
    e.preventDefault();
    
    if (!newResponse.trim() || !selectedSupport) return;
    
    const updatedTicket = {
      ...selectedSupport,
      responses: [
        ...selectedSupport.responses,
        {
          from: 'Admin',
          message: newResponse,
          date: new Date().toISOString()
        }
      ],
      status: 'active'
    };
    
    // In a real app, you'd save this to the backend
    // For now, just update the UI
    setSelectedSupport(updatedTicket);
    setNewResponse('');
  };
  
  // Mark a ticket as resolved
  const handleResolveTicket = () => {
    if (!selectedSupport) return;
    
    const updatedTicket = {
      ...selectedSupport,
      status: 'resolved',
      responses: [
        ...selectedSupport.responses,
        {
          from: 'system',
          message: 'Ticket marked as resolved by Admin',
          date: new Date().toISOString()
        }
      ]
    };
    
    // In a real app, you'd save this to the backend
    // For now, just update the UI
    setSelectedSupport(updatedTicket);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Queries</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage and respond to customer support tickets</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Ticket List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative flex-1 mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="Search tickets..."
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <button
                onClick={() => {}}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
            
            {/* Filters panel */}
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="order">Order</option>
                    <option value="product">Product</option>
                    <option value="refund">Refund</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Ticket List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-320px)] overflow-y-auto">
            {filteredQueries.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No tickets found.
              </div>
            ) : (
              filteredQueries.map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors ${
                    selectedSupport && selectedSupport.id === ticket.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                  }`}
                  onClick={() => handleSelectTicket(ticket)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {ticket.id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getRelativeTime(ticket.date)}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                    {ticket.subject}
                  </h3>
                  
                  <div className="flex items-center mt-2">
                    <img 
                      src={ticket.customer.avatar} 
                      alt={ticket.customer.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
                      {ticket.customer.name}
                    </span>
                    <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs ${
                      ticket.priority === 'high' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                        : ticket.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Right Panel - Ticket Details */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {selectedSupport ? (
            <div className="flex flex-col h-full">
              {/* Ticket Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSupport.status)}`}>
                      {getStatusIcon(selectedSupport.status)}
                      {selectedSupport.status.charAt(0).toUpperCase() + selectedSupport.status.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {selectedSupport.id}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      • {formatDate(selectedSupport.date)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {selectedSupport.status !== 'resolved' && (
                      <button
                        onClick={handleResolveTicket}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => {}}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedSupport.subject}
                </h2>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
                  <div className="flex items-center">
                    <UserCircle className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedSupport.assignedTo}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedSupport.customer.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Created {getRelativeTime(selectedSupport.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Conversation Thread */}
              <div className="p-6 flex-grow overflow-y-auto max-h-[calc(100vh-450px)]">
                <div className="space-y-6">
                  {/* Initial message */}
                  <div className="flex">
                    <img
                      src={selectedSupport.customer.avatar}
                      alt={selectedSupport.customer.name}
                      className="h-10 w-10 rounded-full flex-shrink-0"
                    />
                    <div className="ml-4 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedSupport.customer.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(selectedSupport.date)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
                        {selectedSupport.message}
                      </div>
                    </div>
                  </div>
                  
                  {/* Responses */}
                  {selectedSupport.responses.map((response, index) => (
                    <div key={index} className={`flex ${response.from === 'system' ? 'justify-center' : ''}`}>
                      {response.from !== 'system' && (
                        <div className="h-10 w-10 rounded-full flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                          {response.from === 'Admin' ? (
                            <UserCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                          ) : (
                            <img
                              src={selectedSupport.customer.avatar}
                              alt={selectedSupport.customer.name}
                              className="h-10 w-10 rounded-full"
                            />
                          )}
                        </div>
                      )}
                      
                      <div className={`${response.from !== 'system' ? 'ml-4 flex-grow' : 'max-w-md'}`}>
                        {response.from !== 'system' && (
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {response.from === 'Admin' ? 'Support Team' : response.from}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(response.date)}
                            </span>
                          </div>
                        )}
                        
                        <div className={response.from === 'system' 
                          ? "mt-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 py-1 px-3 rounded-full" 
                          : "mt-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg"}>
                          {response.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reply Form */}
              {selectedSupport.status !== 'resolved' && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleAddResponse}>
                    <textarea
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      rows={3}
                    ></textarea>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                      >
                        Add Note
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={!newResponse.trim()}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Reply
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-4 mb-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No ticket selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Select a ticket from the list to view details and respond to customer queries.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support; 