import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
const Callback = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleCallbackClick = () => {
    navigate(`/arrangecallback`);
  };

  const handleExploreClick = () => {
    navigate(`/products`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-[100%]">
      <div
        className="flex flex-col md:flex-row gap-6 lg:gap-8 
                   max-w-7xl mx-auto 
                   bg-white
                   rounded-[2rem] overflow-hidden 
                   shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {/* Left Section - Image */}
        <div className="relative w-full md:w-2/5 h-[300px] md:h-auto overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src="https://ideaverse-1.s3.eu-north-1.amazonaws.com/uploads/SKU0024.jpg"
            alt="Jewelry showcase"
            className={`object-cover w-full h-full transition-opacity duration-300
                      ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 lg:p-8">
          {/* Logo and Brand Section */}
          <div className="flex items-center justify-center md:justify-start mb-6 lg:mb-8">
            <div className="flex items-center gap-4">
              <div
                className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] 
                            flex-shrink-0 transition-transform duration-300 
                            hover:scale-105"
              >
                <img
                  src={logo}
                  alt="Cresthaven Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col">
                <h1
                  className="font-italiana text-3xl sm:text-[50px] font-normal 
                             leading-tight text-gray-900"
                >
                  Evella
                </h1>
                <h2
                  className="font-italiana text-2xl sm:text-[40px] font-normal 
                             tracking-[0.2rem] text-gray-800"
                >
                </h2>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 mb-8 text-center md:text-left">
            <p
              className="text-2xl sm:text-[220%] text-gray-700 font-albert 
                         leading-tight"
            >
“Timeless Elegance, For the Confident You.”       </p>
            <p
              className="text-xl sm:text-[170%] text-gray-600 font-albert 
                         max-w-[450px] leading-snug"
            >
              Evella was born from a belief that beauty should feel personal, timeless, and true.<br/><br/>
Each piece carries a touch of tradition, a hint of modernity, and a lot of love.            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
            <button
              onClick={() => window.open("https://wa.me/919124230952", "_blank")}
              className="bg-black text-white text-lg sm:text-2xl 
                         py-2 px-6 rounded-lg
                         hover:bg-gray-800 active:bg-gray-900
                         transform transition-all duration-300
                         hover:-translate-y-0.5 hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-400
                         font-albert text-center"
            >
              Whatsapp Chat
            </button>
            <button
              onClick={() => handleExploreClick()}
              className="bg-black text-white text-lg sm:text-2xl 
                         py-2 px-6 rounded-lg
                         hover:bg-gray-800 active:bg-gray-900
                         transform transition-all duration-300
                         hover:-translate-y-0.5 hover:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-400
                         font-albert text-center"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callback;
