import React from "react";
import Hero from "../components/Hero";
import Products from "../components/Products.jsx";
import Reviews from "../components/Reviews.jsx";
import Faqs from "../components/Faqs.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <Reviews />
      <Faqs />
    </div>
  );
};

export default Home;
