import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';




import AccountPage from "./pages/AccountPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import AddressPage from "./pages/AddressPage";
import EditAddressPage from "./pages/EditAddressPage"
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import Register from './components/Register';
import Login from './components/Login';

import CollectionGrid from './pages/CollectionGrid';
import CategoryGrid from './pages/CategoryGrid';
import Cart from './components/Cart';
import CheckoutPage from './pages/CheckoutPage';
import ProductGrid from './pages/ProductGrid';
import ExpandedProduct from './pages/ExpandedProduct';

import ArrangeCallback from './pages/ArrangeCallback';
import AboutUs from './pages/AboutUsPage';
import ReviewsPage from './pages/ReviewsPage';
import SalesGrid from './pages/SalesGrid';

import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import AccountLayout from './components/layouts/AccountLayout';
import MainLayout from './components/layouts/MainLayout';
import Shipping from "./pages/ShippingPage";
import PrivacyPage from "./pages/PrivacyPage";



import Categories from './components/Categories.jsx';
import Products from './components/Products.jsx';


import Collections from './components/Collections.jsx';
import CreateProduct from './components/CreateProduct.jsx';
import CreateCoupon from './components/CreateCoupon.jsx';
import NewSale from './components/NewSale.jsx';
import AdminSalesPage from './components/SalesList.jsx';
// import Dashboard from '../components/dashboard.jsx';


import CustomersTable from './components/CustomersTable.jsx';
import Orders from './components/Orders.jsx';
import Dashboard from './components/Dashboard.jsx';
// import GridLayout from './components/layouts/GridLayout.jsx';
// import { GlobalLoadingProvider } from './utils/GlobalLoadingManager';

import UpdateCategory from './components/UpdateCategory.jsx'
import UpdateCollection from './components/UpdateCollection.jsx';
import CreateCategory from './components/CreateCategory.jsx'
import CreateCollection from './components/CreateCollection.jsx'
import UpdateProduct from './pages/UpdateProduct.jsx';
import UpdateProduct2 from './pages/UpdateProduct2.jsx';
import UpdateProduct3 from './pages/UpdateProduct3.jsx';
import Terms from './pages/TermsPage.jsx';
import RefundPolicy from './pages/RefundPolicy.jsx';
function App() {
  return (
    // <BrowserRouter>
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-products" element={<CreateProduct />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/collections" element={<Collections />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<CustomersTable />} />
        <Route path="/admin/new-coupon" element={<CreateCoupon />} />
        <Route path="/admin/new-sale" element={<NewSale />} />
        <Route path="/admin/sales" element={<AdminSalesPage />} />
        <Route path="/admin/new-category" element={<CreateCategory />} />
        <Route path="/admin/new-collection" element={<CreateCollection />} />
        <Route path="/admin/update-category" element={<UpdateCategory />} />
        <Route path="/admin/update-collection" element={<UpdateCollection />} />
        <Route path="/admin/update-product" element={<UpdateProduct />} />
        <Route path="/admin/update-product2" element={<UpdateProduct2 />} />
        <Route path="/admin/update-product3" element={<UpdateProduct3 />} />
      </Route>


      {/* Account Routes */}
      <Route element={<AccountLayout />}>
        <Route path="/account" element={<PersonalInfoPage />} />
        <Route path="/account/personal-info" element={<AccountPage />} />
        <Route path="/account/address" element={<AddressPage />} />
        <Route path="/account/address/edit" element={<EditAddressPage />} />
        <Route path="/account/wishlist" element={<WishlistPage />} />
        <Route path="/account/orders" element={<OrdersPage />} />
      </Route>

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:productId" element={<ExpandedProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/arrangecallback" element={<ArrangeCallback />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/products" element={<ProductGrid />} />
        <Route path="/categories/:categoryId" element={<CategoryGrid />} />
        <Route path="/collections/:collectionId" element={<CollectionGrid />} />
        <Route path="/sales/:salesId" element={<SalesGrid />} />
      </Route>

    </Routes>
  // </BrowserRouter>
  );
}

export default App;