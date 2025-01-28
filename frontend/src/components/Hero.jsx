import React, { useState, useEffect } from 'react';

const images = [
  'https://storage.googleapis.com/jwelleryrnpsoft/image.png',
  'https://storage.googleapis.com/jwelleryrnpsoft/image.png'
];

const Hero = () => {
  const [bgImage, setBgImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => (prev === images[0] ? images[1] : images[0]));
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-between px-16 bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Heading on the Left */}
      <h2 className="text-5xl font-light text-white absolute left-16 top-1/3">
        Heading
      </h2>

      {/* Text and Button on the Right */}
      <div className="absolute right-16 bottom-32 text-white text-right">
        <p className="text-lg font-light mb-4">
          Always Enhancing What's<br />Already Beautiful
        </p>
        <button className="px-6 py-3 border-2 border-white text-white text-lg hover:bg-white hover:text-black transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
