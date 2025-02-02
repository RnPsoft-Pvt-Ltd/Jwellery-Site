


import React, { useState } from "react";
import axios from "axios"; // For API calls

const CresthavenLogin = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");

  // Google Cloud Storage Image URL
  const imageURL = "https://storage.googleapis.com/jwelleryrnpsoft/ring.png"; // Replace with actual URL

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Combine country code and phone number
    const fullPhoneNumber = `${countryCode}${mobileNumber}`
      .replace(/\s+/g, "")
      .replace(/[^0-9+]/g, "");

    try {
      // API request to send OTP
      const response = await axios.post(
        "http://localhost:8800/api/users/login", // Replace with actual backend URL
        { phone: fullPhoneNumber }, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success response
      alert(`OTP sent to ${fullPhoneNumber}`);
      console.log("Response:", response.data);
    } catch (error) {
      // Handle error response
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-[900px] h-[333px] rounded-t-lg bg-gray-100 shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="w-[356px] h-[356px] -mt-3 flex justify-center items-center">
          <img
            src={imageURL}
            alt="Ring"
            className="max-w-full max-h-full object-cover"
          />
        </div>

        {/* Login Section */}
        <div className="flex-auto flex justify-center px-16 items-center rounded-t-lg">
          <div className="w-full max-w-lg text-center py-10 px-6 bg-white rounded-lg">
            <h1 className="text-xl font-bold mb-2">Welcome To Cresthaven</h1>
            <p className="text-gray-600 mb-6">Login/Sign-up</p>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center mt-10 relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="p-2 rounded-l-lg border border-gray-300"
                >
                  <option value="+91">+91</option>
                  {/* Add more country codes if needed */}
                </select>

                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter Mobile Number"
                  required
                  className="flex-1 p-2 border border-gray-300 rounded-r-lg"
                />

                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 h-full px-4 bg-red-700 text-white rounded-lg"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CresthavenLogin;
