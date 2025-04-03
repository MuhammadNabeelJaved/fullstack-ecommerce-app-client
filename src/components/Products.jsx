import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ShoppingCart, Star, ShoppingBag } from "lucide-react";

const Products = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const products = [
    {
      id: 1,
      name: "Premium Headphones",
      price: "$299",
      rating: 4.8,
      reviews: 124,
      description:
        "Experience crystal-clear sound with our premium noise-cancelling headphones. Perfect for music lovers and professionals alike, featuring 40-hour battery life and ultra-comfortable ear cushions.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$199",
      rating: 4.6,
      reviews: 89,
      description:
        "Track your fitness goals, receive notifications, and monitor your health with our advanced smartwatch. Water-resistant design with a vibrant OLED display and 7-day battery life.",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Wireless Speaker",
      price: "$149",
      rating: 4.5,
      reviews: 76,
      description:
        "Fill any room with immersive 360° sound. This portable Bluetooth speaker delivers rich bass and clear highs with 20 hours of playback. Waterproof design makes it perfect for outdoor adventures.",
      image:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: "$79",
      rating: 4.7,
      reviews: 112,
      description:
        "Dominate your games with precision and speed. This ergonomic gaming mouse features customizable RGB lighting, 16,000 DPI optical sensor, and 8 programmable buttons for the ultimate gaming experience.",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
    },
  ];

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 10 
                } 
              }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-t-2xl h-48 sm:h-56">
                <span className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </span>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  whileHover={{ 
                    scale: 1.15,
                    transition: { duration: 0.7 }
                  }}
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
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop It
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg transition-colors duration-300"
                    >
                      <ShoppingCart className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#111827" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center"
          >
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
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Products;
