import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  Shield,
  RefreshCw,
} from "lucide-react";
import { NavLink } from "react-router";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: "Shipping & Delivery",
      icon: <Truck className="h-5 w-5 text-indigo-600" />,
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days. Express shipping is available for delivery within 1-2 business days. International shipping may take 7-14 business days depending on the destination.",
        },
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes, we offer free standard shipping on all orders over $50. For orders under $50, standard shipping is $5.99. Express shipping is available for an additional fee.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes, once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
        },
      ],
    },
    {
      category: "Payment & Security",
      icon: <CreditCard className="h-5 w-5 text-indigo-600" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment gateway.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.",
        },
        {
          question: "Do you offer installment payments?",
          answer:
            "Yes, we offer installment payment options through Afterpay and Klarna. You can split your purchase into 4 interest-free payments.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      icon: <RefreshCw className="h-5 w-5 text-indigo-600" />,
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Items must be unused, in their original packaging, and accompanied by a receipt. Some items may be subject to different return policies.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "You can initiate a return through your account dashboard or by contacting our customer service. We'll provide you with a return label and instructions.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your return, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method.",
        },
      ],
    },
    {
      category: "Product Information",
      icon: <ShoppingBag className="h-5 w-5 text-indigo-600" />,
      questions: [
        {
          question: "Are your products authentic?",
          answer:
            "Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors. We guarantee the authenticity of every item we sell.",
        },
        {
          question: "Do you offer product warranties?",
          answer:
            "Most of our products come with a manufacturer's warranty. The warranty period varies by product and brand. Please check the product description for specific warranty information.",
        },
        {
          question: "Can I get product recommendations?",
          answer:
            "Yes, our customer service team is happy to provide personalized product recommendations based on your needs and preferences. You can contact us through live chat, email, or phone.",
        },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping,
            returns, and more.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex items-center p-6 border-b border-gray-200">
                <div className="mr-4">{category.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, index) => {
                  const questionIndex = categoryIndex * 3 + index;
                  return (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleAccordion(questionIndex)}
                        className="flex items-center justify-between w-full text-left cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-medium text-gray-900">
                          {item.question}
                        </span>
                        <motion.div
                          animate={{
                            rotate: activeIndex === questionIndex ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeIndex === questionIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-gray-600">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Still have questions? Our support team is here to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            <NavLink to="/contact">Contact Support</NavLink>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQs;
