import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addToCart, selectCartItems } from '../redux/features/cartSlice';
import { RiShoppingCart2Line, RiStarFill, RiHeartLine, RiEyeLine } from 'react-icons/ri';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full border border-gray-100">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {product.tag && (
              <span className="absolute top-2 left-2 z-10 bg-indigo-600 text-white text-xs py-1 px-2 rounded-full font-medium">
                {product.tag}
              </span>
            )}
            
            {product.offer && (
              <span className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs py-1 px-2 rounded-full font-medium">
                {product.offer}
              </span>
            )}
            
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Quick action buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                >
                  <RiHeartLine className="text-lg" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                >
                  <RiEyeLine className="text-lg" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <RiStarFill
                    key={index}
                    className={`${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                               mr-0.5 text-sm`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">
                ({product.reviews})
              </span>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`p-3 rounded-xl flex items-center justify-center transition-colors ${
                  isInCart
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <RiShoppingCart2Line className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 