import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';

const ArrangeCallback = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 bg-white">
        <div className="w-full max-w-xl">
          {/* Form Title */}
          <h1 className="text-3xl md:text-4xl text-center mb-8 font-bold">
            Arrange a Callback
          </h1>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-xl mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 bg-gray-100 rounded border-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-xl mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-100 rounded border-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xl mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-100 rounded border-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xl mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 bg-gray-100 rounded border-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xl mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                rows="3"
                className="w-full px-4 py-2 bg-gray-100 rounded border-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-7 py-2 bg-black text-white rounded text-xl hover:bg-gray-800 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArrangeCallback;