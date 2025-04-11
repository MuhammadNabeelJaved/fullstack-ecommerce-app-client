import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, selectCartItems } from "../redux/features/cartSlice";
import {
  RiShoppingCart2Line,
  RiStarFill,
  RiHeartLine,
  RiHeartFill,
  RiEyeLine,
  RiCheckLine,
} from "react-icons/ri";
import apiService from "../apis/fetchApis.js";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log("Cart Items is:",cartItems);
  const productId = cartItems.map(item => item.id)
  const quantity = cartItems.map(item => item.quantity)
  const cartData = {
    productId: productId,
    quantity: quantity
  }
  const isInCart = cartItems.some((item) => item.id === product.id);
  const [isWishListed, setIsWishListed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCartItem } = apiService;

  addToCartItem(cartData)

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishListed(!isWishListed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/product/view/${product.id}`}>
        <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
          {/* Product Image Section */}
          <div className="relative overflow-hidden aspect-[4/3]">
            {/* Tags Section */}
            <div className="absolute z-10 top-3 left-3 flex flex-col gap-2">
              {product.tag && (
                <motion.span
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-xs py-1.5 px-3 rounded-full font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {product.tag}
                </motion.span>
              )}

              {product.offer && (
                <motion.span
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs py-1.5 px-3 rounded-full font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {product.offer}
                </motion.span>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute z-10 top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
              onClick={toggleWishlist}
            >
              {isWishListed ? (
                <RiHeartFill className="text-red-500 text-lg" />
              ) : (
                <RiHeartLine className="text-gray-700 text-lg" />
              )}
            </motion.button>

            {/* Product Image with Overlay */}
            <div className="w-full h-full relative">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.5 }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Quick Actions Buttons */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full p-4 flex justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, staggerChildren: 0.1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-md"
                      onClick={handleAddToCart}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isInCart ? (
                        <RiCheckLine className="text-lg text-green-600" />
                      ) : (
                        <RiShoppingCart2Line className="text-lg" />
                      )}
                    </motion.button>

                    <Link
                      to={`/product/view/${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full hover:bg-white transition-all duration-300 shadow-md"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <RiEyeLine className="text-lg" />
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info Section */}
          <div className="p-5 flex flex-col justify-between flex-grow">
            <div>
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <RiStarFill
                      key={index}
                      className={`${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } 
                                mr-0.5 text-sm`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  ({product.reviews})
                </span>
              </div>

              {/* Short Description - hidden on small screens */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 hidden sm:block">
                {product.description?.substring(0, 80)}...
              </p>
            </div>

            {/* Price and Add to Cart Section */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isInCart
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isInCart ? (
                  <RiCheckLine className="text-lg" />
                ) : (
                  <RiShoppingCart2Line className="text-lg" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
