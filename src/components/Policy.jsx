import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, RefreshCw, Truck, CreditCard, HelpCircle } from "lucide-react";

const Policy = () => {
  const [activePolicy, setActivePolicy] = useState("privacy");

  const policies = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Information We Collect",
          text: "We collect information that you provide directly to us, including your name, email address, postal address, phone number, and payment information. We also collect information about your device and how you interact with our website.",
        },
        {
          title: "How We Use Your Information",
          text: "We use the information we collect to provide our services, process your transactions, communicate with you, and improve our website. We may also use your information for marketing purposes with your consent.",
        },
        {
          title: "Information Sharing",
          text: "We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.",
        },
      ],
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Acceptance of Terms",
          text: "By accessing and using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
        },
        {
          title: "User Conduct",
          text: "You agree to use our website only for lawful purposes and in accordance with these Terms of Service. You are responsible for maintaining the confidentiality of your account information.",
        },
        {
          title: "Intellectual Property",
          text: "All content on our website, including text, graphics, logos, and images, is the property of our company and is protected by copyright and other intellectual property laws.",
        },
      ],
    },
    {
      id: "returns",
      title: "Return Policy",
      icon: <RefreshCw className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Eligibility for Returns",
          text: "Items must be returned within 30 days of the delivery date. Items must be unused, in their original packaging, and accompanied by a receipt or proof of purchase.",
        },
        {
          title: "Return Process",
          text: "To initiate a return, please contact our customer service team. We will provide you with a return authorization number and instructions for returning your items.",
        },
        {
          title: "Refunds",
          text: "Refunds will be processed within 5-7 business days after we receive your returned items. The refund will be issued to the original payment method used for the purchase.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping Policy",
      icon: <Truck className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Shipping Methods",
          text: "We offer standard and express shipping options. Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days.",
        },
        {
          title: "Shipping Costs",
          text: "Shipping costs are calculated based on the weight of your order and your location. We offer free standard shipping on orders over $50.",
        },
        {
          title: "International Shipping",
          text: "We ship to most countries worldwide. International shipping times vary by destination and may be subject to customs delays.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Policy",
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Accepted Payment Methods",
          text: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods.",
        },
        {
          title: "Security",
          text: "All payment information is encrypted and processed securely. We do not store your full credit card information on our servers.",
        },
        {
          title: "Pricing",
          text: "All prices are in USD and include applicable taxes. We reserve the right to change prices at any time without notice.",
        },
      ],
    },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review our policies to understand how we handle your information and
            ensure a smooth shopping experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Policy Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Select a Policy
                </h2>
                <div className="space-y-2">
                  {policies.map((policy) => (
                    <button
                      key={policy.id}
                      onClick={() => setActivePolicy(policy.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors cursor-pointer ${
                        activePolicy === policy.id
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {policy.icon}
                      <span className="ml-3 font-medium">{policy.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Policy Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {policies
                  .filter((policy) => policy.id === activePolicy)
                  .map((policy) => (
                    <div key={policy.id}>
                      <div className="flex items-center mb-6">
                        {policy.icon}
                        <h2 className="text-2xl font-bold text-gray-900 ml-3">
                          {policy.title}
                        </h2>
                      </div>
                      <div className="space-y-6">
                        {policy.content.map((section, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-gray-200 pb-6 last:border-0"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {section.title}
                            </h3>
                            <p className="text-gray-600">{section.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
