import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiTruckLine,
  RiTimeLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiSearchLine,
} from 'react-icons/ri';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: '#ORD-001',
      date: '2024-03-15',
      status: 'Delivered',
      total: '$156.00',
      items: [
        {
          name: 'Wireless Headphones',
          quantity: 1,
          price: '$89.99',
        },
        {
          name: 'Bluetooth Speaker',
          quantity: 2,
          price: '$66.01',
        },
      ],
      tracking: {
        number: 'TRK123456789',
        carrier: 'FedEx',
        status: 'Delivered',
        steps: [
          { status: 'Order Placed', date: '2024-03-12', completed: true },
          { status: 'Processing', date: '2024-03-13', completed: true },
          { status: 'Shipped', date: '2024-03-14', completed: true },
          { status: 'Delivered', date: '2024-03-15', completed: true },
        ],
      },
    },
    {
      id: '#ORD-002',
      date: '2024-03-14',
      status: 'Processing',
      total: '$249.99',
      items: [
        {
          name: 'Smart Speaker',
          quantity: 1,
          price: '$249.99',
        },
      ],
      tracking: {
        number: 'TRK987654321',
        carrier: 'UPS',
        status: 'Processing',
        steps: [
          { status: 'Order Placed', date: '2024-03-14', completed: true },
          { status: 'Processing', date: '2024-03-14', completed: true },
          { status: 'Shipped', date: null, completed: false },
          { status: 'Delivered', date: null, completed: false },
        ],
      },
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <RiCheckboxCircleLine className="text-green-600" />;
      case 'processing':
        return <RiTimeLine className="text-yellow-600" />;
      case 'shipped':
        return <RiTruckLine className="text-blue-600" />;
      case 'cancelled':
        return <RiCloseCircleLine className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 border-b">
              <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Information */}
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Tracking Information</h4>
              <div className="flex items-center space-x-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium text-gray-900">{order.tracking.number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrier</p>
                  <p className="font-medium text-gray-900">{order.tracking.carrier}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {order.tracking.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          step.completed
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'bg-white border-gray-300'
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{step.status}</p>
                        {step.date && (
                          <p className="text-sm text-gray-500">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 