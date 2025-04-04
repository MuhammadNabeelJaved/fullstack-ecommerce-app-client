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
  ArrowRight,
  ArrowLeft,
  Quote,
} from "lucide-react";

// Sample review data
const reviews = [
  {
    id: 1,
    author: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
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
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
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
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
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
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
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
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
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

// Custom arrow components for slider
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-indigo-600 transition-all hover:shadow-lg"
      style={{ ...style }}
      onClick={onClick}
    >
      <ArrowRight size={20} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-indigo-600 transition-all hover:shadow-lg"
      style={{ ...style }}
      onClick={onClick}
    >
      <ArrowLeft size={20} />
    </div>
  );
};

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots custom-dots",
    customPaging: (i) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-indigo-500 transition-colors" />
    ),
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
        size={18}
        className={`${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50/50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Customer Reviews
          </h1>
          <div className="flex items-center justify-center mb-6">
            <div className="flex mr-3">
              {renderStars(5)}
            </div>
            <span className="text-3xl font-bold text-gray-900 mr-2">{calculateAverageRating()}</span>
            <span className="text-gray-500">/ 5</span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our customers have to say about our products and services.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{reviews.length}</div>
            <div className="text-gray-500 text-sm">Total Reviews</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {reviews.filter(r => r.rating >= 4).length}
            </div>
            <div className="text-gray-500 text-sm">Satisfied Customers</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {reviews.reduce((acc, r) => acc + r.likes, 0)}
            </div>
            <div className="text-gray-500 text-sm">Helpful Votes</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">100%</div>
            <div className="text-gray-500 text-sm">Verified Reviews</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            {/* Rating Filter */}
            <div className="flex items-center space-x-2 relative">
              <Filter className="h-5 w-5 text-indigo-500" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-gray-700"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2 relative">
              <span className="text-gray-600 text-sm hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-gray-700"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
                <option value="rating">Highest Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Featured Review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 max-w-4xl mx-auto relative"
        >
          <div className="absolute -left-8 top-10 text-indigo-200 opacity-50 transform rotate-180">
            <Quote size={80} />
          </div>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-8 border border-gray-100 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              <div className="flex-shrink-0">
                <img 
                  src={filteredReviews[0]?.avatar} 
                  alt={filteredReviews[0]?.author} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-50"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{filteredReviews[0]?.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <div className="flex">
                    {renderStars(filteredReviews[0]?.rating)}
                  </div>
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(filteredReviews[0]?.date).toLocaleDateString()}
                  </span>
                  {filteredReviews[0]?.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-lg font-light italic leading-relaxed">
              "{filteredReviews[0]?.comment}"
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">
                {filteredReviews[0]?.author} · {filteredReviews[0]?.product}
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">{filteredReviews[0]?.likes}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-sm">{filteredReviews[0]?.replies}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto max-w-4xl relative px-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Customer Reviews</h2>
          <Slider {...sliderSettings} className="reviews-slider">
            {filteredReviews.slice(1).map((review) => (
              <div key={review.id} className="px-4 py-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-50"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600">
                          by {review.author}
                        </span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                      <span className="mx-2">·</span>
                      {review.product}
                    </div>
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{review.likes}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm">{review.replies}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Write a Review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your feedback helps us improve and assists other customers in making informed decisions.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Write a Review
          </motion.button>
        </motion.div>
      </div>
      
      {/* Custom CSS for slider dots */}
      <style jsx>{`
        .reviews-slider .slick-dots {
          bottom: -30px;
        }
        .reviews-slider .slick-dots li button:before {
          display: none;
        }
        .reviews-slider .custom-dots {
          display: flex !important;
          justify-content: center;
          margin-top: 1rem;
        }
        .reviews-slider .custom-dots li {
          margin: 0 0.25rem;
        }
        .reviews-slider .custom-dots li.slick-active div {
          background-color: #4f46e5;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
