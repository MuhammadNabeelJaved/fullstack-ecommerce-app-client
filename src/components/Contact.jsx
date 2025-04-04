import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      console.log("Form submitted:", data);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contact@example.com",
      link: "mailto:contact@example.com",
    },
    {
      icon: Phone,
      title: "Phone",
      info: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      info: "123 Business Street, Suite 100, New York, NY 10001",
      link: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { icon: Twitter, url: "https://twitter.com" },
    { icon: Facebook, url: "https://facebook.com" },
    { icon: Instagram, url: "https://instagram.com" },
    { icon: Linkedin, url: "https://linkedin.com" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", { 
                    required: "Subject is required",
                    minLength: {
                      value: 5,
                      message: "Subject must be at least 5 characters"
                    }
                  })}
                  className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  {...register("message", { 
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters"
                    }
                  })}
                  rows="4"
                  className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Send className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{item.info}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center space-x-6 pt-8"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
