import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import apiService from "../apis/fetchApis.js";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { RiEyeLine, RiEyeOffLine, RiCheckLine } from "react-icons/ri";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (password) {
      calculatePasswordStrength(password);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-green-600";
      default:
        return "bg-gray-200";
    }
  };

  const onSubmit = async (data) => {
    if (!data) return null;
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      apiService.registerUser(data);
      // Handle successful registration logic here
      navigate("/verify-otp", { state: { email: data.email } });
      console.log("Form submitted:", data);
      // Replace with actual registration logic
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-16">
      {/* Left side - Image and Quote */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
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
              The only way to do{" "}
              <span className="text-blue-500 font-medium">great work</span> is
              to
            </div>
            <div className="text-2xl font-light">
              <span className="text-blue-500 font-medium">
                love what you do
              </span>
              .
            </div>
            <div className="mt-2 text-gray-600 text-sm">- Steve Jobs</div>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1495055154266-57bbdeada43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Plant"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/60 to-gray-100 z-0"></div>
      </motion.div>

      {/* Right side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white order-first md:order-last"
      >
        <div className="max-w-md w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign Up</h2>
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                id="name"
                placeholder="Your name"
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

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
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
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
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer hover:text-blue-500 transition-colors"
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

              {/* Password strength meter */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-1.5 bg-gray-200 flex-1 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength * 25}%` }}
                        className={`h-full ${getPasswordStrengthColor()}`}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>
                    <span
                      className={`text-xs ml-2 font-medium ${
                        passwordStrength <= 1
                          ? "text-red-500"
                          : passwordStrength === 2
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1.5">
                    <li
                      className={`flex items-center ${
                        password.length >= 8 ? "text-green-600" : ""
                      }`}
                    >
                      {password.length >= 8 ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least 8 characters
                    </li>
                    <li
                      className={`flex items-center ${
                        /[A-Z]/.test(password) ? "text-green-600" : ""
                      }`}
                    >
                      {/[A-Z]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one uppercase letter
                    </li>
                    <li
                      className={`flex items-center ${
                        /[0-9]/.test(password) ? "text-green-600" : ""
                      }`}
                    >
                      {/[0-9]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one number
                    </li>
                    <li
                      className={`flex items-center ${
                        /[^\w\s]/.test(password) ? "text-green-600" : ""
                      }`}
                    >
                      {/[^\w\s]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one special character
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label htmlFor="agreeTerms" className="flex items-center">
                <input
                  {...register("agreeTerms", {
                    required: "You must agree to the terms and conditions",
                  })}
                  type="checkbox"
                  id="agreeTerms"
                  className="mr-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.agreeTerms.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600 mb-4">
              Already have an account?
            </p>
            <Link to="/signin">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-100 text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 focus:outline-none border border-gray-300 cursor-pointer"
              >
                Log In to Your Account
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
