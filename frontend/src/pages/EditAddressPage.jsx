import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Save, User, Phone, MapPin, Building, Flag, Navigation } from 'lucide-react';

function EditAddressPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    zipCode: '',
    country: '',
    state: '',
    city: '',
    landmark: '',
    isDefault: false,
  });

  const [status, setStatus] = useState({
    loading: true,
    saving: false,
    message: '',
    error: '',
    success: false
  });

  useEffect(() => {
    if (id) {
      fetchAddress();
    } else {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [id]);

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus(prev => ({ 
          ...prev, 
          error: 'Please log in to view address details', 
          loading: false 
        }));
        return;
      }

      const response = await fetch(`http://54.206.185.32/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const userData = await response.json();
      
      // If user has an address, populate the form
      if (userData.addresses && userData.addresses.length > 0) {
        const address = userData.addresses[0];
        setFormData({
          fullName: address.full_name || '',
          phone: address.phone || '',
          addressLine1: address.address_line1 || '',
          zipCode: address.zip_code || '',
          country: address.country || '',
          state: address.state || '',
          city: address.city || '',
          landmark: address.landmark || '',
          isPrimary: address.is_primary || false,
        });
      }
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        error: error.message || 'Error loading address data'
      }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    
    setStatus(prev => ({ ...prev, message: '', error: '', success: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prev => ({ ...prev, saving: true, message: '', error: '', success: false }));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus(prev => ({ 
          ...prev, 
          error: 'Please log in to save address',
          saving: false 
        }));
        return;
      }

      // Prepare address data in the format expected by the backend
      const addressData = {
        address: {
          full_name: formData.fullName,
          phone: formData.phone,
          address_line1: formData.addressLine1,
          zip_code: formData.zipCode,
          country: formData.country,
          state: formData.state,
          city: formData.city,
          landmark: formData.landmark,
          is_primary: formData.isPrimary,
        }
      };

      const response = await fetch('http://54.206.185.32/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save address');
      }

      setStatus(prev => ({ 
        ...prev, 
        success: true,
        message: 'Address updated successfully!' 
      }));
      
      navigate('/account/address');
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        error: error.message || 'Error saving address. Please try again.' 
      }));
    } finally {
      setStatus(prev => ({ ...prev, saving: false }));
    }
  };

  const FormField = ({ name, label, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-4">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
          // autoComplete="off"
        />

        
      </div>
    </div>
  );

  if (status.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Edit Address' : 'Add New Address'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {id ? 'Update your address information' : 'Add a new delivery address'}
        </p>
      </div>

      {(status.error || status.message) && (
        <div className={`mb-6 p-4 rounded-lg ${
          status.error 
            ? 'bg-red-50 border border-red-200 text-red-600' 
            : 'bg-green-50 border border-green-200 text-green-600'
        }`}>
          {status.error || status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField name="fullName" label="Full Name" icon={User} />
          <FormField name="mobile" label="Mobile Number" icon={Phone} />
          <FormField name="addressLine1" label="Address Line 1" icon={MapPin} />
          <FormField name="landmark" label="Landmark" icon={Navigation} />
          <FormField name="city" label="City" icon={Building} />
          <FormField name="state" label="State" icon={Flag} />
          <FormField name="country" label="Country" icon={Flag} />
          <FormField name="zipCode" label="ZIP Code" icon={MapPin} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Make this my default address
            </span>
          </label>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={status.saving}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg
              bg-black text-white hover:bg-gray-800 transition-colors
              disabled:bg-gray-300 disabled:cursor-not-allowed
              min-w-[150px]"
          >
            {status.saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {id ? 'Update Address' : 'Add Address'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAddressPage;