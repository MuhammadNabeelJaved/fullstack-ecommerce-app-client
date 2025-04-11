import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiFileList3Line,
  RiUserSettingsLine,
  RiSettings4Line,
  RiCustomerService2Line,
  RiHeartLine,
  RiLogoutBoxRLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiNotification3Line,
  RiSearchLine,
  RiMoonLine,
  RiSunLine,
  RiCloseLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { useAuth } from '../../contextApi/context.jsx';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const { user } = useAuth(); // Assuming you have a user context

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply dark mode classes to the body/html element
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <RiDashboardLine className="text-xl" />,
      path: '/dashboard',
    },
    {
      title: 'Orders',
      icon: <RiShoppingBag3Line className="text-xl" />,
      path: '/dashboard/orders',
    },
    {
      title: 'Order History',
      icon: <RiFileList3Line className="text-xl" />,
      path: '/dashboard/order-history',
    },
    {
      title: 'Wishlist',
      icon: <RiHeartLine className="text-xl" />,
      path: '/dashboard/wishlist',
    },
    {
      title: 'Profile Settings',
      icon: <RiUserSettingsLine className="text-xl" />,
      path: '/dashboard/profile',
    },
    {
      title: 'Support',
      icon: <RiCustomerService2Line className="text-xl" />,
      path: '/dashboard/support',
    },
    {
      title: 'Settings',
      icon: <RiSettings4Line className="text-xl" />,
      path: '/dashboard/settings',
    },
  ];

  // Get current page title
  const currentPage = menuItems.find((item) => item.path === location.pathname)?.title || 'Dashboard';

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b shadow-sm h-16 px-4`}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label="Open menu"
            >
              <RiMenuUnfoldLine className="text-xl" />
            </button>
            <h1 className="ml-3 text-xl font-semibold">
              {currentPage}
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
            </button>
            <button 
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
              aria-label="Notifications"
            >
              <RiNotification3Line className="text-lg" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'} text-white flex items-center justify-center`}>
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-black/50 backdrop-blur-sm"
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
            className={`fixed inset-y-0 left-0 z-40 w-72 lg:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <h1 className="text-xl font-bold">ShopNow</h1>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  aria-label="Close menu"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'} text-white flex items-center justify-center`}>
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? isDarkMode 
                              ? 'bg-indigo-900/50 text-indigo-400'
                              : 'bg-indigo-50 text-indigo-600'
                            : isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                        {location.pathname === item.path && (
                          <motion.span 
                            layoutId="activeIndicatorMobile"
                            className={`ml-auto ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                          >
                            <RiArrowRightSLine />
                          </motion.span>
                        )}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <button
                  className={`flex w-full items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'text-red-400 hover:bg-red-900/30'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <RiLogoutBoxRLine className="text-xl" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="flex flex-1 pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <motion.div
          initial={false}
          animate={{ 
            width: isSidebarOpen ? 240 : 80,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
          }}
          className={`hidden lg:block sticky top-0 h-screen ${
            isDarkMode 
              ? 'bg-gray-800 border-r border-gray-700'
              : 'bg-white border-r border-gray-200'
          } shadow-sm z-10`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-bold truncate"
                >
                  ShopNow
                </motion.h1>
              )}
            </AnimatePresence>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <RiMenuFoldLine className="text-xl" />
              ) : (
                <RiMenuUnfoldLine className="text-xl" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col h-[calc(100vh-4rem)]">
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${
                    isSidebarOpen ? 'justify-start px-3' : 'justify-center'
                  } py-3 rounded-lg transition-all relative ${
                    location.pathname === item.path
                      ? isDarkMode 
                        ? 'bg-indigo-900/50 text-indigo-400'
                        : 'bg-indigo-50 text-indigo-600'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={isSidebarOpen ? '' : 'tooltip-wrapper relative'}>
                    {item.icon}
                    {!isSidebarOpen && (
                      <div className="tooltip">
                        {item.title}
                      </div>
                    )}
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-3 font-medium truncate"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {isSidebarOpen && location.pathname === item.path && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className={`ml-auto ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                    >
                      <RiArrowRightSLine />
                    </motion.span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-3 border-t">
              <button
                className={`flex items-center ${
                  isSidebarOpen ? 'justify-start px-3' : 'justify-center'
                } w-full py-3 rounded-lg transition-colors relative ${
                  isDarkMode
                    ? 'text-red-400 hover:bg-red-900/30'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <div className={isSidebarOpen ? '' : 'tooltip-wrapper relative'}>
                  <RiLogoutBoxRLine className="text-xl" />
                  {!isSidebarOpen && (
                    <div className="tooltip">Logout</div>
                  )}
                </div>
                
                <AnimatePresence mode="wait">
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop Header */}
          <header className={`hidden lg:flex sticky top-0 z-10 h-16 items-center justify-between px-6 ${
            isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
          }`}>
            <h1 className="text-xl font-semibold">
              {currentPage}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className={`relative rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <RiSearchLine className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className={`pl-10 pr-4 py-2 w-60 rounded-lg focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500'
                  }`} 
                />
              </div>
              
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
              </button>
              
              <button 
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
                aria-label="Notifications"
              >
                <RiNotification3Line className="text-lg" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              
              <div className={`relative group ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'} text-white flex items-center justify-center`}>
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium leading-tight">{user.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                  </div>
                </div>
                
                <div className={`absolute right-0 mt-2 w-48 origin-top-right ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                } rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100`}>
                  <div className="py-2">
                    <Link to="/dashboard/profile" className={`block px-4 py-2 text-sm ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      Profile Settings
                    </Link>
                    <Link to="/dashboard/settings" className={`block px-4 py-2 text-sm ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      Account Settings
                    </Link>
                    <Link to="/" className={`block px-4 py-2 text-sm ${
                      isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-50 text-red-600'
                    }`}>
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 p-4 lg:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* CSS for tooltips */}
      <style jsx="true">{`
        .tooltip-wrapper:hover .tooltip {
          visibility: visible;
          opacity: 1;
          transform: translate(8px, -50%);
        }
        
        .tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translate(5px, -50%);
          background: ${isDarkMode ? '#1F2937' : '#ffffff'};
          color: ${isDarkMode ? '#F3F4F6' : '#111827'};
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 20;
          white-space: nowrap;
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s ease;
          ${isDarkMode ? 'border: 1px solid #374151;' : 'border: 1px solid #E5E7EB;'}
        }
        
        .tooltip::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px 5px 5px 0;
          border-style: solid;
          border-color: transparent ${isDarkMode ? '#1F2937' : '#ffffff'} transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout; 