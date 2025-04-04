import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
} from '../redux/features/cartSlice';
import { RiDeleteBinLine, RiShoppingCart2Line, RiArrowLeftLine, RiShieldCheckLine, RiSecurePaymentLine, RiTruckLine } from 'react-icons/ri';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const [itemBeingRemoved, setItemBeingRemoved] = useState(null);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    setItemBeingRemoved(id);
    setTimeout(() => {
      dispatch(removeFromCart(id));
      setItemBeingRemoved(null);
    }, 300);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <RiShoppingCart2Line className="text-7xl text-indigo-100 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
            >
              <RiArrowLeftLine className="mr-2" />
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-16">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <Link 
          to="/products"
          className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium hover:underline"
        >
          <RiArrowLeftLine className="mr-1" /> Continue Shopping
        </Link>
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-900 mr-2">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              {cartItems.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full"
                >
                  Clear Cart
                </motion.button>
              )}
            </div>
            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: itemBeingRemoved === item.id ? 0 : 1,
                      y: 0,
                      scale: itemBeingRemoved === item.id ? 0.95 : 1,
                    }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 flex flex-col sm:flex-row sm:items-center hover:bg-gray-50 transition-all"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl mb-4 sm:mb-0 group">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="sm:ml-6 flex-1">
                      <Link to={`/product/view/${item.id}`}>
                        <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)} {item.color && <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs ml-2">{item.color}</span>}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4 sm:mt-0 sm:ml-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1.5 rounded-full hover:bg-indigo-100 transition-colors border border-gray-200"
                      >
                        <span className="text-xl font-medium w-5 h-5 flex items-center justify-center text-gray-700">-</span>
                      </motion.button>
                      <span className="mx-4 font-medium px-3 py-1 bg-gray-50 rounded-md">{item.quantity}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1.5 rounded-full hover:bg-indigo-100 transition-colors border border-gray-200"
                      >
                        <span className="text-xl font-medium w-5 h-5 flex items-center justify-center text-gray-700">+</span>
                      </motion.button>
                    </div>

                    {/* Total Price */}
                    <div className="sm:ml-6 font-medium text-right mt-4 sm:mt-0">
                      <p className="text-lg font-bold text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#FEE2E2" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveItem(item.id)}
                      className="sm:ml-6 text-red-600 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 mt-4 sm:mt-0"
                    >
                      <RiDeleteBinLine className="text-xl" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          className="lg:w-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div 
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent z-0"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                {totalAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="text-gray-900 font-medium">${(totalAmount * 0.07).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${(totalAmount + (totalAmount * 0.07)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/checkout"
                    className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 font-medium mt-6 shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </Link>
                </motion.div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <RiSecurePaymentLine className="text-green-500 mr-2 text-lg" />
                      <span className="text-sm text-gray-600">Secure Payment</span>
                    </div>
                    <div className="flex items-center">
                      <RiTruckLine className="text-green-500 mr-2 text-lg" />
                      <span className="text-sm text-gray-600">Free Shipping</span>
                    </div>
                    <div className="flex items-center">
                      <RiShieldCheckLine className="text-green-500 mr-2 text-lg" />
                      <span className="text-sm text-gray-600">30-Day Returns</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  Taxes will be calculated at checkout based on your location.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;