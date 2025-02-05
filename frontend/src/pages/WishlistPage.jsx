import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000/v1/wishlist';

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist items');
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error('Failed to add product to wishlist');
      }
      const newItem = await response.json();
      setWishlistItems([...wishlistItems, newItem]);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove product from wishlist');
      }
      setWishlistItems(wishlistItems.filter((item) => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex gap-8">
        <AccountSidebar />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          <h2 className="text-xl font-semibold mb-6">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={item.product.images.length > 0 ? item.product.images[0].image_url : '/placeholder.svg'}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-white"
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">{item.product.price}</p>
                  <button
                    className="w-full mt-2 bg-black text-white text-xs py-2 rounded"
                    onClick={() => handleAddToWishlist(item.product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
