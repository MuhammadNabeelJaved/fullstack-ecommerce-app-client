import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../redux/features/cartSlice.js";
import {
  setSearchQuery,
  toggleSearch,
  closeSearch,
  selectIsSearchOpen,
  selectSearchQuery,
} from "../redux/features/searchSlice.js";
import { Menu, X, ShoppingCart, Search, User, LogIn } from "lucide-react";
import SearchResults from "./SearchResults.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isSearchOpen = useSelector(selectIsSearchOpen);
  const searchQuery = useSelector(selectSearchQuery);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleToggleSearch = () => {
    dispatch(toggleSearch());
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      // dispatch(closeSearch());
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                ShopNow
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <div
                className="relative flex items-center"
                ref={searchContainerRef}
              >
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  onClick={handleToggleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "250px", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-10 top-0 z-10"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      ref={searchInputRef}
                      placeholder="Search products..."
                      className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  </motion.div>
                )}
                <SearchResults
                  isVisible={isSearchOpen && searchQuery.trim().length > 0}
                />
              </div>
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right transform scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      My Account
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
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
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <div className="relative flex-1" ref={searchContainerRef}>
                <button
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  onClick={handleToggleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
                {isSearchOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search products..."
                      className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  </motion.div>
                )}
                <SearchResults
                  isVisible={isSearchOpen && searchQuery.trim().length > 0}
                />
              </div>
              <Link
                to="/signin"
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span className="text-sm">Sign In</span>
              </Link>
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
