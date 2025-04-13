import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";
import products from "../data/products.data.js";
import ProductCard from "./ProductCard";
import apiService from "../apis/fetchApis.js";

const Products = () => {
  const { getProducts } = apiService;
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);


  console.log("Filtered products is:", filteredProducts);

  useEffect(() => {
    const getAllProducts = async () => {
      const productData = await getProducts();
      setFilteredProducts(productData?.data);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Apply category filtering whenever selectedCategory changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      // Map category values to keywords to look for in product names/descriptions
      const categoryKeywords = {
        headphones: ["headphone", "earphone", "earbud"],
        speakers: ["speaker", "sound system", "audio system"],
        wearables: ["watch", "fitness tracker", "smart watch"],
        accessories: ["mouse", "keyboard", "power bank", "camera"],
      };

      const keywords = categoryKeywords[selectedCategory] || [selectedCategory];

      const filtered = products.filter((product) => {
        const name = product.name.toLowerCase();
        const description = product.description?.toLowerCase() || "";

        // Check if any of the keywords match in name or description
        return keywords.some(
          (keyword) => name.includes(keyword) || description.includes(keyword)
        );
      });

      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

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

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const categories = [
    { name: "All Products", value: "all" },
    { name: "Headphones", value: "headphones" },
    { name: "Speakers", value: "speakers" },
    { name: "Wearables", value: "wearables" },
    { name: "Accessories", value: "accessories" },
  ];

  const handleCategoryChange = (category) => {
    // Reset the animation controls when changing category
    controls.start("hidden").then(() => {
      setSelectedCategory(category);
      // Give a slight delay before showing the new products
      setTimeout(() => {
        controls.start("visible");
      }, 100);
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container px-4 mx-auto">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium audio products and accessories
            designed to enhance your listening experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.length >= 0 ? (
            filteredProducts.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              variants={itemVariants}
              className="col-span-full py-12 text-center"
            >
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                Try selecting a different category or check back later.
              </p>
              <motion.button
                onClick={() => handleCategoryChange("all")}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <NavLink to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 shadow-md"
            >
              View All Products
            </motion.button>
          </NavLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
