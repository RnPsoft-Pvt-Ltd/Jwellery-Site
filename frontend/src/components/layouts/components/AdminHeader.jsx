// AdminHeader.jsx
import React, { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../utils/useSearch';

const AdminHeader = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  
  const {
    query,
    setQuery,
    results,
    loading: searchLoading,
    error
  } = useSearch('products');

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProductClick = (productId) => {
    setShowSearch(false);
    setQuery('');
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex-1 flex items-center justify-between ml-4">
      {/* Search Section */}
      <div className="relative flex-1 max-w-2xl">
        <div className={`flex items-center ${showSearch ? 'w-full' : 'w-10'} transition-all duration-300`}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Search className="text-gray-500" size={20} />
          </button>
          {showSearch && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent text-gray-900 border-b border-gray-200 focus:outline-none focus:border-primary"
              autoFocus
            />
          )}
        </div>
        
        {showSearch && query && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg mt-1 z-50">
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
                    className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
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
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">Rs. {product.base_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* <button
          onClick={() => navigate('/admin/profile')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <User size={20} className="text-gray-500" />
        </button> */}
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <LogOut size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;