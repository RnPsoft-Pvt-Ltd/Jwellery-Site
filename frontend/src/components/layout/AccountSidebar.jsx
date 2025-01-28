import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AccountSidebar() {
  const location = useLocation();
  const menuItems = [
    { title: "Overview", href: "/account" },
    { title: "Personal Information", href: "/account/personal-info" },
    { title: "Address Details", href: "/account/address" },
    { title: "Wishlist", href: "/account/wishlist" },
    { title: "Order History", href: "/account/orders" },
  ];

  return (
    <div className="w-64 flex-shrink-0">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`block px-4 py-2 text-sm ${
            location.pathname === item.href ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default AccountSidebar;