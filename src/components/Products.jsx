import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ShoppingCart, Star, ShoppingBag, Eye, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { addToCart, selectCartItems } from "../redux/features/cartSlice.js";
import products from "../data/products.data.js";

const Products = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    // Initialize addedItems state based on what's already in cart
    const initialAddedState = {};
    cartItems.forEach(item => {
      initialAddedState[item.id] = true;
    });
    setAddedItems(initialAddedState);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.4,
      },
    },
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-yellow-400" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedItems(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Show a brief animation or feedback
    setTimeout(() => {
      // Optional: You could reset this after some time if you want
      // setAddedItems(prev => ({
      //   ...prev,
      //   [product.id]: false
      // }));
    }, 2000);
  };

  const isProductInCart = (productId) => {
    return addedItems[productId] || cartItems.some(item => item.id === productId);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium products designed to
            enhance your lifestyle
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-t-2xl h-48 sm:h-56">
                <span className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-indigo-600">
                    {product.price}
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {renderRatingStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.rating}) · {product.reviews} reviews
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        isProductInCart(product.id) 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isProductInCart(product.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <NavLink
                      to={`/product/view/${product.id}`}
                      target="_blank"
                      className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </NavLink>

                    <NavLink
                      to="/cart"
                      className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-200 inline-flex items-center cursor-pointer">
            View All Products
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
