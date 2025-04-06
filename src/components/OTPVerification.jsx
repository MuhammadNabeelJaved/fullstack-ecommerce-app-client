import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import apiService from "../apis/fetchApis.js";
import { useAuth } from "../contextApi/context.jsx";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { user, verifyEmail, currentUser } = useAuth(); // Get user data from context
  const location = useLocation();
  const { email } = location.state || {}; // Access the email from the state

  // Populate the inputRefs array with refs for each input
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer for resend functionality
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle OTP input changes
  const handleChange = (index, value) => {
    // Only accept numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array with the new value
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Clear any previous errors
    if (error) setError("");

    // Auto-focus next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // If all digits are filled, validate the OTP
    if (newOTP.every((digit) => digit) && newOTP.join("").length === 6) {
      validateOtp(newOTP.join(""));
    }
  };

  // Handle backspace for navigation between inputs
  const handleKeyDown = (index, e) => {
    // If backspace is pressed and current input is empty, focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle pasting OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    // Check if pasted content contains only numbers
    if (!/^\d+$/.test(pastedData)) return;

    const newOTP = [...otp];

    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOTP[i] = pastedData[i];
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pastedData[i];
      }
    }

    setOtp(newOTP);

    // Focus the appropriate input based on paste length
    const focusIndex = Math.min(pastedData.length, 5);
    if (focusIndex < 6) {
      inputRefs.current[focusIndex].focus();
    }

    // Validate if all 6 digits are filled
    if (pastedData.length === 6) {
      validateOtp(pastedData);
    }
  };

  // Validate the OTP
  const validateOtp = async (otpValue) => {
    setLoading(true);
    const otpData = {
      code: otpValue,
      email: email,
    };
    const response = await apiService.verifyEmail(otpData); // Call the API to verify the OTP

    if (!response) {
      setLoading(false);
      setError("Failed to verify OTP. Please try again.");
      return;
    }

    verifyEmail(response); // Update user state in context
    console.log("OTP verification response:", response);
    user || currentUser ? navigate("/dashboard") : navigate("/signin"); // Redirect to dashboard or sign-in based on user state

    // Simulating API validation with a timeout
    setTimeout(() => {
      // For demo purposes, let's assume "123456" is a valid OTP
      if (otpValue === "123456") {
        setSuccess(true);
        setError("");

        // Redirect after successful verification
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Invalid OTP code. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  // Resend OTP
  const resendOtp = () => {
    if (resendDisabled) return;

    // Reset inputs
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current.forEach((input) => {
      if (input) input.value = "";
    });

    setError("");
    setSuccess(false);
    setTimeLeft(30);
    setResendDisabled(true);

    // Focus the first input
    inputRefs.current[0].focus();

    // Simulate sending a new OTP
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-xl"
      >
        <div>
          <Link
            to="/signin"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>

          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Verification Required
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            We've sent a 6-digit code to your email address. Please enter the
            code below to verify your account.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="mt-8 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 z-10 rounded-md">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-4 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center"
            >
              <CheckCircle size={20} className="mr-2 flex-shrink-0" />
              <span>OTP verified successfully! Redirecting...</span>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex items-center"
            >
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="flex justify-center gap-2 sm:gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="w-10 sm:w-12">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className="w-full h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:outline-none transition dark:bg-gray-700 dark:text-white"
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  disabled={loading || success}
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?
            </p>
            <button
              onClick={resendOtp}
              disabled={resendDisabled}
              className={`mt-2 inline-flex items-center text-sm ${
                resendDisabled
                  ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              }`}
            >
              <RefreshCw size={14} className="mr-1" />
              Resend OTP {resendDisabled && `(${timeLeft}s)`}
            </button>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>For demo purposes, the valid OTP is "123456"</p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
