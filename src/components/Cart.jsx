import React from 'react';
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
import { RiDeleteBinLine, RiShoppingCart2Line, RiArrowLeftLine } from 'react-icons/ri';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <RiShoppingCart2Line className="text-7xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some products to your cart and come back here!</p>
          <Link
            to="/"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300 font-medium"
          >
            <RiArrowLeftLine className="mr-2" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <Link 
          to="/"
          className="text-indigo-600 hover:text-indigo-700 flex items-center font-medium"
        >
          <RiArrowLeftLine className="mr-1" /> Continue Shopping
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <AnimatePresence>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-gray-900 mr-2">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 flex flex-col sm:flex-row sm:items-center hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="sm:ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)} {item.color && `• ${item.color}`}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4 sm:mt-0 sm:ml-6">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium w-6 h-6 flex items-center justify-center">-</span>
                      </button>
                      <span className="mx-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-medium w-6 h-6 flex items-center justify-center">+</span>
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="sm:ml-6 font-medium text-right mt-4 sm:mt-0">
                      <p className="text-lg font-medium text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="sm:ml-6 text-red-600 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50 mt-4 sm:mt-0"
                    >
                      <RiDeleteBinLine className="text-xl" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-6 sticky top-24 border border-gray-100"
          >
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
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 font-medium mt-6"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free shipping on all orders. Taxes calculated at checkout.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;