import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AdminPage from './pages/Adminpage';  
// import Addtocart from "./pages/Addtocart"; 
import ShoppingCartPage from "./pages/Shoppedcart"; 

import AccountPage from "./pages/AccountPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import AddressPage from "./pages/AddressPage";
import EditAddressPage from "./pages/EditAddressPage"
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import RegisterUser from './components/Register';
import CresthavenLogin from './components/Login';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />  
        {/* <Route path="/cart" element={<Addtocart />} /> */}
        <Route path="/shoppedcart" element={<ShoppingCartPage />} />

        <Route path="/account" element={<AccountPage />} />
            <Route path="/account/personal-info" element={<PersonalInfoPage />} />
            <Route path="/account/address" element={<AddressPage />} />
            <Route path="/account/address/edit" element={<EditAddressPage />} />
            <Route path="/account/wishlist" element={<WishlistPage />} />
            <Route path="/account/orders" element={<OrdersPage />} />

            {/* Use grid view (4/2/25) Bhavya */}
            {/* Removed mens women and kids collection */}
            <Route path="/categories/:categoryId" element={<CategoryGrid />} />
            <Route path="/collections/:collectionId" element={<CollectionGrid />} />
            <Route path="/products" element={<ProductGrid />} />


            <Route path='/products/:productId' element={<ExpandedProduct />} />
            

            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<CresthavenLogin />} />


            <Route path="/arrangecallback" element={<ArrangeCallback />} />  
            <Route path="/aboutUs" element={<AboutUs />} />  
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/sales/:salesId" element={<SalesGrid />} />


            //cartsection
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;