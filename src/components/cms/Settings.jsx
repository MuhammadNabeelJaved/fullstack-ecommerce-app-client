import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Settings as SettingsIcon,
  CreditCard,
  Truck,
  Mail,
  Bell,
  Shield,
  Globe,
  Smartphone,
  Users,
  HelpCircle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formState, setFormState] = useState({
    // General Settings
    siteName: 'E-Commerce Store',
    siteDescription: 'Your one-stop shop for quality products',
    supportEmail: 'support@example.com',
    contactPhone: '+1 (555) 123-4567',
    
    // Payment Settings
    currencyCode: 'USD',
    currencySymbol: '$',
    paypalEnabled: true,
    stripeEnabled: true,
    cardPaymentEnabled: true,
    cashOnDeliveryEnabled: true,
    
    // Shipping Settings
    enableFreeShipping: true,
    freeShippingThreshold: 100,
    defaultShippingFee: 10,
    internationalShippingEnabled: true,
    internationalShippingFee: 25,
    
    // Email Settings
    enableOrderConfirmation: true,
    enableShippingUpdates: true,
    enableMarketingEmails: false,
    
    // Notification Settings
    enableStockAlerts: true,
    enableOrderAlerts: true,
    enableCustomerSignupAlerts: false,
    
    // Security Settings
    twoFactorAuthEnabled: false,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
    
    // Display Settings
    productsPerPage: 12,
    enableDarkMode: true,
    showOutOfStockProducts: true
  });
  
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : 
                    type === 'number' ? Number(value) : value;
    
    setFormState({
      ...formState,
      [name]: newValue
    });
    
    setIsDirty(true);
    setSaveSuccess(false);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsDirty(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // Tab definitions
  const tabs = [
    { id: 'general', label: 'General', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'shipping', label: 'Shipping', icon: <Truck className="w-5 h-5" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'display', label: 'Display', icon: <Smartphone className="w-5 h-5" /> }
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Store Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure your store settings and preferences</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isDirty || isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            !isDirty ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      
      {/* Success Message */}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400 px-4 py-3 rounded"
          role="alert"
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Settings saved successfully!</span>
          </div>
        </motion.div>
      )}
      
      {/* Settings Content */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-750 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Settings Form */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">General Settings</h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Store Name
                      </label>
                      <input
                        type="text"
                        name="siteName"
                        id="siteName"
                        value={formState.siteName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Support Email
                      </label>
                      <input
                        type="email"
                        name="supportEmail"
                        id="supportEmail"
                        value={formState.supportEmail}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Store Description
                      </label>
                      <textarea
                        name="siteDescription"
                        id="siteDescription"
                        rows="3"
                        value={formState.siteDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        name="contactPhone"
                        id="contactPhone"
                        value={formState.contactPhone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Settings</h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="currencyCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Currency Code
                      </label>
                      <select
                        name="currencyCode"
                        id="currencyCode"
                        value={formState.currencyCode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Currency Symbol
                      </label>
                      <input
                        type="text"
                        name="currencySymbol"
                        id="currencySymbol"
                        value={formState.currencySymbol}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Payment Methods
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="paypalEnabled"
                          id="paypalEnabled"
                          checked={formState.paypalEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label htmlFor="paypalEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          PayPal
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="stripeEnabled"
                          id="stripeEnabled"
                          checked={formState.stripeEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label htmlFor="stripeEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Stripe
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cardPaymentEnabled"
                          id="cardPaymentEnabled"
                          checked={formState.cardPaymentEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label htmlFor="cardPaymentEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Credit/Debit Card
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="cashOnDeliveryEnabled"
                          id="cashOnDeliveryEnabled"
                          checked={formState.cashOnDeliveryEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label htmlFor="cashOnDeliveryEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableFreeShipping"
                        id="enableFreeShipping"
                        checked={formState.enableFreeShipping}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableFreeShipping" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable free shipping for orders above a threshold
                      </label>
                    </div>
                    
                    {formState.enableFreeShipping && (
                      <div className="ml-6">
                        <label htmlFor="freeShippingThreshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Free Shipping Threshold ({formState.currencySymbol})
                        </label>
                        <input
                          type="number"
                          name="freeShippingThreshold"
                          id="freeShippingThreshold"
                          value={formState.freeShippingThreshold}
                          onChange={handleInputChange}
                          className="mt-1 block w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <label htmlFor="defaultShippingFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Default Domestic Shipping Fee ({formState.currencySymbol})
                      </label>
                      <input
                        type="number"
                        name="defaultShippingFee"
                        id="defaultShippingFee"
                        value={formState.defaultShippingFee}
                        onChange={handleInputChange}
                        className="mt-1 block w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="mt-6 flex items-center">
                      <input
                        type="checkbox"
                        name="internationalShippingEnabled"
                        id="internationalShippingEnabled"
                        checked={formState.internationalShippingEnabled}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="internationalShippingEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable international shipping
                      </label>
                    </div>
                    
                    {formState.internationalShippingEnabled && (
                      <div className="ml-6">
                        <label htmlFor="internationalShippingFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          International Shipping Fee ({formState.currencySymbol})
                        </label>
                        <input
                          type="number"
                          name="internationalShippingFee"
                          id="internationalShippingFee"
                          value={formState.internationalShippingFee}
                          onChange={handleInputChange}
                          className="mt-1 block w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableOrderConfirmation"
                        id="enableOrderConfirmation"
                        checked={formState.enableOrderConfirmation}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableOrderConfirmation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Send order confirmation emails
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableShippingUpdates"
                        id="enableShippingUpdates"
                        checked={formState.enableShippingUpdates}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableShippingUpdates" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Send shipping and delivery update emails
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableMarketingEmails"
                        id="enableMarketingEmails"
                        checked={formState.enableMarketingEmails}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableMarketingEmails" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Send marketing and promotional emails
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableStockAlerts"
                        id="enableStockAlerts"
                        checked={formState.enableStockAlerts}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableStockAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Receive low stock alerts
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableOrderAlerts"
                        id="enableOrderAlerts"
                        checked={formState.enableOrderAlerts}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableOrderAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Receive new order notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableCustomerSignupAlerts"
                        id="enableCustomerSignupAlerts"
                        checked={formState.enableCustomerSignupAlerts}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableCustomerSignupAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Receive new customer signup notifications
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="twoFactorAuthEnabled"
                        id="twoFactorAuthEnabled"
                        checked={formState.twoFactorAuthEnabled}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="twoFactorAuthEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable two-factor authentication for admin accounts
                      </label>
                    </div>
                    
                    <div>
                      <label htmlFor="passwordExpiryDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        name="passwordExpiryDays"
                        id="passwordExpiryDays"
                        value={formState.passwordExpiryDays}
                        onChange={handleInputChange}
                        className="mt-1 block w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Set to 0 to disable password expiry
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Maximum Login Attempts
                      </label>
                      <input
                        type="number"
                        name="maxLoginAttempts"
                        id="maxLoginAttempts"
                        value={formState.maxLoginAttempts}
                        onChange={handleInputChange}
                        className="mt-1 block w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Display Settings */}
              {activeTab === 'display' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Display Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="productsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Products Per Page
                      </label>
                      <select
                        name="productsPerPage"
                        id="productsPerPage"
                        value={formState.productsPerPage}
                        onChange={handleInputChange}
                        className="mt-1 block w-full sm:w-64 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
                      >
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={24}>24</option>
                        <option value={32}>32</option>
                        <option value={48}>48</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="enableDarkMode"
                        id="enableDarkMode"
                        checked={formState.enableDarkMode}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable dark mode option for customers
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="showOutOfStockProducts"
                        id="showOutOfStockProducts"
                        checked={formState.showOutOfStockProducts}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="showOutOfStockProducts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Show out of stock products
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 