import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));  // Set user from localStorage
    }
    
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    localStorage.removeItem("user");   // Remove user data from localStorage
    setUser(null); // Set user to null
    navigate("/login");  // Redirect to login
  };

  if (loading) return null; // Avoid rendering while loading

  const handleSearch = () => navigate("/search");
  const handleAddToCart = () => navigate("/cart");
  const handleWishlist = () => navigate("/account/wishlist");
  const handleUserProfile = () => navigate("/account");
  const handleAboutUs = () => navigate("/aboutUs");
  const handleCollection = () => navigate("/products");
  const handleLogo = () => navigate("/");
  return (
    <nav className="sticky top-0 z-50 w-full text-white px-5 py-3 flex items-center justify-between border-b border-gray-200 bg-black">
      <div className="flex items-center gap-2 cursor-pointer" onClick={()=>handleLogo()}>
        <img
          src="https://storage.googleapis.com/jwelleryrnpsoft/LogoWithName.png"
          alt="Logo"
          className="h-10 mr-2"
        />
      </div>

      <button className="lg:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent p-5 lg:p-0 transition-transform ${isOpen ? "block" : "hidden"} lg:flex items-center gap-8`}>
        <span onClick={()=>handleCollection()} className="text-white cursor-pointer">Collection</span>
        <span onClick={()=>handleAboutUs()} className="text-white cursor-pointer">About Us</span>

        {user ? (
          <div className="flex items-center gap-4">
            <button onClick={handleSearch} className="text-white">
            <svg width="51" height="30" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.0013 28.3337C33.9844 28.3337 38.8346 23.4834 38.8346 17.5003C38.8346 11.5172 33.9844 6.66699 28.0013 6.66699C22.0182 6.66699 17.168 11.5172 17.168 17.5003C17.168 23.4834 22.0182 28.3337 28.0013 28.3337Z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M43.2435 33.9231C43.569 34.2485 44.0967 34.2485 44.4222 33.9231C44.7475 33.5976 44.7475 33.07 44.4222 32.7445L43.2435 33.9231ZM44.4222 32.7445L36.0888 24.4111L34.9102 25.5898L43.2435 33.9231L44.4222 32.7445Z" fill="white"/>
            </svg>
            </button>

            <button onClick={handleAddToCart} className="text-white">
            <svg width="41" height="25" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 9.99967V8.33301C15.5 5.57159 17.7385 3.33301 20.5 3.33301C23.2615 3.33301 25.5 5.57159 25.5 8.33301V9.99967" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M15.7852 25C16.4715 26.942 18.3237 28.3333 20.5007 28.3333C22.6777 28.3333 24.5298 26.942 25.2162 25" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <path d="M34.2045 20.8762C33.229 15.6742 32.7413 13.0732 30.8898 11.5366C29.0383 10 26.3921 10 21.0995 10H19.8975C14.6049 10 11.9586 10 10.1071 11.5366C8.25555 13.0732 7.76787 15.6742 6.7925 20.8762C5.42095 28.191 4.73519 31.8485 6.73457 34.2575C8.73394 36.6667 12.4551 36.6667 19.8975 36.6667H21.0995C28.5418 36.6667 32.263 36.6667 34.2623 34.2575C35.4223 32.8598 35.6785 31.042 35.4213 28.3333" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            </button>

            <button onClick={handleWishlist} className="text-white">
            <svg width="41" height="25" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.9987 5C33.0614 5 37.1654 9.16667 37.1654 15C37.1654 26.6667 24.6654 33.3333 20.4987 35.8333C16.332 33.3333 3.83203 26.6667 3.83203 15C3.83203 9.16667 7.9987 5 12.9987 5C16.0986 5 18.832 6.66667 20.4987 8.33333C22.1654 6.66667 24.8987 5 27.9987 5ZM22.0552 31.0063C23.5245 30.0808 24.8487 29.1592 26.0902 28.1715C31.0549 24.2217 33.832 19.9058 33.832 15C33.832 11.0679 31.2704 8.33333 27.9987 8.33333C26.2055 8.33333 24.2642 9.28185 22.8557 10.6904L20.4987 13.0474L18.1417 10.6904C16.7332 9.28185 14.7919 8.33333 12.9987 8.33333C9.7638 8.33333 7.16536 11.0942 7.16536 15C7.16536 19.9058 9.94248 24.2217 14.9073 28.1715C16.1487 29.1592 17.4729 30.0808 18.9422 31.0063C19.4397 31.3198 19.9339 31.6215 20.4987 31.9587C21.0635 31.6215 21.5577 31.3198 22.0552 31.0063Z" fill="white"/>
            </svg>
            </button>

            <button onClick={handleUserProfile} className="text-white">
            <svg width="41" height="25" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7018 21.2995C20.5852 21.2828 20.4352 21.2828 20.3018 21.2995C17.3685 21.1995 15.0352 18.7995 15.0352 15.8495C15.0352 12.8328 17.4685 10.3828 20.5018 10.3828C23.5185 10.3828 25.9685 12.8328 25.9685 15.8495C25.9518 18.7995 23.6352 21.1995 20.7018 21.2995Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M31.7323 32.3006C28.7657 35.0173 24.8323 36.6673 20.499 36.6673C16.1656 36.6673 12.2323 35.0173 9.26562 32.3006C9.43229 30.7339 10.4323 29.2006 12.2156 28.0006C16.7823 24.9673 24.249 24.9673 28.7823 28.0006C30.5657 29.2006 31.5657 30.7339 31.7323 32.3006Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.4987 36.6663C29.7034 36.6663 37.1654 29.2043 37.1654 19.9997C37.1654 10.7949 29.7034 3.33301 20.4987 3.33301C11.2939 3.33301 3.83203 10.7949 3.83203 19.9997C3.83203 29.2043 11.2939 36.6663 20.4987 36.6663Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>

            <button onClick={handleLogout} className="text-white hover:text-gray-300">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <a href="/register" className="text-white">Register</a>
            <a href="/login" className="text-white">Login</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
