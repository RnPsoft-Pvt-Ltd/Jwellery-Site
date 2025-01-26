import React, { useState } from 'react'; 
import Categories from '../components/Categories.jsx';
import Attributes from '../components/Attributes.jsx';
import Products from '../components/Products.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Collections from '../components/Collections.jsx';
import CreateProduct from '../components/CreateProduct.jsx';
import CreateCoupon from '../components/CreateCoupon.jsx';

// Main App Component
const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState('products');

  // Pass setActiveComponent to Sidebar to handle navigation
  const handleNavigation = (path) => {
    // Extract component name from path and set it as active
    const component = path.replace('/', '');
    setActiveComponent(component);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar onNavigate={handleNavigation} />
      
      {activeComponent === 'new-product' && <CreateProduct />}
      {activeComponent === 'new-coupon' && <CreateCoupon />}
      {activeComponent === 'categories' && <Categories />}
      {activeComponent === 'attributes' && <Attributes />}
      {activeComponent === 'products' && <Products />}
      {activeComponent === 'collections' && <Collections />}
    </div>
  );
};

export default AdminPage;