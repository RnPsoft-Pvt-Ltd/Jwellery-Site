import React, { useState, useEffect } from "react";
import axios from "axios"; // For API calls
import { useNavigate } from "react-router-dom"; // For redirecting

const Login = () => {
  const [email, setEmail] = useState(""); // Use email state
  const [password, setPassword] = useState(""); // Use password state
  const [errorMessage, setErrorMessage] = useState(""); // To show error messages
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Redirect if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to homepage if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5000/v1/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
  
      console.log("Login Success:", response.data);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);  // Set token
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data
        navigate("/"); // Redirect to homepage after successful login
      } else {
        alert("Failed to login");
      }
    } catch (error) {
      console.error("Error logging in:", error.response);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-[900px] h-[333px] rounded-t-lg bg-gray-100 shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="w-[356px] h-[356px] -mt-3 flex justify-center items-center">
          <img
            src={"https://storage.googleapis.com/jwelleryrnpsoft/ring.png"}
            alt="Ring"
            className="max-w-full max-h-full object-cover"
          />
        </div>

        {/* Login Section */}
        <div className="flex-auto flex justify-center px-16 items-center rounded-t-lg">
          <div className="w-full max-w-lg text-center py-6 px-6 bg-white rounded-lg">
            <h1 className="text-xl font-bold mb-2">Welcome To Cresthaven</h1>
            <p className="text-gray-600 mb-6">Login/Sign-up</p>

            {/* Display error message if login fails */}
            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
              >
                Login
              </button>
            </form>

            {/* Register Message */}
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")} // Redirect to the register page
                className="text-red-700 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
