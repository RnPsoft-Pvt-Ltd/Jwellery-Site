import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    freeShipping: false,
    maxDiscount: '',
    usageLimit: '',
    discountType: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Transform the data to match backend expectations
    const couponData = {
      code: formData.code,
      description: formData.description,
      start_date: formData.startDate,
      end_date: formData.endDate,
      free_shipping: formData.freeShipping,
      max_discount: parseFloat(formData.maxDiscount),
      usage_limit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
      discount_type: formData.discountType
    };

    try {
      const response = await axios.post('http://localhost:5000/v1/coupons', couponData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.status === 'success') {
        setSuccess('Coupon created successfully!');
        // Reset form
        setFormData({
          code: '',
          description: '',
          startDate: '',
          endDate: '',
          freeShipping: false,
          maxDiscount: '',
          usageLimit: '',
          discountType: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <button className="mr-4">
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-medium">Create a new coupon</h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Coupon Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Coupon Code</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter coupon code"
                      required
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-200 rounded-md"
                        required
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
                      Free Shipping
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Maximum Discount</label>
                    <input
                      type="number"
                      name="maxDiscount"
                      value={formData.maxDiscount}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter maximum discount amount"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Usage Limit</label>
                    <input
                      type="number"
                      name="usageLimit"
                      value={formData.usageLimit}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter usage limit (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Type</label>
                    <input
                      type="text"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-200 rounded-md"
                      placeholder="Enter discount type"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <button 
                type="button"
                className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
  );
};

export default CreateCoupon;