import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // In a real app, you would submit this to your backend
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  
  // This would normally use NavLink, but for demonstration purposes
  // we're using regular links that would be replaced with NavLink in your app
  const FooterLink = ({ to, children }) => (
    <Link 
      to={to} 
      className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
    >
      {children}
    </Link>
  );
  
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-indigo-600">ShopNow</h2>
            <p className="text-gray-600">
              Your one-stop destination for quality products at affordable prices. Shop with confidence and enjoy a seamless shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink to="/products">Products</FooterLink>
              </li>
              <li>
                <FooterLink to="/shop">Shop Now</FooterLink>
              </li>
              <li>
                <FooterLink to="/cart">Cart</FooterLink>
              </li>
              <li>
                <FooterLink to="/checkout">Checkout</FooterLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/contact">Contact Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/faq">FAQ</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-indigo-600 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  123 Shopping Street, Retail District, Fashion City, FC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-indigo-600 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-indigo-600 flex-shrink-0" />
                <span className="text-gray-600">support@shopnow.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg sm:rounded-r-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {isSubscribed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-500 bg-opacity-90 rounded-lg sm:rounded-r-none text-white font-medium">
                    Thanks for subscribing!
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="mt-2 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg sm:rounded-l-none transition-colors duration-300 flex items-center justify-center"
              >
                Subscribe <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500">
            © {currentYear} ShopNow. All rights reserved.
          </p>
          <div className="mt-4 space-x-4 text-sm text-gray-500">
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <span>|</span>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <span>|</span>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;