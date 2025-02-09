import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../utils/useSearch";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    error,
  } = useSearch("products");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) return null;

  const navigationLinks = {
    collection: "/products",
    aboutUs: "/aboutUs",
    cart: "/cart",
    wishlist: "/account/wishlist",
    profile: "/account",
    home: "/",
  };

  const handleNavigation = (path) => navigate(path);

  const handleProductClick = (productId) => {
    setShowSearch(false);
    setQuery("");
    navigate(`/products/${productId}`);
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="sticky top-0 z-50 w-full bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigation(navigationLinks.home)}
          >
            <img
              src="https://storage.googleapis.com/jwelleryrnpsoft/LogoWithName.png"
              alt="Logo"
              className="h-10"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <button
              onClick={() => handleNavigation(navigationLinks.collection)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Collection
            </button>
            <button
              onClick={() => handleNavigation(navigationLinks.aboutUs)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              About Us
            </button>
            {isAdmin && (
              <button
                onClick={() => handleNavigation("/admin")}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Dashboard
              </button>
            )}
          </div>

          {/* User actions */}
          {user ? (
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {/* Search */}
              <div className="relative">
                <div className="flex items-center">
                  <div
                    className={`flex items-center ${
                      showSearch ? "w-64" : "w-10"
                    } transition-all duration-300`}
                  >
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <Search className="text-white" size={20} />
                    </button>
                    {showSearch && (
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="ml-2 w-full bg-transparent text-white border-b border-white focus:outline-none"
                        autoFocus
                      />
                    )}
                  </div>
                </div>

                {/* Search results dropdown */}
                {showSearch && query && (
                  <div className="absolute top-full right-0 w-96 bg-white shadow-lg rounded-lg mt-2">
                    {searchLoading ? (
                      <div className="p-4 text-gray-500">Loading...</div>
                    ) : error ? (
                      <div className="p-4 text-red-500">{error}</div>
                    ) : results.length === 0 ? (
                      <div className="p-4 text-gray-500">No results found</div>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        {results.map((product) => (
                          <div
                            key={product.id}
                            className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4 transition-colors"
                            onClick={() => handleProductClick(product.id)}
                          >
                            {product.images?.[0]?.image_url && (
                              <img
                                src={product.images[0].image_url}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Rs. {product.base_price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <button
                onClick={() => handleNavigation(navigationLinks.cart)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <ShoppingCart className="text-white" size={20} />
              </button>
              <button
                onClick={() => handleNavigation(navigationLinks.wishlist)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <Heart className="text-white" size={20} />
              </button>
              <button
                onClick={() => handleNavigation(navigationLinks.profile)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <User className="text-white" size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <LogOut className="text-white" size={20} />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <a
                href="/register"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Register
              </a>
              <a
                href="/login"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
          <button
            onClick={() => handleNavigation(navigationLinks.collection)}
            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
          >
            Collection
          </button>
          <button
            onClick={() => handleNavigation(navigationLinks.aboutUs)}
            className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
          >
            About Us
          </button>
          {isAdmin && (
            <button
              onClick={() => handleNavigation("/admin")}
              className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
            >
              Dashboard
            </button>
          )}
          {user ? (
            <>
              <button
                onClick={() => handleNavigation(navigationLinks.cart)}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Cart
              </button>
              <button
                onClick={() => handleNavigation(navigationLinks.wishlist)}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Wishlist
              </button>
              <button
                onClick={() => handleNavigation(navigationLinks.profile)}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Register
              </a>
              <a
                href="/login"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
