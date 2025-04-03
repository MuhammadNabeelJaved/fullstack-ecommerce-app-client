import React from "react";

const Hero = () => {
  return (
    <>
      <div className="relative bg-gradient-to-r from-gray-100 to-white overflow-hidden">
        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content - Text */}
            <div className="space-y-4 sm:space-y-6 z-10 order-2 md:order-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Our <span className="text-indigo-600">Premium</span>{" "}
                Collection
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                Explore our curated selection of high-quality products designed
                to elevate your lifestyle with elegance and innovation.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2 justify-center md:justify-start">
                <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                  Shop Now
                </button>
                <button className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
                  View Catalog
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 mt-4 border-t border-gray-200 justify-center md:justify-start">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    5K+
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">Products</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    98%
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Satisfaction
                  </p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    24/7
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Product Display */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0">
              <div className="absolute w-full h-full bg-gradient-to-r from-gray-200 to-white rounded-2xl transform rotate-3 shadow-xl"></div>
              <div className="absolute w-full h-full bg-white rounded-2xl transform -rotate-3 shadow-xl"></div>
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl z-10">
                {/* This would be replaced with an actual 3D model or product image */}
                <div className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full shadow-2xl animate-float flex items-center justify-center">
                  <div className="w-36 sm:w-40 md:w-48 h-36 sm:h-40 md:h-48 bg-white rounded-full shadow-inner flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-800">
                      3D Product
                    </span>
                  </div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute top-1/4 left-1/4 w-6 sm:w-8 h-6 sm:h-8 bg-indigo-600 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-gray-800 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute top-1/2 right-1/3 w-4 sm:w-6 h-4 sm:h-6 bg-gray-400 rounded-full opacity-80 animate-ping"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden sm:block absolute top-0 right-0 -mt-20 -mr-20 w-60 sm:w-80 h-60 sm:h-80 bg-gray-200 rounded-full opacity-50"></div>
        <div className="hidden sm:block absolute bottom-0 left-0 -mb-20 -ml-20 w-40 sm:w-60 h-40 sm:h-60 bg-indigo-100 rounded-full opacity-30"></div>
      </div>
    </>
  );
};

export default Hero;
