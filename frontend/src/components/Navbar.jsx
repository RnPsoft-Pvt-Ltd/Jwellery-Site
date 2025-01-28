import React from 'react';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full text-white px-5 py-3 flex items-center justify-between border-b border-gray-200 bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="https://storage.googleapis.com/jwelleryrnpsoft/LogoWithName.png" alt="Logo" className="h-10 mr-2" />
        
      </div>

      {/* Menu Items */}
      <div className="flex items-center gap-8">
        <a href="#" className="text-white text-base hover:text-gray-300">Collection</a>
        <a href="#" className="text-white text-base hover:text-gray-300">About Us</a>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <a href="#" className="text-white text-lg hover:text-gray-300">🔍</a>
        <a href="#" className="text-white text-lg hover:text-gray-300">❤️</a>
        <a href="#" className="text-white text-lg hover:text-gray-300">🛒</a>
        <a href="#" className="text-white text-lg hover:text-gray-300">👤</a>
      </div>
    </div>
  );
};

export default Navbar;
