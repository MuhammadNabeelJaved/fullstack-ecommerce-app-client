import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products.jsx";
import ProductView from "../components/ProductView.jsx";
import Reviews from "../components/Reviews.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <Reviews />
      <ProductView />
    </div>
  );
};

export default Home;
