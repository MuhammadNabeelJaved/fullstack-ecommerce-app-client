import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                ShopEase
              </span>
            </a>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative flex items-center">
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  onClick={toggleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "250px", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-10 top-0 z-10"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </div>
              <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                <User className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <div className="relative flex-1">
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  onClick={toggleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
                {showSearch && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  </motion.div>
                )}
              </div>
              <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                <User className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
