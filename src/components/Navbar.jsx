import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Active link style function
  const getNavLinkClass = ({ isActive }) => {
    return isActive 
      ? "text-indigo-600 font-medium" 
      : "text-gray-700 hover:text-indigo-600 font-medium";
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="text-xl font-bold text-indigo-600">
              ShopNow
            </NavLink>
          </div>

          {/* Navigation Items - Always visible on desktop */}
          <div className="hidden sm:flex items-center space-x-4 md:space-x-8">
            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            <NavLink to="/products" className={getNavLinkClass}>Products</NavLink>
            <NavLink to="/shop" className={getNavLinkClass}>Shop Now</NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>Contact Us</NavLink>
            <NavLink to="/about" className={getNavLinkClass}>About Us</NavLink>
          </div>

          {/* Right Side Items */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Sign In/Up */}
            <NavLink to="/signin" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Sign In
            </NavLink>
            <NavLink to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign Up
            </NavLink>

            {/* Cart */}
            <div className="relative">
              <NavLink to="/cart" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 block">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
              </NavLink>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </div>
          </div>

          {/* Mobile menu button and cart */}
          <div className="sm:hidden flex items-center space-x-4">
            {/* Cart for mobile */}
            <div className="relative">
              <NavLink to="/cart" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 block">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
              </NavLink>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </div>
            
            {/* Mobile menu toggle */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with transition */}
      <div 
        className={`sm:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base ${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
          }>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base ${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
          }>
            Products
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base ${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
          }>
            Shop Now
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base ${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
          }>
            Contact Us
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base ${isActive ? 'text-indigo-600 bg-gray-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
          }>
            About Us
          </NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-4 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div className="flex space-x-3">
              <NavLink to="/signin" className="flex-1 text-center bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="flex-1 text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;