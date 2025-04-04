import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  MailQuestion,
  PanelRight
} from 'lucide-react';

const CMSLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const location = useLocation();
  const navigate = useNavigate();

  // Automatically close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/cms',
    },
    {
      title: 'Products',
      icon: <Package size={20} />,
      path: '/cms/products',
      submenu: [
        { title: 'All Products', path: '/cms/products' },
        { title: 'Add Product', path: '/cms/products/add' },
        { title: 'Categories', path: '/cms/products/categories' }
      ]
    },
    {
      title: 'Orders',
      icon: <ShoppingCart size={20} />,
      path: '/cms/orders',
      submenu: [
        { title: 'All Orders', path: '/cms/orders' },
        { title: 'Pending', path: '/cms/orders/pending' },
        { title: 'Shipped', path: '/cms/orders/shipped' },
        { title: 'Delivered', path: '/cms/orders/delivered' },
        { title: 'Cancelled', path: '/cms/orders/cancelled' }
      ]
    },
    {
      title: 'Customers',
      icon: <Users size={20} />,
      path: '/cms/customers',
    },
    {
      title: 'Offers & Promotions',
      icon: <Tag size={20} />,
      path: '/cms/offers',
    },
    {
      title: 'Support Queries',
      icon: <MailQuestion size={20} />,
      path: '/cms/support',
    },
    {
      title: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/cms/analytics',
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/cms/settings',
    },
  ];

  // Notifications
  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #1234 was placed by John Doe',
      time: '5 mins ago',
      read: false,
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      message: 'Wireless Headphones stock is low (3 items)',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'New Customer Query',
      message: 'Emma Wilson has a question about her order',
      time: '3 hours ago',
      read: true,
    },
  ];

  // Get current page title
  const getCurrentPageTitle = () => {
    const item = menuItems.find((item) => {
      if (item.path === location.pathname) return true;
      if (item.submenu) {
        return item.submenu.find(subitem => subitem.path === location.pathname);
      }
      return false;
    });
    
    if (item) {
      if (item.submenu) {
        const subItem = item.submenu.find(subitem => subitem.path === location.pathname);
        if (subItem) return `${item.title} > ${subItem.title}`;
      }
      return item.title;
    }
    
    return 'Dashboard';
  };

  // Expandable menu state
  const [expandedMenu, setExpandedMenu] = useState(null);
  
  const toggleSubmenu = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(index);
    }
  };

  // Check if a menu or submenu is active
  const isMenuActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.submenu) {
      return item.submenu.some(subitem => subitem.path === location.pathname);
    }
    return false;
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className={`flex flex-col min-h-screen ${
        isDarkMode 
          ? 'bg-gray-900 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}>
        {/* Mobile Header */}
        <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 ${
          isDarkMode 
            ? 'bg-gray-800 border-b border-gray-700' 
            : 'bg-white border-b border-gray-200'
        } h-16 px-4 shadow-sm`}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-md ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center ml-3">
                <div className={`font-bold text-lg ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  ShopAdmin
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                } relative`}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                )}
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white cursor-pointer">
                <span className="text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu/Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className={`fixed inset-y-0 left-0 z-50 w-72 lg:hidden ${
                isDarkMode 
                  ? 'bg-gray-800 border-r border-gray-700' 
                  : 'bg-white border-r border-gray-200'
              } shadow-xl overflow-y-auto`}
            >
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <div className="text-xl font-bold">ShopAdmin</div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-md ${
                    isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="py-4">
                <nav className="px-3 space-y-1">
                  {menuItems.map((item, index) => (
                    <div key={item.title} className="mb-1">
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(index)}
                            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md font-medium transition-colors ${
                              isMenuActive(item)
                                ? isDarkMode 
                                  ? 'bg-gray-700/70 text-indigo-400'
                                  : 'bg-indigo-50 text-indigo-600'
                                : isDarkMode
                                  ? 'text-gray-200 hover:bg-gray-700/50'
                                  : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="mr-3">{item.icon}</span>
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform ${expandedMenu === index ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          <AnimatePresence>
                            {expandedMenu === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-10 mt-1 space-y-1"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                      location.pathname === subItem.path
                                        ? isDarkMode 
                                          ? 'bg-gray-700/70 text-indigo-400'
                                          : 'bg-indigo-50 text-indigo-600'
                                        : isDarkMode
                                          ? 'text-gray-300 hover:bg-gray-700/50'
                                          : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                  >
                                    <span className="mr-3 w-1.5 h-1.5 rounded-full bg-current"></span>
                                    {subItem.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className={`flex items-center px-3 py-2.5 rounded-md font-medium transition-colors ${
                            location.pathname === item.path
                              ? isDarkMode 
                                ? 'bg-gray-700/70 text-indigo-400'
                                : 'bg-indigo-50 text-indigo-600'
                              : isDarkMode
                                ? 'text-gray-200 hover:bg-gray-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="mt-auto p-4 border-t">
                <Link
                  to="/login"
                  className={`flex items-center px-3 py-2 rounded-md font-medium ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut size={20} className="mr-3" />
                  Sign Out
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {isNotificationOpen && (
            <div className="absolute top-16 right-4 z-50 lg:right-64 lg:top-16">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`w-80 rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`px-4 py-3 flex items-center justify-between ${
                  isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                }`}>
                  <h3 className="font-semibold">Notifications</h3>
                  <button className={`text-sm font-medium ${
                    isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    Mark all as read
                  </button>
                </div>
                <div className={`max-h-96 overflow-y-auto`}>
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`px-4 py-3 flex items-start border-b last:border-0 ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      } ${notification.read ? '' : isDarkMode ? 'bg-gray-700/30' : 'bg-indigo-50/50'}`}
                    >
                      <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                        notification.read 
                          ? 'invisible' 
                          : 'bg-indigo-500'
                      } mr-3`}></div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </p>
                        <p className={`text-sm mt-0.5 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs mt-1 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`px-4 py-2 text-center ${
                  isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
                }`}>
                  <Link 
                    to="/cms/notifications"
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                    }`}
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Desktop Layout */}
        <div className="flex flex-1 pt-16 lg:pt-0">
          {/* Desktop Sidebar */}
          <motion.div
            initial={false}
            animate={{ 
              width: isSidebarOpen ? 240 : 80,
              transition: { type: 'spring', stiffness: 300, damping: 35 }
            }}
            className={`hidden lg:block fixed top-0 h-screen ${
              isDarkMode 
                ? 'bg-gray-800 border-r border-gray-700' 
                : 'bg-white border-r border-gray-200'
            } z-10`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <AnimatePresence mode="wait">
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-bold text-lg truncate"
                  >
                    ShopAdmin
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-md ${
                  isDarkMode 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                aria-label="Toggle sidebar"
              >
                <PanelRight size={20} />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex flex-col h-[calc(100vh-4rem)]">
              <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item, index) => (
                  <div key={item.title} className="mb-1">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md transition-colors ${
                            isMenuActive(item)
                              ? isDarkMode 
                                ? 'bg-gray-700/70 text-indigo-400'
                                : 'bg-indigo-50 text-indigo-600'
                              : isDarkMode
                                ? 'text-gray-200 hover:bg-gray-700/50'
                                : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className={`${isSidebarOpen ? 'mr-3' : ''}`}>{item.icon}</span>
                            <AnimatePresence mode="wait">
                              {isSidebarOpen && (
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="font-medium"
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                          {isSidebarOpen && (
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform ${expandedMenu === index ? 'rotate-180' : ''}`} 
                            />
                          )}
                        </button>
                        {isSidebarOpen && (
                          <AnimatePresence>
                            {expandedMenu === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-10 mt-1 space-y-1"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                                      location.pathname === subItem.path
                                        ? isDarkMode 
                                          ? 'bg-gray-700/70 text-indigo-400'
                                          : 'bg-indigo-50 text-indigo-600'
                                        : isDarkMode
                                          ? 'text-gray-300 hover:bg-gray-700/50'
                                          : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                  >
                                    <span className="mr-3 w-1.5 h-1.5 rounded-full bg-current"></span>
                                    {subItem.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? isDarkMode 
                              ? 'bg-gray-700/70 text-indigo-400'
                              : 'bg-indigo-50 text-indigo-600'
                            : isDarkMode
                              ? 'text-gray-200 hover:bg-gray-700/50'
                              : 'text-gray-700 hover:bg-gray-100'
                        } ${!isSidebarOpen ? 'justify-center' : ''}`}
                      >
                        <span className={`${isSidebarOpen ? 'mr-3' : ''} relative group`}>
                          {item.icon}
                          {!isSidebarOpen && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all whitespace-nowrap z-50">
                              {item.title}
                            </div>
                          )}
                        </span>
                        <AnimatePresence mode="wait">
                          {isSidebarOpen && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="font-medium"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="mt-auto p-3 border-t">
                <Link
                  to="/login"
                  className={`flex items-center px-3 py-2.5 rounded-md ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-red-900/20'
                      : 'text-red-600 hover:bg-red-50'
                  } ${!isSidebarOpen ? 'justify-center' : ''}`}
                >
                  <span className={`${isSidebarOpen ? 'mr-3' : ''} relative group`}>
                    <LogOut size={20} />
                    {!isSidebarOpen && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                        Sign Out
                      </div>
                    )}
                  </span>
                  <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium"
                      >
                        Sign Out
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div 
            className={`flex-1 ${
              isSidebarOpen 
                ? 'lg:ml-60' 
                : 'lg:ml-20'
            } transition-all duration-300`}
          >
            {/* Desktop Header */}
            <header className={`hidden lg:flex sticky top-0 z-40 h-16 items-center justify-between px-6 ${
              isDarkMode 
                ? 'bg-gray-800 border-b border-gray-700' 
                : 'bg-white border-b border-gray-200'
            } shadow-sm`}>
              <div className="flex items-center space-x-4">
                <h1 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {getCurrentPageTitle()}
                </h1>
                <div className={`hidden md:flex items-center px-3 py-1 rounded-md ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <Search size={16} className={`mr-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`bg-transparent border-none focus:outline-none text-sm w-48 ${
                      isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-md ${
                    isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                
                <button 
                  className={`p-2 rounded-md ${
                    isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-100'
                  } relative`}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                <div className="relative group">
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <span className="text-sm font-semibold">A</span>
                    </div>
                    <div className="hidden md:block">
                      <p className={`text-sm font-medium leading-none ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Admin User
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        admin@example.com
                      </p>
                    </div>
                    <ChevronDown size={16} className={
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } />
                  </div>
                  
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 ${
                    isDarkMode 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  } z-50`}>
                    <div className="py-1">
                      <Link 
                        to="/cms/profile" 
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/cms/settings" 
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Settings
                      </Link>
                      <Link 
                        to="/login" 
                        className={`block px-4 py-2 text-sm ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-gray-700' 
                            : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        Sign out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className={`p-4 lg:p-6 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            } min-h-[calc(100vh-4rem)]`}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSLayout; 