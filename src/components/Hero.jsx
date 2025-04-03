import React, { useState, useEffect } from "react";

const Hero = () => {
  const [productCount, setProductCount] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [support, setSupport] = useState(0);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setProductCount(prev => prev < 5000 ? prev + 100 : 5000);
    }, 20);

    const satisfactionInterval = setInterval(() => {
      setSatisfaction(prev => prev < 98 ? prev + 2 : 98);
    }, 30);

    const supportInterval = setInterval(() => {
      setSupport(prev => prev < 24 ? prev + 1 : 24);
    }, 50);

    return () => {
      clearInterval(productInterval);
      clearInterval(satisfactionInterval);
      clearInterval(supportInterval);
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-gray-100 to-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content - Text */}
          <div className="space-y-8 z-10 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
              Discover Our <span className="text-indigo-600">Premium</span>{" "}
              Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
              Explore our curated selection of high-quality products designed to
              elevate your lifestyle with elegance and innovation.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6 justify-center md:justify-start">
              <button className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full font-medium transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                Shop Now
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 px-10 py-4 rounded-full font-medium transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                View Catalog
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 mt-4 border-t border-gray-200 justify-center md:justify-start">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {productCount.toLocaleString()}+
                </p>
                <p className="text-sm sm:text-base text-gray-600">Products</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {satisfaction}%
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Satisfaction
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {support}/7
                </p>
                <p className="text-sm sm:text-base text-gray-600">Support</p>
              </div>
            </div>
          </div>

          {/* Right Content - Product Display */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0">
            <div className="absolute w-full h-full bg-gradient-to-r from-gray-200 to-white rounded-[3rem] transform rotate-3 shadow-2xl"></div>
            <div className="absolute w-full h-full bg-white rounded-[3rem] transform -rotate-3 shadow-2xl"></div>
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2.5rem] z-10">
              {/* Product Image Container */}
              <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full shadow-2xl animate-float flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-full shadow-inner flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    3D Product
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-indigo-600 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gray-800 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gray-400 rounded-full opacity-80 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-gray-200 rounded-full opacity-50"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-indigo-100 rounded-full opacity-30"></div>
    </div>
  );
};

export default Hero;
