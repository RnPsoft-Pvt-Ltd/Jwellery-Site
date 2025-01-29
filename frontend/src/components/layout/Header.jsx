import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';

function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link to="/collection" className="text-sm">
            Collection
          </Link>
          <Link to="/about" className="text-sm">
            About Us
          </Link>
        </nav>
        
        <Link to="/" className="flex-shrink-0">
          <img src="https://storage.googleapis.com/jwelleryrnpsoft/logo.png" alt="Logo" className="w-10 h-10" />
        </Link>

        <div className="flex items-center space-x-4">
          <button className="p-2">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="p-2">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;