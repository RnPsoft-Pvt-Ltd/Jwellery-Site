import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './layouts/components/AdminSidebar';

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    couponCode: '',
    description: '',
    status: true,
    discountAmount: '',
    startDate: '',
    endDate: '',
    freeShipping: false,
    discountType: '',
    minimumPurchaseAmount: '',
    minimumPurchaseQty: '',
    customerEmails: '',
    customerPurchaseAmount: '',
    productConditions: []
  });

  const [productRow, setProductRow] = useState({
    key: '',
    operator: '',
    value: '',
    minimumQuantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAddProduct = () => {
    if (productRow.key && productRow.operator && productRow.value) {
      setFormData(prev => ({
        ...prev,
        productConditions: [...prev.productConditions, productRow]
      }));
      setProductRow({
        key: '',
        operator: '',
        value: '',
        minimumQuantity: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pl-64 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-medium">Create a new coupon</h1>
          </div>

          <div className="space-y-6">
            {/* General Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">General</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Coupon code</label>
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-md"
                    placeholder="Enter coupon code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-200 rounded-md"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={() => handleToggleChange('status')}
                      className="sr-only"
                    />
                    <div
                      className={`block w-12 h-6 rounded-full ${
                        formData.status ? 'bg-emerald-600' : 'bg-gray-400'
                      } cursor-pointer`}
                    />
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        formData.status ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount amount</label>
                    <input
                      type="text"
                      name="discountAmount"
                      value={formData.discountAmount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Discount amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.freeShipping}
                      onChange={() => handleToggleChange('freeShipping')}
                      className="mr-2"
                    />
                    Free shipping?
                  </label>
                </div>
              </div>
            </div>

            {/* Discount Type Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Discount Type</h2>
              <div className="space-y-2">
                {['Fixed discount to entire order', 
                  'Percentage discount to entire order',
                  'Fixed discount to specific products',
                  'Percentage discount to specific products',
                  'Buy X get Y'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="discountType"
                      value={type}
                      checked={formData.discountType === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Order Conditions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Order conditions</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Minimum purchase amount</label>
                    <input
                      type="text"
                      name="minimumPurchaseAmount"
                      value={formData.minimumPurchaseAmount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter minimum purchase amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Minimum purchase qty</label>
                    <input
                      type="text"
                      name="minimumPurchaseQty"
                      value={formData.minimumPurchaseQty}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter minimum purchase qty"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Order must contains product matched bellow conditions(All)
                    </label>
                    <table className="w-full mb-2">
                      <thead>
                        <tr className="text-left">
                          <th>Key</th>
                          <th>Operator</th>
                          <th>Value</th>
                          <th>Minimum quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.productConditions.map((condition, index) => (
                          <tr key={index}>
                            <td>{condition.key}</td>
                            <td>{condition.operator}</td>
                            <td>{condition.value}</td>
                            <td>{condition.minimumQuantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      onClick={handleAddProduct}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      + Add product
                    </button>
                  </div>
                </div>
              </div>

              {/* Customer Conditions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Customer conditions</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Customer group</label>
                    <select
                      className="w-full p-2 border border-gray-200 rounded-md"
                      defaultValue=""
                    >
                      <option value="" disabled>Select...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Customer email (empty for all)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="customerEmails"
                        value={formData.customerEmails}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md pr-10"
                        placeholder="Enter customer emails"
                      />
                      <span className="absolute right-2 top-2">
                        ✉️
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Use comma when you have multi email
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Customer&apos;s purchase</label>
                    <input
                      type="text"
                      name="customerPurchaseAmount"
                      value={formData.customerPurchaseAmount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter purchased amount"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum purchased amount
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between py-4">
            <button className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50">
              Cancel
            </button>
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
              Save
            </button>
          </div>
        </div>
      </main>

      <footer className="pl-64 p-6 text-gray-500 text-sm">
        © 2022 Evershop. All Rights Reserved.<br />
        Version 1.2.2
      </footer>
    </div>
  );
};

export default CreateCoupon;