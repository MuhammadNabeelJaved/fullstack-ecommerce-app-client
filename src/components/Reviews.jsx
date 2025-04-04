import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Star,
  Filter,
  ChevronDown,
  ThumbsUp,
  MessageSquare,
  Calendar,
} from "lucide-react";

// Sample review data
const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    date: "2024-03-15",
    title: "Excellent Product!",
    comment:
      "This product exceeded my expectations. The quality is outstanding and it's very easy to use. I would definitely recommend it to others.",
    likes: 24,
    replies: 5,
    verified: true,
    product: "Wireless Headphones",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    date: "2024-03-10",
    title: "Great Value for Money",
    comment:
      "Good quality product at a reasonable price. The features are impressive and it works as advertised. Minor improvements could be made to the design.",
    likes: 18,
    replies: 3,
    verified: true,
    product: "Smart Watch",
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    date: "2024-03-05",
    title: "Best Purchase Ever",
    comment:
      "I've been using this product for a month now and I'm extremely satisfied. The performance is excellent and the customer service is top-notch.",
    likes: 32,
    replies: 8,
    verified: true,
    product: "Laptop Pro",
  },
  {
    id: 4,
    author: "Sarah Wilson",
    rating: 3,
    date: "2024-03-01",
    title: "Good but Could Be Better",
    comment:
      "The product works well but has some minor issues. The battery life could be improved and the interface is a bit complicated.",
    likes: 12,
    replies: 2,
    verified: true,
    product: "Camera Kit",
  },
  {
    id: 5,
    author: "David Brown",
    rating: 5,
    date: "2024-02-28",
    title: "Perfect for My Needs",
    comment:
      "Exactly what I was looking for. The features are comprehensive and the build quality is excellent. Very happy with my purchase.",
    likes: 28,
    replies: 6,
    verified: true,
    product: "Gaming Console",
  },
];

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [expandedReview, setExpandedReview] = useState(null);

  const filteredReviews = reviews
    .filter((review) => {
      if (selectedRating === "all") return true;
      return review.rating === parseInt(selectedRating);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.date) - new Date(a.date);
        case "helpful":
          return b.likes - a.likes;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our customers have to say about our products and services.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Rating Filter */}
            <div className="flex items-center space-x-2 relative">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none cursor-pointer" />
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none cursor-pointer" />
            </div>
          </div>
        </motion.div>

        {/* Reviews Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <Slider {...sliderSettings}>
            {filteredReviews.map((review) => (
              <div key={review.id} className="px-4 py-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="ml-2 text-sm text-gray-600">
                          by {review.author}
                        </span>
                        {review.verified && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        <span>{review.likes}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                        onClick={() =>
                          setExpandedReview(
                            expandedReview === review.id ? null : review.id
                          )
                        }
                      >
                        <MessageSquare className="h-5 w-5 mr-1" />
                        <span>{review.replies}</span>
                      </motion.button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {review.product}
                    </span>
                  </div>

                  {/* Replies Section */}
                  <AnimatePresence>
                    {expandedReview === review.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="space-y-4">
                          {[...Array(review.replies)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-gray-50 p-4 rounded-lg"
                            >
                              <div className="flex items-center mb-2">
                                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Support Team
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      new Date(review.date).getTime() +
                                        (i + 1) * 86400000
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                Thank you for your feedback! We're glad to hear
                                you're enjoying the product.
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
