import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=2000&h=800",
      tag: "Special Discount",
      title: "Premium Sound System",
      offer: "offer 20% off",
      bgColor: "from-black/80 to-transparent",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2000&h=800",
      tag: "New Arrival",
      title: "Wireless Headphones",
      offer: "Save up to 30%",
      bgColor: "from-black/80 to-transparent",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=2000&h=800",
      tag: "Limited Time",
      title: "Smart Speakers",
      offer: "Get 25% off",
      bgColor: "from-black/80 to-transparent",
    },
  ];

  return (
    <div className="relative w-full">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`} />
            </div>

            {/* Content */}
            <div className="relative h-full z-10">
              <div className="container mx-auto h-full flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl text-white space-y-4 sm:space-y-6 lg:space-y-8 pl-[80px] md:pl-[100px] lg:pl-[120px]"
                >
                  <span className="inline-block bg-indigo-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-transform">
                    {slide.tag}
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl text-indigo-300 font-light">
                    {slide.offer}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Shop Now
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom styles for slider dots */}
      <style jsx>{`
        .hero-slider .slick-dots {
          bottom: 25px;
          z-index: 20;
        }
        .hero-slider .slick-dots li {
          margin: 0 6px;
        }
        .hero-slider .slick-dots li button:before {
          color: white;
          font-size: 10px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .hero-slider .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
          transform: scale(1.5);
        }
        .hero-slider .slick-prev,
        .hero-slider .slick-next {
          z-index: 20;
          width: 48px;
          height: 48px;
          transition: all 0.3s ease;
        }
        .hero-slider .slick-prev {
          left: 20px;
        }
        .hero-slider .slick-next {
          right: 20px;
        }
        .hero-slider .slick-prev:before,
        .hero-slider .slick-next:before {
          font-size: 48px;
          opacity: 0.75;
          transition: opacity 0.3s ease;
        }
        .hero-slider .slick-prev:hover:before,
        .hero-slider .slick-next:hover:before {
          opacity: 1;
        }
        @media (max-width: 1024px) {
          .hero-slider .slick-prev,
          .hero-slider .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
