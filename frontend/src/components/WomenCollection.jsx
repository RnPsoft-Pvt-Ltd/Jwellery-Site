import React, { useState } from "react";

const WomenCollection = () => {
  // Dummy Product Data (replace image URLs with Google Cloud URLs)
  const products = [
    {
      id: 1,
      name: "Silver Braided Earring",
      price: 2000,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/model.jpeg", // Replace with your image URL
    },
    {
      id: 2,
      name: "Stone Work Set",
      price: 790,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp", // Replace with your image URL
    },
    {
      id: 3,
      name: "Silver Braided Earrings",
      price: 2000,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/model.jpeg", // Replace with your image URL
    },
    {
      id: 4,
      name: "Stone Work Set",
      price: 790,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.webp", // Replace with your image URL
    },
  ];

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/" className="text-lg font-semibold">
              Collection
            </a>
            <a href="/" className="text-lg font-semibold">
              About Us
            </a>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="text-xl">🔍</button>
            <button className="text-xl">❤️</button>
            <button className="text-xl">🛒</button>
            <button className="text-xl">👤</button>
          </div>
        </div>
      </nav>

      {/* Page Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">Women</h1>
      </div>

      <div className="flex px-10 gap-8">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Shop By</h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700">Price</h3>
            <input
              type="range"
              min="200"
              max="60000"
              className="w-full mt-2"
            />
            <div className="flex justify-between text-sm mt-1 text-gray-500">
              <span>Rs. 200</span>
              <span>Rs. 60,000</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700">Colour</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Yellow</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Red</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700">Occasion</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Party</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Formal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Traditional</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700">Type</h3>
            <div className="mt-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Modern</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Ethnic</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <select className="border border-gray-300 rounded px-4 py-2">
              <option>Sort By</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>New Arrivals</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
                  >
                    {wishlist.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Rs. {product.price}</p>
                <button className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenCollection;
