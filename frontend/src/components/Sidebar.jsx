import React from 'react'
import PropTypes from 'prop-types'
import { Home, Package, Tag, List, Settings, ShoppingCart, Users, Gift } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ onNavigate }) => {
    const menuItems = [
      { section: 'QUICK LINKS', items: [
        { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
        { name: 'New Product', icon: <Package size={20} />, path: '/new-product' },
        { name: 'New Coupon', icon: <Gift size={20} />, path: '/new-coupon' }
      ]},
      { section: 'CATALOG', items: [
        { name: 'Products', icon: <Package size={20} />, path: '/products' },
        { name: 'Categories', icon: <Tag size={20} />, path: '/categories' },
        { name: 'Collections', icon: <List size={20} />, path: '/collections' },
        { name: 'Attributes', icon: <Settings size={20} />, path: '/attributes' }
      ]},
      { section: 'SALE', items: [
        { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' }
      ]},
      { section: 'CUSTOMER', items: [
        { name: 'Customers', icon: <Users size={20} />, path: '/customers' }
      ]}
    ];
  
    return (
      <div className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-16">
        {menuItems.map((section, idx) => (
          <div key={idx} className="px-4 py-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">{section.section}</h3>
            {section.items.map((item, itemIdx) => (
              <div 
              key={itemIdx} 
              className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={() => onNavigate(item.path)}
            >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  Sidebar.propTypes = {
    onNavigate: PropTypes.func.isRequired,
  };
export default Sidebar;  