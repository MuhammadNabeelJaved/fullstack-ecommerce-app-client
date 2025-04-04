import React from "react";
import { motion } from "framer-motion";
import { Cookie, Shield, Settings, Clock, AlertTriangle, HelpCircle } from "lucide-react";

const CookiePolicy = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <Cookie className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "What are Cookies?",
          text: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and allow certain features to work properly.",
        },
        {
          title: "Why We Use Cookies",
          text: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. Cookies help us understand how you interact with our website and improve our services.",
        },
      ],
    },
    {
      id: "types",
      title: "Types of Cookies We Use",
      icon: <Settings className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Essential Cookies",
          text: "These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.",
        },
        {
          title: "Analytics Cookies",
          text: "We use analytics cookies to understand how visitors interact with our website. This helps us improve our website's functionality and user experience.",
        },
        {
          title: "Marketing Cookies",
          text: "These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users.",
        },
      ],
    },
    {
      id: "duration",
      title: "Cookie Duration",
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Session Cookies",
          text: "These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you navigate through the website.",
        },
        {
          title: "Persistent Cookies",
          text: "These cookies remain on your device for a set period of time or until you delete them. They help us remember your preferences and improve your experience.",
        },
      ],
    },
    {
      id: "control",
      title: "Cookie Control",
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Managing Cookies",
          text: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.",
        },
        {
          title: "Browser Settings",
          text: "Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 'options' or 'preferences' menu of your browser.",
        },
      ],
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: <AlertTriangle className="h-6 w-6 text-indigo-600" />,
      content: [
        {
          title: "Changes to This Policy",
          text: "We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the 'Last Updated' date.",
        },
        {
          title: "Your Consent",
          text: "By continuing to use our website, you agree to our use of cookies as described in this policy. If you do not agree to our use of cookies, please adjust your browser settings accordingly.",
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
            <Cookie className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about how we use cookies and how you can control them. By using
            our website, you agree to our use of cookies as described in this
            policy.
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
            If you have any questions about our Cookie Policy, please contact us.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy; 