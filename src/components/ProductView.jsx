import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Minus, Plus, Truck, RotateCcw } from "lucide-react";

const ProductView = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const colors = [
    { name: "Red", value: "red", class: "bg-red-400" },
    { name: "Space Gray", value: "gray", class: "bg-gray-700" },
    { name: "Sage", value: "sage", class: "bg-green-200" },
    { name: "Silver", value: "silver", class: "bg-gray-200" },
    { name: "Sky Blue", value: "blue", class: "bg-blue-700" },
  ];

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Amazing sound quality and the noise cancellation is incredible!",
      verified: true,
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Great headphones, very comfortable for long listening sessions.",
      verified: true,
    },
    // Add more reviews as needed
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-green-500 text-green-500" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16">
        {/* Left Column - Product Images */}
        <div className="space-y-3 sm:space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden">
            <motion.img
              src="https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kcyUyMG1heHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Airpods Max"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWlycG9kcyUyMG1heHxlbnwwfHwwfHx8MA%3D%3D",
              "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlycG9kcyUyMG1heHxlbnwwfHwwfHx8MA%3D%3D",
              "https://images.unsplash.com/photo-1649859394614-dc4f7290b7f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFpcnBvZHMlMjBtYXh8ZW58MHx8MHx8fDA%3D",
              "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md sm:rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-4 sm:space-y-6 mt-4 md:mt-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Airpods Max
            </h1>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center">{renderStars(5)}</div>
              <span className="text-xs sm:text-sm text-gray-500">
                (121 reviews)
              </span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-base text-gray-600">
              A perfect balance of exhilarating high-fidelity audio and the
              effortless magic of AirPods.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                $549.00
              </span>
              <span className="text-sm sm:text-lg text-gray-500">
                or 99.99/month
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              Suggested payments with 6 months special financing
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm font-medium text-gray-900">
              Choose a Color
            </h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    selectedColor === color.value
                      ? "ring-2 ring-indigo-600 ring-offset-2"
                      : ""
                  }`}
                >
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${color.class}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={decreaseQuantity}
                  className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-50"
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-50"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
              <span className="text-xs sm:text-sm text-orange-500">
                Only 12 items Left! Don't miss it
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full cursor-pointer bg-gray-900 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-black transition-colors duration-200">
                Buy Now
              </button>
              <button className="w-full cursor-pointer border border-gray-300 text-gray-900 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="flex items-start sm:items-center gap-3 text-gray-600">
              <Truck className="h-5 w-5 flex-shrink-0 mt-1 sm:mt-0" />
              <div>
                <h4 className="font-medium text-sm sm:text-base">
                  Free Delivery
                </h4>
                <button className="text-xs sm:text-sm text-gray-500 underline">
                  Enter your Postal code for Delivery Availability
                </button>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3 text-gray-600">
              <RotateCcw className="h-5 w-5 flex-shrink-0 mt-1 sm:mt-0" />
              <div>
                <h4 className="font-medium text-sm sm:text-base">
                  Return Delivery
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  Free 30days Delivery Returns.{" "}
                  <button className="underline">Details</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 sm:mt-16 border-t border-gray-200 pt-6 sm:pt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-8">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                <div>
                  <h3 className="font-medium text-gray-900">{review.author}</h3>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    {review.verified && (
                      <span className="text-xs text-green-600 font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">
                  {review.date}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 sm:mt-8 text-center">
          <button className="text-indigo-600 text-sm sm:text-base font-medium hover:text-indigo-500">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
