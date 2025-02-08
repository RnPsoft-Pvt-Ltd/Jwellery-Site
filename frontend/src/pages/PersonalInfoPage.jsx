// PersonalInfoPage.jsx
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: 'Not Updated',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your information');
          return;
        }

        const response = await fetch('http://localhost:5000/v1/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const { user } = await response.json();
        setPersonalInfo({
          name: user.name || 'Not provided',
          email: user.email || 'Not provided',
          mobile: user.phone || 'Not provided',
          dob: user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'Not provided',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const InfoField = ({ label, value }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Name" value={personalInfo.name} />
        <InfoField label="Email" value={personalInfo.email} />
        <InfoField label="Date of Birth" value={personalInfo.dob} />
        <InfoField label="Mobile Number" value={personalInfo.mobile} />
      </div>
    </div>
  );
}

export default PersonalInfoPage;