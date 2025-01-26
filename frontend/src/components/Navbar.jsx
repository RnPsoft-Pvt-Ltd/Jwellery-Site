import React from 'react'
import { Search } from 'lucide-react';
// Navbar Component
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-500"></div>
        <span className="text-emerald-600 font-semibold text-xl">RnPsoft</span>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
        <span className="text-emerald-800 font-medium">A</span>
      </div>
    </div>
  );
};

export default Navbar;