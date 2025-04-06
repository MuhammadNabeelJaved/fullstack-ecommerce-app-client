import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Ensure you're using 'react-router-dom'
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useAuth } from "../contextApi/context.jsx";
import apiService from "../apis/fetchApis.js";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isLoggedIn, currentUser, user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      const response = await apiService.loginUser(data, login); // Pass the login function
      if (!response) {
        console.error("Login failed. No response received.");
        return;
      }
      // Redirect to dashboard if logged in
      navigate(`/dashboard/user/${response.data?.userData?._id}`);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-16">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Log In</h2>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                id="email"
                placeholder="Your email"
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className={`w-full px-4 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-500 focus:outline-none cursor-pointer hover:text-blue-500 transition-colors"
              >
                {showPassword ? (
                  <RiEyeOffLine className="h-5 w-5" />
                ) : (
                  <RiEyeLine className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              to="/signup"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Don't have an account? Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Image and Quote */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center relative overflow-hidden"
      >
        <div className="max-w-lg px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="text-2xl font-light mb-2">
              The future belongs to those who
            </div>
            <div className="text-2xl font-light">
              <span className="text-blue-500 font-medium">believe</span> in the{" "}
              <span className="text-blue-500 font-medium">
                beauty of their dreams
              </span>
              .
            </div>
            <div className="mt-2 text-gray-600 text-sm">
              - Eleanor Roosevelt
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Workspace"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/60 to-transparent z-0"></div>
      </motion.div>
    </div>
  );
};

export default SignIn;
