import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AdminPage from './pages/adminpage';  
import Addtocart from "./pages/Addtocart"; 
import ShoppingCartPage from "./pages/Shoppedcart"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<AdminPage />} />  
        <Route path="/cart" element={<Addtocart />} />
        <Route path="/shoppedcart" element={<ShoppingCartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;