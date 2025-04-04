import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  RiMailLine, 
  RiLockLine, 
  RiEyeLine, 
  RiEyeOffLine, 
  RiGoogleFill, 
  RiFacebookFill,
  RiUserLine,
  RiCheckLine,
  RiShieldCheckLine
} from 'react-icons/ri';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false
    }
  });

  const password = watch('password');
  
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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      // Replace with actual registration logic
    } catch (error) {
      console.error('Registration error:', error);
      setFormError('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Medium';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0:
        return 'bg-red-500';
      case 1:
        return 'bg-orange-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-green-500';
      case 4:
        return 'bg-green-600';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-indigo-50/50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100"
      >
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Create Account</h2>
            <p className="text-gray-500">Sign up to get started with ShopNow</p>
          </div>
          
          {formError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm"
            >
              {formError}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiUserLine className="text-gray-400" />
                </div>
                <input
                  {...register("fullName", { 
                    required: "Name is required" 
                  })}
                  type="text"
                  id="fullName"
                  className={`block w-full pl-11 pr-3 py-3.5 border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl bg-gray-50/50 shadow-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-colors`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.fullName.message}
                </motion.p>
              )}
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiMailLine className="text-gray-400" />
                </div>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email"
                    }
                  })}
                  type="email"
                  id="email"
                  className={`block w-full pl-11 pr-3 py-3.5 border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl bg-gray-50/50 shadow-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-colors`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiLockLine className="text-gray-400" />
                </div>
                <input
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`block w-full pl-11 pr-11 py-3.5 border ${
                    errors.password ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl bg-gray-50/50 shadow-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-colors`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="h-5 w-5" />
                    ) : (
                      <RiEyeLine className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
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
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 bg-gray-50 p-3 rounded-xl border border-gray-200"
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
                    <span className={`text-xs ml-2 font-medium ${
                      passwordStrength <= 1 ? 'text-red-500' : 
                      passwordStrength === 2 ? 'text-yellow-500' : 
                      'text-green-500'
                    }`}>{getPasswordStrengthText()}</span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1.5">
                    <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                      {password.length >= 8 ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                      {/[A-Z]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one uppercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                      {/[0-9]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one number
                    </li>
                    <li className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}`}>
                      {/[^A-Za-z0-9]/.test(password) ? (
                        <RiCheckLine className="mr-1.5 text-green-600" />
                      ) : (
                        <span className="w-4 h-4 mr-1.5 flex items-center justify-center rounded-full border border-gray-300"></span>
                      )}
                      At least one special character
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiLockLine className="text-gray-400" />
                </div>
                <input
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className={`block w-full pl-11 pr-11 py-3.5 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl bg-gray-50/50 shadow-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-colors`}
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <RiEyeOffLine className="h-5 w-5" />
                    ) : (
                      <RiEyeLine className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
            
            {/* Terms and Conditions */}
            <div className="mt-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    {...register("agreeTerms", { 
                      required: "You must agree to the terms and conditions" 
                    })}
                    id="agreeTerms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="agreeTerms" className="text-sm text-gray-600 cursor-pointer">
                    I agree to the <Link to="/terms" className="text-indigo-600 hover:text-indigo-500 transition-colors">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 transition-colors">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              {errors.agreeTerms && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.agreeTerms.message}
                </motion.p>
              )}
            </div>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-medium mt-6 ${
                isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center space-x-2`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <>
                  <RiShieldCheckLine className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RiGoogleFill className="h-5 w-5 text-red-500 mr-2" />
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RiFacebookFill className="h-5 w-5 text-blue-600 mr-2" />
                Facebook
              </motion.button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp; 