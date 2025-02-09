// src/components/AdminSidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Package, Tag, List, ShoppingCart, Users, Gift, Percent } from 'lucide-react';

const MenuItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
        ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      {React.cloneElement(item.icon, {
        size: 20,
        className: isActive ? 'text-white' : 'text-gray-500'
      })}
      <span className="text-sm font-medium">{item.name}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const menuItems = [
    { 
      section: 'QUICK LINKS',
      items: [
        { name: 'Dashboard', icon: <Home />, path: '/admin' },
        { name: 'New Product', icon: <Package />, path: '/admin/new-products' },
        { name: 'New Coupon', icon: <Gift />, path: '/admin/new-coupon' },
        { name: 'New Sale', icon: <Percent />, path: '/admin/new-sale' }
      ]
    },
    {
      section: 'CATALOG',
      items: [
        { name: 'Products', icon: <Package />, path: '/admin/products' },
        { name: 'Categories', icon: <Tag />, path: '/admin/categories' },
        { name: 'Collections', icon: <List />, path: '/admin/collections' }
      ]
    },
    {
      section: 'SALE',
      items: [
        { name: 'Orders', icon: <ShoppingCart />, path: '/admin/orders' },
        { name: 'All Sales', icon: <Percent />, path: '/admin/sales' } // Added "All Sales"
      ]
    },
    {
      section: 'CUSTOMER',
      items: [
        { name: 'Customers', icon: <Users />, path: '/admin/customers' }
      ]
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-16 shadow-sm">
      <nav className="h-full overflow-y-auto">
        {menuItems.map((section, idx) => (
          <div key={idx} className="px-4 py-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 px-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <MenuItem key={itemIdx} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
