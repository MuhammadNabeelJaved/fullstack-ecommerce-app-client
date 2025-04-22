import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice.js";
import {
  RiStarFill,
  RiHeartLine,
  RiHeartFill,
  RiEyeLine,
} from "react-icons/ri";
import { BsCartPlusFill, BsCartCheckFill } from "react-icons/bs";
import apiService from "../apis/fetchApis.js";
import { useAuth } from "../contextApi/Context.jsx";

const ProductCard = ({ product }) => {
  const { addToCartItem } = apiService;
  const { token } = useAuth();
  const [isWishListed, setIsWishListed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items)

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishListed(!isWishListed);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Make sure the product has all required fields
    // (especially id which is used in your reducer)
    dispatch(
      addToCart({
        ...product,
        id: product._id, // Ensure product has an id field
      })
    );
    addToCartItem({
      productId: product._id, // Ensure product has an id field
      quantity: product.quantity || 1,
    },token);
    // Add your cart functionality here
    console.log("Add to cart clicked for:", product._id);
  };

  useEffect(() => {
    // Only log when cart items change
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/product/view/${product._id}`}>
        <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
          {/* Product Image Section */}
          <div className="relative overflow-hidden aspect-[4/3]">
            {/* Tag */}
            {product.tag && (
              <motion.span
                className="absolute z-10 top-2 left-2 bg-black text-white text-[10px] py-0.5 px-2 rounded-full font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {product.tag}
              </motion.span>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute z-10 top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm"
              onClick={toggleWishlist}
            >
              {isWishListed ? (
                <RiHeartFill className="text-red-500 text-sm" />
              ) : (
                <RiHeartLine className="text-gray-700 text-sm" />
              )}
            </motion.button>

            {/* Product Image */}
            <img
              src={
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0].url || product.images[0]
                  : product.images?.url ||
                    product.image?.url ||
                    (Array.isArray(product.image) && product.image.length > 0
                      ? product.image[0].url || product.image[0]
                      : product.image) ||
                    "https://via.placeholder.com/300"
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Quick View Button */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-2 left-0 w-full flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/product/view/${product._id}`}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/90 text-gray-800 py-1 px-3 rounded-full shadow-sm flex items-center gap-1 text-xs font-medium"
                    >
                      <RiEyeLine /> View
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info Section */}
          <div className="p-3 flex flex-col flex-grow">
            {/* Category & Title */}
            {product.category && (
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>
            )}

            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mt-0.5">
              {product.name}
            </h3>

            {/* Rating - Simplified */}
            <div className="flex items-center my-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <RiStarFill
                    key={index}
                    className={`${
                      index < Math.floor(product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } text-[10px] mr-0.5`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500 ml-1">
                ({product.reviews || 0})
              </span>
            </div>

            {/* Price and Cart Section */}
            <div className="flex items-center justify-between mt-auto pt-1">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900">
                  ${product.price?.toFixed(2) || "0.00"}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                onClick={handleCartClick}
              >
                {cartItems.some(
                  (item) => item.id === product._id || item._id === product._id
                ) ? (
                  <BsCartCheckFill className="text-3xl cursor-pointer text-green-600" />
                ) : (
                  <BsCartPlusFill className="text-3xl cursor-pointer text-blue-500" />
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
