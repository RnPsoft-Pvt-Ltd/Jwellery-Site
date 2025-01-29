import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Artsy Toys and Accessories",
    price: 2000,
    image: "https://storage.googleapis.com/jwelleryrnpsoft/kids1.jpeg", // Replace with your Google Cloud image URL
    color: "Yellow",
    occasion: "Party",
    type: "Modern",
  },
  {
    id: 2,
    name: "Set of Assorted Earrings",
    price: 790,
    image: "https://storage.googleapis.com/jwelleryrnpsoft/kids2.jpeg", // Replace with your Google Cloud image URL
    color: "Yellow",
    occasion: "Formal",
    type: "Ethnic",
  },
  {
    id: 3,
    name: "Shell Ring",
    price: 2000,
    image: "https://storage.googleapis.com/jwelleryrnpsoft/kids3.jpeg", // Replace with your Google Cloud image URL
    color: "Yellow",
    occasion: "Traditional",
    type: "Modern",
  },
];

const KidsCollection = () => {
  const [filters, setFilters] = useState({
    color: [],
    occasion: [],
    type: [],
  });
  const [sort, setSort] = useState("default");

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  const handleSortChange = (e) => setSort(e.target.value);

  const filteredProducts = products
    .filter((product) => {
      // Apply filters
      const { color, occasion, type } = filters;
      const matchesColor = !color.length || color.includes(product.color);
      const matchesOccasion = !occasion.length || occasion.includes(product.occasion);
      const matchesType = !type.length || type.includes(product.type);
      return matchesColor && matchesOccasion && matchesType;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sort === "price-low-high") return a.price - b.price;
      if (sort === "price-high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-white text-black">
      <header className="flex justify-between items-center p-4 shadow-md">
        <div className="text-lg font-bold">Collection</div>
        <div className="text-lg font-bold">About Us</div>
      </header>

      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Kids</h1>
        <div className="flex">
          {/* Filters */}
          <aside className="w-1/4 pr-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Shop By</h2>
              <label className="block my-2">
                <span>Price</span>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  className="w-full mt-1"
                />
              </label>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Colour</h2>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("color", "Yellow")}
                />
                <span className="ml-2">Yellow</span>
              </label>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("color", "Red")}
                />
                <span className="ml-2">Red</span>
              </label>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Occasion</h2>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("occasion", "Party")}
                />
                <span className="ml-2">Party</span>
              </label>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("occasion", "Formal")}
                />
                <span className="ml-2">Formal</span>
              </label>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("occasion", "Traditional")}
                />
                <span className="ml-2">Traditional</span>
              </label>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Type</h2>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("type", "Modern")}
                />
                <span className="ml-2">Modern</span>
              </label>
              <label className="block my-2">
                <input
                  type="checkbox"
                  onChange={() => handleFilterChange("type", "Ethnic")}
                />
                <span className="ml-2">Ethnic</span>
              </label>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg">Sort By</div>
              <select
                className="border p-2 rounded"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-gray-500">Rs. {product.price}</p>
                  <button className="bg-black text-white mt-2 py-2 px-4 rounded hover:bg-gray-800">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default KidsCollection;
