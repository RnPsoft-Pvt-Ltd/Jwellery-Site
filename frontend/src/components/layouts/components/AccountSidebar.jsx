import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, MapPin, Heart, Package, Home } from 'lucide-react';

const AccountSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { title: "Overview", href: "/account", icon: Home },
    { title: "Personal Information", href: "/account/personal-info", icon: User },
    { title: "Address Details", href: "/account/address", icon: MapPin },
    { title: "Wishlist", href: "/account/wishlist", icon: Heart },
    { title: "Order History", href: "/account/orders", icon: Package },
  ];

  return (
    <nav className="w-64 h-full bg-white shadow-lg rounded-lg p-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                transition-all duration-200 ease-in-out
                ${isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              <Icon 
                className={`mr-3 h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-gray-400'}`} 
              />
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AccountSidebar;