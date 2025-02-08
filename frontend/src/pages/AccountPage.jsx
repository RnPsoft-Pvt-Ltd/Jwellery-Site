import React, { useState, useEffect } from 'react';
import { Loader2, Save, User, Mail, Phone, Calendar } from 'lucide-react';

function AccountPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });

  const [status, setStatus] = useState({
    loading: true,
    saving: false,
    message: '',
    error: '',
    success: false
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus(prev => ({ ...prev, error: 'Please log in to view your profile', loading: false }));
        return;
      }

      const response = await fetch('http://localhost:5000/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch profile data');

      const { user } = await response.json();
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : '',
      });
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        error: 'Error loading profile. Please try again later.'
      }));
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data directly without any conditions
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear status messages
    setStatus(prev => ({ 
      ...prev, 
      message: '', 
      error: '', 
      success: false 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prev => ({ ...prev, saving: true, message: '', error: '', success: false }));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus(prev => ({ 
          ...prev, 
          error: 'Please log in to update your profile',
          saving: false 
        }));
        return;
      }

      const response = await fetch('http://localhost:5000/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dob,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus(prev => ({ 
          ...prev, 
          success: true,
          message: 'Profile updated successfully!' 
        }));
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      setStatus(prev => ({ 
        ...prev, 
        error: error.message || 'Error updating profile. Please try again.' 
      }));
    } finally {
      setStatus(prev => ({ ...prev, saving: false }));
    }
  };

  if (status.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const FormField = ({ name, label, type = "text", icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-4">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={name}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information and account settings
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
          <FormField name="name" label="Full Name" icon={User} />
          <FormField name="email" label="Email Address" icon={Mail} />
          <FormField name="phone" label="Phone Number" icon={Phone} />
          <FormField name="dob" label="Date of Birth" type="date" icon={Calendar} />
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
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountPage;