



import React, { useState } from "react";
import axios from "axios"; // Import axios for making API calls

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    title: "Mr.",
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  // Google Cloud Storage Image URL (Replace with your actual URL)
  const imageURL = "https://storage.googleapis.com/jwelleryrnpsoft/flower.png"; 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const userData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    console.log("Sending Data:", userData); // Debugging: See what is being sent

    try {
      // Sending POST request to backend
      const response = await axios.post(
        "http://localhost:5000/v1/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the successful response
      alert(`User Registered Successfully!\n\n${JSON.stringify(response.data, null, 2)}`);

      // Clear the form after successful submission
      setFormData({
        title: "Mr.",
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "CUSTOMER",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="flex bg-white text-black rounded-lg shadow-xl border border-t-2 overflow-hidden w-full max-w-4xl">
        
        {/* Form Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-6">Register User</h2>
          <form onSubmit={handleSubmit}>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Title Selection */}
            <div className="mb-4">
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
              >
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <div className="flex">
                <span className="bg-gray-200 p-2 border border-gray-300 rounded-l">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9800000000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:ring focus:ring-red-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="JohnDoe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-red-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <img src={imageURL} alt="Flower" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
