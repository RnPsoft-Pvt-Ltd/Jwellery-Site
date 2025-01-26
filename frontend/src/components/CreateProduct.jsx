import React, { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import Sidebar from './Sidebar';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    weight: '',
    category: '',
    taxClass: 'None',
    description: '',
    status: 'enabled',
    visibility: 'visible',
    manageStock: 'yes',
    stockAvailability: 'yes',
    quantity: '',
    attributeGroup: 'Default',
    urlKey: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    color: '',
    size: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="pl-64 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-medium">Create a new product</h1>
          </div>

          <div className="flex gap-6">
            {/* Main Form Section */}
            <div className="flex-1 space-y-6">
              {/* General Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">General</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                        placeholder="SKU"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Price"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">USD</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Weight</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded-md"
                          placeholder="Weight"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">kg</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <button className="text-blue-500 hover:underline">Select category</button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tax class</label>
                    <select
                      name="taxClass"
                      value={formData.taxClass}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    >
                      <option>None</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Media</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">Drop your images here or browse</p>
                </div>
              </div>

              {/* SEO Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Search engine optimize</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Url key</label>
                    <input
                      type="text"
                      name="urlKey"
                      value={formData.urlKey}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta keywords</label>
                    <input
                      type="text"
                      name="metaKeywords"
                      value={formData.metaKeywords}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta description</label>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md h-32"
                    />
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

            {/* Right Sidebar */}
            <div className="w-80 space-y-6">
              {/* Product Status */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Product status</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.status === 'disabled'}
                          onChange={() => handleRadioChange('status', 'disabled')}
                          className="mr-2"
                        />
                        Disabled
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.status === 'enabled'}
                          onChange={() => handleRadioChange('status', 'enabled')}
                          className="mr-2"
                        />
                        Enabled
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Visibility</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.visibility === 'not-visible'}
                          onChange={() => handleRadioChange('visibility', 'not-visible')}
                          className="mr-2"
                        />
                        Not visible
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.visibility === 'visible'}
                          onChange={() => handleRadioChange('visibility', 'visible')}
                          className="mr-2"
                        />
                        Visible
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Inventory</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Manage stock?</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.manageStock === 'no'}
                          onChange={() => handleRadioChange('manageStock', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.manageStock === 'yes'}
                          onChange={() => handleRadioChange('manageStock', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock availability</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.stockAvailability === 'no'}
                          onChange={() => handleRadioChange('stockAvailability', 'no')}
                          className="mr-2"
                        />
                        No
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={formData.stockAvailability === 'yes'}
                          onChange={() => handleRadioChange('stockAvailability', 'yes')}
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>

              {/* Attribute Group */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">ATTRIBUTE GROUP</h2>
                <select
                  name="attributeGroup"
                  value={formData.attributeGroup}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-200 rounded-md"
                >
                  <option>Default</option>
                </select>
              </div>

              {/* Attributes */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">ATTRIBUTES</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    >
                      <option value="">Please select</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                    >
                      <option value="">Please select</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;