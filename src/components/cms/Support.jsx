import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Mail,
  MailOpen,
  Star,
  Trash2,
  ArrowUpDown,
  Clock,
  CheckCircle,
  RefreshCw,
  Archive,
  Bookmark,
  MoreHorizontal,
  AlertCircle,
  Send
} from 'lucide-react';

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  const filters = [
    { value: 'all', label: 'All Tickets', icon: <Mail className="h-4 w-4" /> },
    { value: 'open', label: 'Open', icon: <MailOpen className="h-4 w-4" /> },
    { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="h-4 w-4" /> },
    { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4" /> },
    { value: 'starred', label: 'Starred', icon: <Star className="h-4 w-4" /> },
  ];
  
  const tickets = [
    {
      id: 'TICKET-5623',
      customer: {
        name: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      subject: 'Order Delivery Delay',
      message: "Hi, I placed an order (#ORD-7350) five days ago and it still shows as 'processing'. The estimated delivery date has passed and I haven't received any updates. Can you please check the status and let me know when I can expect to receive my items?",
      date: '2024-03-18 14:30',
      status: 'open',
      priority: 'high',
      isStarred: true,
      orderId: 'ORD-7350',
      replies: [
        {
          id: 1,
          from: 'system',
          message: 'Ticket created and assigned to customer support team.',
          date: '2024-03-18 14:30'
        }
      ]
    },
    {
      id: 'TICKET-5622',
      customer: {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      subject: 'Refund Request',
      message: "I'd like to request a refund for my recent purchase (Order #ORD-7348). The item doesn't match the description on your website. I've already initiated a return as per your policy. Please process my refund once you receive the returned item.",
      date: '2024-03-18 11:15',
      status: 'pending',
      priority: 'medium',
      isStarred: false,
      orderId: 'ORD-7348',
      replies: [
        {
          id: 1,
          from: 'system',
          message: 'Ticket created and assigned to customer support team.',
          date: '2024-03-18 11:15'
        },
        {
          id: 2,
          from: 'support',
          name: 'Alex Thompson',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          message: "Hi Michael, I've checked your order and can see the return has been initiated. Once we receive the item back, we'll process your refund immediately. You should receive a confirmation email when the refund is processed. Please allow 3-5 business days for the amount to reflect in your account after that. Let me know if you have any other questions.",
          date: '2024-03-18 13:22'
        }
      ]
    },
    {
      id: 'TICKET-5621',
      customer: {
        name: 'Sophia Davis',
        email: 'sophia.davis@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      subject: 'Product Information Request',
      message: "I'm interested in the Ultra HD Monitor 27\" but I have a question about its compatibility. Does it work with MacBook Pro 2021 models? Also, does it come with a HDMI cable or do I need to purchase that separately? Thanks!",
      date: '2024-03-17 16:45',
      status: 'resolved',
      priority: 'low',
      isStarred: false,
      orderId: null,
      replies: [
        {
          id: 1,
          from: 'system',
          message: 'Ticket created and assigned to customer support team.',
          date: '2024-03-17 16:45'
        },
        {
          id: 2,
          from: 'support',
          name: 'Jamie Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
          message: "Hi Sophia, Yes, the Ultra HD Monitor 27\" is fully compatible with MacBook Pro 2021 models. You'll need a USB-C to DisplayPort cable or adapter, as the monitor comes with DisplayPort and HDMI inputs. The monitor includes an HDMI cable in the box, so you won't need to purchase one separately. Let me know if you have any other questions!",
          date: '2024-03-17 17:30'
        },
        {
          id: 3,
          from: 'customer',
          name: 'Sophia Davis',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          message: "That's perfect! Thank you for the detailed information. I'll place my order now.",
          date: '2024-03-17 18:05'
        },
        {
          id: 4,
          from: 'support',
          name: 'Jamie Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
          message: "You're welcome, Sophia! If you have any questions after receiving your monitor, feel free to reach out again. Enjoy your new display!",
          date: '2024-03-17 18:20'
        }
      ]
    },
    {
      id: 'TICKET-5620',
      customer: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      subject: 'Damaged Product',
      message: "I received my order (#ORD-7349) today but the product is damaged. The packaging was intact but when I opened it, I noticed the screen has a crack in the corner. I'd like to request a replacement as soon as possible.",
      date: '2024-03-17 10:20',
      status: 'open',
      priority: 'high',
      isStarred: true,
      orderId: 'ORD-7349',
      replies: [
        {
          id: 1,
          from: 'system',
          message: 'Ticket created and assigned to customer support team.',
          date: '2024-03-17 10:20'
        }
      ]
    },
    {
      id: 'TICKET-5619',
      customer: {
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      },
      subject: 'Warranty Claim',
      message: "I purchased a Bluetooth Speaker from your store 10 months ago, and it has stopped working. It's still under the 1-year warranty period. How do I proceed with a warranty claim? Do I need to provide any specific documentation?",
      date: '2024-03-16 13:10',
      status: 'resolved',
      priority: 'medium',
      isStarred: false,
      orderId: 'ORD-6542',
      replies: [
        {
          id: 1,
          from: 'system',
          message: 'Ticket created and assigned to customer support team.',
          date: '2024-03-16 13:10'
        },
        {
          id: 2,
          from: 'support',
          name: 'Chris Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          message: "Hi Robert, I'm sorry to hear about the issue with your Bluetooth Speaker. You can proceed with a warranty claim by filling out the warranty form on our website under the 'Support' section. You'll need to provide your order number, the date of purchase, and a brief description of the issue. Please also attach a photo of the product showing the serial number if possible. Once submitted, our warranty team will review your claim within 48 hours and get back to you with next steps.",
          date: '2024-03-16 14:05'
        },
        {
          id: 3,
          from: 'customer',
          name: 'Robert Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
          message: "Thank you for the quick response. I've submitted the warranty claim as instructed.",
          date: '2024-03-16 15:30'
        },
        {
          id: 4,
          from: 'support',
          name: 'Chris Wilson',
          avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
          message: "Great! I've added a note to your claim to expedite the process. You should receive an update via email within 24-48 hours. Is there anything else I can help you with today?",
          date: '2024-03-16 15:45'
        },
        {
          id: 5,
          from: 'customer',
          name: 'Robert Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
          message: "No, that's all. Thank you for your help!",
          date: '2024-03-16 16:00'
        }
      ]
    }
  ];
  
  // Filter tickets
  let filteredTickets = [...tickets];
  
  // Apply search filter
  if (searchTerm) {
    filteredTickets = filteredTickets.filter(
      ticket => 
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.orderId && ticket.orderId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  
  // Apply status filter
  if (selectedFilter === 'open') {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === 'open');
  } else if (selectedFilter === 'resolved') {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === 'resolved');
  } else if (selectedFilter === 'pending') {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === 'pending');
  } else if (selectedFilter === 'starred') {
    filteredTickets = filteredTickets.filter(ticket => ticket.isStarred);
  }
  
  // Sort tickets - newest first
  filteredTickets.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/30';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800/30';
    }
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30';
      case 'low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/30';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800/30';
    }
  };
  
  // Handle sending reply
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    
    // In a real app, this would send the reply to the API
    console.log(`Sending reply to ticket ${selectedTicket.id}:`, replyText);
    
    // Clear the reply text
    setReplyText('');
    
    // Show success message (in a real app)
    alert('Reply sent successfully!');
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  // Toggle star
  const toggleStar = (event, ticket) => {
    event.stopPropagation();
    // In a real app, this would update the API
    console.log(`Toggling star for ticket ${ticket.id}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Queries</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage customer support tickets</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {}} 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Main container */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="Search tickets by ID, customer, or subject..."
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {/* Filter pills */}
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedFilter === filter.value 
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/30'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-650'
                }`}
              >
                <span className="mr-1.5">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex h-[calc(100vh-280px)]">
          {/* Tickets list */}
          <div className={`border-r border-gray-200 dark:border-gray-700 w-full ${selectedTicket ? 'hidden md:block md:w-2/5' : 'w-full'}`}>
            {filteredTickets.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tickets found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  {searchTerm ? 'Try adjusting your search or filter to find what you\'re looking for.' : 'There are no support tickets matching your current filters.'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto max-h-full">
                {filteredTickets.map((ticket) => (
                  <li 
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer ${
                      selectedTicket?.id === ticket.id ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={ticket.customer.avatar} 
                            alt={ticket.customer.name} 
                            className="h-10 w-10 rounded-full"
                          />
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{ticket.customer.name}</h3>
                              <button 
                                onClick={(e) => toggleStar(e, ticket)}
                                className="ml-2 text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-300"
                              >
                                <Star className="h-4 w-4" fill={ticket.isStarred ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{ticket.subject}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{formatDate(ticket.date)}</div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{ticket.message}</p>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                        </span>
                        {ticket.orderId && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            Order: {ticket.orderId}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Ticket detail view */}
          {selectedTicket && (
            <div className="w-full md:w-3/5 flex flex-col">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={() => setSelectedTicket(null)}
                    className="md:hidden mr-2 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">{selectedTicket.subject}</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
                    <Archive className="h-5 w-5" />
                  </button>
                  <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
                    <Bookmark className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <button className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Original ticket */}
                <div className="flex items-start space-x-3">
                  <img 
                    src={selectedTicket.customer.avatar} 
                    alt={selectedTicket.customer.name} 
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {selectedTicket.customer.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedTicket.customer.email}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(selectedTicket.date)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                          {selectedTicket.message}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        {selectedTicket.orderId && (
                          <Link 
                            to={`/cms/orders/${selectedTicket.orderId}`}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
                          >
                            View Order: {selectedTicket.orderId}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                {selectedTicket.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start space-x-3">
                    {reply.from === 'system' ? (
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    ) : (
                      <img 
                        src={reply.avatar} 
                        alt={reply.name} 
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <div className={`border rounded-lg p-4 shadow-sm ${
                        reply.from === 'system' 
                          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
                          : reply.from === 'support'
                            ? 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800/20'
                            : 'bg-white dark:bg-gray-750 border-gray-200 dark:border-gray-700'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            {reply.from === 'system' ? (
                              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                System
                              </h3>
                            ) : (
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                {reply.name}
                                {reply.from === 'support' && (
                                  <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                    Support Agent
                                  </span>
                                )}
                              </h3>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(reply.date)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                            {reply.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Reply area */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">SU</span>
                  </div>
                  <div className="flex-1">
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Type your reply here..."
                      rows={3}
                    />
                    <div className="mt-3 flex justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none"
                        >
                          Mark as Resolved
                        </button>
                      </div>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                          !replyText.trim() 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support; 