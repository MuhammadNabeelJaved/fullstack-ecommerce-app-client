import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../apis/fetchApis.js";
import ProductCard from "./ProductCard.jsx";

const Product = () => {
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

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 center text-center">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
