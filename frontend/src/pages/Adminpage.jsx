import React, { useState } from 'react'; 
import Categories from '../components/Categories.jsx';
import Products from '../components/Products.jsx';

import Sidebar from '../components/layouts/components/AdminSidebar.jsx';
import Collections from '../components/Collections.jsx';
import CreateProduct from '../components/CreateProduct.jsx';
import CreateCoupon from '../components/CreateCoupon.jsx';
import CreateCategory from "../components/CreateCategory.jsx";
import CreateCollection from "../components/CreateCollection.jsx";
// import UpdateCategory from "../components/UpdateCategory.jsx";
// import UpdateCollection from "../components/UpdateCollection.jsx";


// import Dashboard from '../components/dashboard.jsx';
import CustomersTable from '../components/CustomersTable.jsx';
import Orders from '../components/Orders.jsx';
import Dashboard from '../components/Dashboard.jsx';



// Main App Component
const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState('products');

  // const [categoryName, setCategoryName] = useState("");
  // const [collectionName, setCollectionName] = useState("");

  // const [categoryDescription, setCategoryDescription] = useState("");
  // const [collectionDescription, setCollectionDescription] = useState("");

  // const [categoryThumbnail, setCategoryThumbnail] = useState("");
  // const [collectionThumbnail, setCollectionThumbnail] = useState("");

  // const [categoryID, setCategoryID] = useState("");
  // const [collectionID, setCollectionID] = useState("");

  // Pass setActiveComponent to Sidebar to handle navigation
  const handleNavigation = (path) => {
    // Extract component name from path and set it as active
    const component = path.replace("/", "");
    setActiveComponent(component);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar onNavigate={handleNavigation} />

      {activeComponent === "dashboard" && <Dashboard />}

      {activeComponent === "new-product" && <CreateProduct />}
      {activeComponent === "new-category" && <CreateCategory />}
      {activeComponent === "new-collection" && <CreateCollection />}
      {/* {activeComponent === "update-category" && 
        <UpdateCategory
          name={categoryName}
          description={categoryDescription}
          thumbnail={categoryThumbnail}
          id={categoryID}
        />
      } */}
      {/* {activeComponent === "update-collection" && 
        <UpdateCollection
          name={collectionName}
          description={collectionDescription}
          thumbnail={collectionThumbnail}
          id={collectionID}
        />
      } */}
      {activeComponent === "new-coupon" && <CreateCoupon />}
      {activeComponent === "categories" && 
        <Categories
          setCategoryName={setCategoryName}
          setCategoryDescription={setCategoryDescription}
          setCategoryThumbnail={setCategoryThumbnail}
          setCategoryID={setCategoryID}
        />
      }
      {activeComponent === "products" && 
        <Products onNavigate={handleNavigation} />
      }
      {activeComponent === "collections" && 
        <Collections
          onNavigate={handleNavigation}
          setCollectionName={setCollectionName}
          setCollectionDescription={setCollectionDescription}
          setCollectionThumbnail={setCollectionThumbnail}
          setCollectionID={setCollectionID}
        />
      }

      {activeComponent === "orders" && <Orders />}
      {activeComponent === "customers" && <CustomersTable />}
    </div>
  );
};

export default AdminPage;