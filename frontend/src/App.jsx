import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AdminPage from './pages/Adminpage';  
import Addtocart from "./pages/Addtocart"; 
import ShoppingCartPage from "./pages/Shoppedcart"; 

import AccountPage from "./pages/AccountPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import AddressPage from "./pages/AddressPage";
import EditAddressPage from "./pages/EditAddressPage"
import WishlistPage from "./pages/WishlistPage";
import OrdersPage from "./pages/OrdersPage";
import MenCollection from './components/MenCollection';
import WomenCollection from './components/WomenCollection';
import KidsCollection from './components/KidsCollection';
import RegisterUser from './components/Register';
import CresthavenLogin from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />  
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/shoppedcart" element={<ShoppingCartPage />} />

        <Route path="/account" element={<AccountPage />} />
            <Route path="/account/personal-info" element={<PersonalInfoPage />} />
            <Route path="/account/address" element={<AddressPage />} />
            <Route path="/account/address/edit" element={<EditAddressPage />} />
            <Route path="/account/wishlist" element={<WishlistPage />} />
            <Route path="/account/orders" element={<OrdersPage />} />

            <Route path="/mencollection" element={<MenCollection />} />
            <Route path="/womencollection" element={<WomenCollection />} />
            <Route path="/kidcollection" element={<KidsCollection />} />


            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<CresthavenLogin />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;