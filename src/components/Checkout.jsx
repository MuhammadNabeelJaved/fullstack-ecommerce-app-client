import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Truck, Shield, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    }
  });

  const onSubmit = (data) => {
    // Proceed with checkout
    console.log("Form submitted:", data);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="text-xs text-gray-500">Enter your details</p>
              </div>
            </div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div
                className={`h-full ${
                  activeStep >= 2 ? "bg-indigo-600" : "bg-gray-200"
                }`}
                style={{ width: activeStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= 2
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Payment</p>
                <p className="text-xs text-gray-500">Enter card details</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center mb-6">
                  <Truck className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register("firstName", { required: "First name is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register("lastName", { required: "Last name is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register("address", { required: "Address is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      {...register("state", { required: "State is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      {...register("zipCode", { required: "ZIP code is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center mb-6">
                  <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      {...register("cardNumber", { 
                        required: "Card number is required",
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: "Please enter a valid 16-digit card number"
                        }
                      })}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      {...register("cardName", { required: "Name on card is required" })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-500">{errors.cardName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      {...register("expiryDate", { 
                        required: "Expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                          message: "Please use MM/YY format"
                        }
                      })}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      {...register("cvv", { 
                        required: "CVV is required",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "CVV must be 3 or 4 digits"
                        }
                      })}
                      placeholder="123"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Security Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center space-x-2 text-sm text-gray-500"
              >
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Complete Purchase
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">$479.98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$39.20</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold">$529.17</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;