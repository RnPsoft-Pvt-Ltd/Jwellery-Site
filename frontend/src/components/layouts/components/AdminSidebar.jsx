// AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Tag,
  List,
  ShoppingCart,
  Users,
  Gift,
  Percent,
  PlusSquare,
  Diamond,
  Package2,
  Activity,
  Tags,
} from "lucide-react";

const MenuItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {React.cloneElement(item.icon, {
        size: 18,
        className: "flex-shrink-0",
      })}
      <span>{item.name}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const menuItems = [
    {
      section: "QUICK LINKS",
      items: [
        { name: "Dashboard", icon: <Home />, path: "/admin" },
        {
          name: "New Product",
          icon: <PlusSquare />,
          path: "/admin/new-products",
        },
        { name: "New Coupon", icon: <Gift />, path: "/admin/new-coupon" },
        { name: "New Sale", icon: <Percent />, path: "/admin/new-sale" },
        { name: "New Category", icon: <Tag />, path: "/admin/new-category" },
        {
          name: "New Collection",
          icon: <Package2 />,
          path: "/admin/new-collection",
        },
      ],
    },
    {
      section: "CATALOG",
      items: [
        { name: "Products", icon: <Package />, path: "/admin/products" },
        { name: "Categories", icon: <List />, path: "/admin/categories" },
        { name: "Collections", icon: <Diamond />, path: "/admin/collections" },
      ],
    },
    {
      section: "SALE",
      items: [
        { name: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
        { name: "All Sales", icon: <Activity />, path: "/admin/sales" },
      ],
    },
    {
      section: "CUSTOMER",
      items: [{ name: "Customers", icon: <Users />, path: "/admin/customers" }],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Logo */}
      <div className="p-4 border-b flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Admin Logo" className="h-8" />
          <h1 className="font-bold text-lg font-['Albert_Sans']">Admin Panel</h1>
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2">
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
    </div>
  );
};

export default Sidebar;
