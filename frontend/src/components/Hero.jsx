import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 0.5 || prev <= -0.5) setDirection(-direction);
        return prev + direction * 0.1;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div 
      className="relative bg-gray-100 py-40 px-5 text-center overflow-hidden min-h-screen"
      style={{
        backgroundImage: 'url(https://storage.googleapis.com/jwelleryrnpsoft/image.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-5">Heading</h2>

      {/* Action Button Section */}
      <div className="mb-6">
        <p className="text-lg text-gray-600 mb-4">Always Enhancing What's<br />Already Beautiful</p>
        <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md transition duration-300 hover:bg-blue-800">
          Explore Now
        </button>
      </div>

      {/* Drop-down Image (Static) */}
      <div className="absolute left-1/2 top-[99%] transform -translate-x-1/2 z-50">
        <img src="https://storage.googleapis.com/jwelleryrnpsoft/image.png" alt="Drop Down" className="w-20 h-auto" />
      </div>
    </div>
  );
};

export default Hero;
