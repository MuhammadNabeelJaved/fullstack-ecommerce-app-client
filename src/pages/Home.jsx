import React from "react";
import Hero from "../components/Hero.jsx";
import Products from "../components/Products.jsx";
import ProductView from "../components/ProductView.jsx";
const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <ProductView />
    </div>
  );
};

export default Home;
