import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiSearchLine, 
  RiFilterLine, 
  RiArrowDownSLine, 
  RiCheckboxCircleLine, 
  RiTimeLine, 
  RiTruckLine,
  RiCloseCircleLine,
  RiEyeLine,
  RiCalendarLine,
  RiMapPinLine
} from 'react-icons/ri';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Listen for dark mode changes from the parent component
  useEffect(() => {
    const isDark = document.body.classList.contains('dark') || 
                   document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);
  
  const orders = [
    {
      id: '#ORD-001',
      date: '2024-03-15',
      status: 'Delivered',
      total: '$156.00',
      items: [
        { 
          id: 1, 
          name: 'Wireless Headphones', 
          quantity: 1, 
          price: '$129.00',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120'
        },
        { 
          id: 2, 
          name: 'Phone Case', 
          quantity: 1, 
          price: '$27.00',
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=120'
        }
      ],
      tracking: {
        number: 'FDX7362521896',
        carrier: 'FedEx',
        eta: 'Delivered on Mar 15',
        url: '#',
        timeline: [
          { status: 'Delivered', date: 'Mar 15, 2024', time: '14:35 PM' },
          { status: 'Out for delivery', date: 'Mar 15, 2024', time: '09:42 AM' },
          { status: 'Arrived at local facility', date: 'Mar 14, 2024', time: '21:18 PM' },
          { status: 'Shipped', date: 'Mar 13, 2024', time: '16:07 PM' },
          { status: 'Order processed', date: 'Mar 12, 2024', time: '11:30 AM' }
        ]
      },
      address: '123 Main St, Apt 4B, New York, NY 10001',
      payment: 'Visa •••• 4242'
    },
    {
      id: '#ORD-002',
      date: '2024-03-14',
      status: 'Processing',
      total: '$249.99',
      items: [
        { 
          id: 3, 
          name: 'Smart Speaker', 
          quantity: 1, 
          price: '$249.99',
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=120'
        }
      ],
      tracking: {
        number: 'Processing',
        carrier: 'Not assigned yet',
        eta: 'Est. Mar 20 - Mar 22',
        timeline: [
          { status: 'Order processed', date: 'Mar 14, 2024', time: '10:22 AM' }
        ]
      },
      address: '123 Main St, Apt 4B, New York, NY 10001',
      payment: 'Mastercard •••• 5678'
    },
    {
      id: '#ORD-003',
      date: '2024-03-12',
      status: 'Shipped',
      total: '$89.99',
      items: [
        { 
          id: 4, 
          name: 'Bluetooth Earbuds', 
          quantity: 1, 
          price: '$89.99',
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120'
        }
      ],
      tracking: {
        number: 'UPS1784596320',
        carrier: 'UPS',
        eta: 'Est. delivery on Mar 18',
        url: '#',
        timeline: [
          { status: 'In transit', date: 'Mar 13, 2024', time: '21:50 PM' },
          { status: 'Shipped', date: 'Mar 13, 2024', time: '14:25 PM' },
          { status: 'Order processed', date: 'Mar 12, 2024', time: '09:37 AM' }
        ]
      },
      address: '123 Main St, Apt 4B, New York, NY 10001',
      payment: 'PayPal'
    },
    {
      id: '#ORD-004',
      date: '2024-02-28',
      status: 'Cancelled',
      total: '$59.99',
      items: [
        { 
          id: 5, 
          name: 'Phone Stand', 
          quantity: 1, 
          price: '$59.99',
          image: 'https://images.unsplash.com/photo-1587749091018-a350f76be96c?w=120'
        }
      ],
      tracking: {
        number: 'Cancelled',
        carrier: 'N/A',
        eta: 'N/A',
        timeline: [
          { status: 'Order cancelled', date: 'Mar 1, 2024', time: '10:12 AM' },
          { status: 'Order processed', date: 'Feb 28, 2024', time: '14:35 PM' }
        ]
      },
      address: '123 Main St, Apt 4B, New York, NY 10001',
      payment: 'Refunded to Visa •••• 4242'
    }
  ];

  const filteredOrders = orders
    .filter(order => {
      if (statusFilter === 'all') return true;
      return order.status.toLowerCase() === statusFilter.toLowerCase();
    })
    .filter(order => {
      if (!searchTerm) return true;
      return (
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <RiCheckboxCircleLine className={`${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />;
      case 'processing':
        return <RiTimeLine className={`${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />;
      case 'shipped':
      case 'in transit':
      case 'out for delivery':
        return <RiTruckLine className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />;
      case 'cancelled':
        return <RiCloseCircleLine className={`${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />;
      default:
        return null;
    }
  };

  const getStatusColorClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return isDarkMode 
          ? 'bg-emerald-900/40 text-emerald-400 border-emerald-800' 
          : 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'processing':
        return isDarkMode 
          ? 'bg-amber-900/40 text-amber-400 border-amber-800' 
          : 'bg-amber-50 text-amber-700 border-amber-100';
      case 'shipped':
        return isDarkMode 
          ? 'bg-blue-900/40 text-blue-400 border-blue-800' 
          : 'bg-blue-50 text-blue-700 border-blue-100';
      case 'cancelled':
        return isDarkMode 
          ? 'bg-red-900/40 text-red-400 border-red-800' 
          : 'bg-red-50 text-red-700 border-red-100';
      default:
        return isDarkMode 
          ? 'bg-gray-800 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleOrderView = (order) => {
    setActiveOrder(activeOrder?.id === order.id ? null : order);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Orders
        </h1>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <RiFilterLine className="text-lg" />
            <span>Filter</span>
            <RiArrowDownSLine className={`text-lg transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-10 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className={`py-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                    statusFilter === 'all' 
                      ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('delivered');
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                    statusFilter === 'delivered' 
                      ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <RiCheckboxCircleLine className="mr-2 text-emerald-500" />
                  Delivered
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('processing');
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                    statusFilter === 'processing' 
                      ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <RiTimeLine className="mr-2 text-amber-500" />
                  Processing
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('shipped');
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                    statusFilter === 'shipped' 
                      ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <RiTruckLine className="mr-2 text-blue-500" />
                  Shipped
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('cancelled');
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                    statusFilter === 'cancelled' 
                      ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <RiCloseCircleLine className="mr-2 text-red-500" />
                  Cancelled
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className={`relative ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <RiSearchLine className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
        <input
          type="text"
          placeholder="Search by order ID or product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`block w-full rounded-lg pl-10 pr-4 py-2.5 text-sm ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-white placeholder-gray-500' 
              : 'bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 placeholder-gray-500'
          } border focus:outline-none focus:ring-2`}
        />
      </div>

      {/* Status filter pills on mobile */}
      <div className="flex overflow-x-auto py-2 gap-2 md:hidden">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
            statusFilter === 'all'
              ? (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700')
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setStatusFilter('delivered')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center ${
            statusFilter === 'delivered'
              ? (isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-600 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700')
          }`}
        >
          <RiCheckboxCircleLine className="mr-1" />
          Delivered
        </button>
        <button
          onClick={() => setStatusFilter('processing')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center ${
            statusFilter === 'processing'
              ? (isDarkMode ? 'bg-amber-700 text-white' : 'bg-amber-600 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700')
          }`}
        >
          <RiTimeLine className="mr-1" />
          Processing
        </button>
        <button
          onClick={() => setStatusFilter('shipped')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center ${
            statusFilter === 'shipped'
              ? (isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700')
          }`}
        >
          <RiTruckLine className="mr-1" />
          Shipped
        </button>
        <button
          onClick={() => setStatusFilter('cancelled')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center ${
            statusFilter === 'cancelled'
              ? (isDarkMode ? 'bg-red-700 text-white' : 'bg-red-600 text-white')
              : (isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700' : 'bg-gray-100 text-gray-700')
          }`}
        >
          <RiCloseCircleLine className="mr-1" />
          Cancelled
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className={`border rounded-xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div 
                  className={`p-4 sm:p-6 ${
                    isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  } ${activeOrder?.id === order.id ? 'border-b-0' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.id}
                        </h2>
                        <span className={`px-2.5 py-0.5 text-xs font-medium border rounded-full inline-flex items-center ${getStatusColorClass(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <div className={`text-sm flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <RiCalendarLine className="mr-1" />
                          {order.date}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                        </div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {order.total}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center self-end sm:self-center gap-2">
                      <button
                        onClick={() => handleOrderView(order)}
                        className={`p-2 rounded-lg text-sm flex items-center gap-1 ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <RiEyeLine />
                        <span className="hidden md:inline">{activeOrder?.id === order.id ? 'Hide Details' : 'View Details'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {activeOrder?.id === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 sm:p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Order items */}
                          <div className="lg:col-span-7">
                            <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Order Items
                            </h3>
                            <div className={`divide-y rounded-lg overflow-hidden ${isDarkMode ? 'divide-gray-700 bg-gray-750' : 'divide-gray-200 bg-gray-50'}`}>
                              {order.items.map((item) => (
                                <div key={item.id} className="p-3 flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-md overflow-hidden border flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <p className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                      {item.name}
                                    </p>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {item.price}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Shipping and payment */}
                          <div className="lg:col-span-5">
                            <div className="space-y-4">
                              {/* Tracking info */}
                              <div>
                                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Tracking Information
                                </h3>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-medium">Carrier:</span> {order.tracking.carrier}
                                  </div>
                                  {order.tracking.number !== 'Cancelled' && order.tracking.number !== 'Processing' && (
                                    <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                      <span className="font-medium">Tracking Number:</span> {order.tracking.number}
                                    </div>
                                  )}
                                  <div className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <span className="font-medium">Estimated Delivery:</span> {order.tracking.eta}
                                  </div>
                                  
                                  {/* Timeline */}
                                  <div className="mt-3 relative pl-6">
                                    <div className={`absolute left-1.5 top-0 bottom-0 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                    
                                    {order.tracking.timeline.map((event, index) => (
                                      <div key={index} className="mb-3 relative">
                                        <div className={`absolute -left-6 top-0.5 w-3 h-3 rounded-full 
                                          ${index === 0 
                                            ? (isDarkMode ? 'bg-indigo-500 ring-2 ring-indigo-400/30' : 'bg-indigo-600 ring-2 ring-indigo-100') 
                                            : (isDarkMode ? 'bg-gray-600' : 'bg-gray-400')}`}>
                                        </div>
                                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                          {event.status}
                                        </div>
                                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                          {event.date} • {event.time}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Shipping address */}
                              <div>
                                <h3 className={`text-sm font-medium mb-2 flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <RiMapPinLine className="mr-1" />
                                  Shipping Address
                                </h3>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.address}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Payment method */}
                              <div>
                                <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Payment Method
                                </h3>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {order.payment}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <RiSearchLine className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-1">No orders found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Orders; 