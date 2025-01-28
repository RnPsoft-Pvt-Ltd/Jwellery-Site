import React from 'react';
import { Heart } from 'lucide-react';
import AccountSidebar from '../components/layout/AccountSidebar';
import Header from '../components/layout/Header';
function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: "Array Toys and Accessories",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 2,
      name: "Set of Assorted Earrings",
      price: "Rs. 790",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 3,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 4,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 5,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 6,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 7,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
    {
      id: 8,
      name: "Shell Ring",
      price: "Rs. 2000",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp",
    },
  ];

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
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>
                <button className="w-full mt-2 bg-black text-white text-xs py-2 rounded">
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