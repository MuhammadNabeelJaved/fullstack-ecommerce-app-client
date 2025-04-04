import React from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Welcome",
          text: "Welcome to our e-commerce platform. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using our services.",
        },
        {
          title: "Agreement",
          text: "These Terms of Service constitute a legally binding agreement between you and our company. If you do not agree to these terms, please do not use our website or services.",
        },
      ],
    },
    {
      id: "account",
      title: "Account Terms",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Account Creation",
          text: "To use certain features of our website, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
        },
        {
          title: "Account Security",
          text: "You must notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this security obligation.",
        },
      ],
    },
    {
      id: "purchases",
      title: "Purchases and Payments",
      icon: <Lock className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Order Acceptance",
          text: "All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason, including but not limited to product availability, errors in product or pricing information, or problems identified by our fraud detection systems.",
        },
        {
          title: "Pricing and Payment",
          text: "All prices are in USD and include applicable taxes. We accept various payment methods as indicated on our website. You agree to provide current, complete, and accurate purchase and account information for all purchases made on our website.",
        },
      ],
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <AlertTriangle className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Ownership",
          text: "All content on our website, including text, graphics, logos, images, and software, is the property of our company and is protected by copyright and other intellectual property laws.",
        },
        {
          title: "Use Restrictions",
          text: "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.",
        },
      ],
    },
    {
      id: "limitations",
      title: "Limitations of Liability",
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Disclaimer",
          text: "Our website and services are provided on an 'as is' and 'as available' basis. We make no representations or warranties of any kind, express or implied, as to the operation of our website or the information, content, materials, or products included on our website.",
        },
        {
          title: "Limitation",
          text: "To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.",
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
            <FileText className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our website. By accessing
            or using our services, you agree to be bound by these terms.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-gray-900 ml-3">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + itemIndex) * 0.1 }}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            If you have any questions about these Terms of Service, please contact
            us.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 