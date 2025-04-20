import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../apis/fetchApis.js";

const ProductCard = () => {
  const { getProducts } = apiService;
  const [products, setProducts] = useState([]);
  // State to track which image is currently being shown for each product

  console.log(
    "Product Data:",
    products.map(
      (product) => Array.isArray(product.images) && product.images[0].url
    )
  );

  useEffect(() => {
    const getAllProducts = async () => {
      const productData = await getProducts();
      setProducts(productData?.data);
    };

    getAllProducts();
  }, []);

  // Animation variants for the card
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
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
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Animation for the button
  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#4338ca", // Indigo-700
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <>
      <div className="text-center mt-10 mb-5 font-bold text-4xl text-gray-800 tracking-wide">
        <h2>Featured Products</h2>
      </div>
      <div className="m-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              {/* Show the current image from the array */}
              <img
                src={
                  // Check for various possible image field structures
                  Array.isArray(product.images) && product.images.length > 0
                    ? product.images[0].url || product.images[0] // If first element is an object with url or direct URL
                    : product.images?.url || // If images is an object with url property
                      product.image?.url || // If image is an object with url property
                      (Array.isArray(product.image) && product.image.length > 0
                        ? product.image[0].url || product.image[0] // If image is array
                        : product.image) || // If image is a direct URL
                      "https://via.placeholder.com/300" // Fallback
                }
                alt={`${product.name} image`}
                className="w-full h-60 object-cover object-center"
              />

              {/* Image navigation buttons */}
              {product.image && product.image.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(product.id);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(product.id);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 hover:bg-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Image indicator dots */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                    {product.image.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentImageIndex[product.id]
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-amber-500">★</span>
                    <span className="text-sm ml-1 text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price?.toFixed(2) || "0.00"}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.oldPrice?.toFixed(2)}
                    </span>
                  )}
                </div>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
