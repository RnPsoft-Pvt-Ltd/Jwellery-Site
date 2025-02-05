import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const CategoryTemplate = ({ 
  title, 
  categoryId,
  defaultFilters = {
    color: ["Gold", "Silver"],
    occasion: ["Party", "Formal", "Traditional"],
    type: ["Modern", "Ethnic"]
  }
}) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    color: [],
    occasion: [],
    type: [],
  });
  const [wishlist, setWishlist] = useState([]);
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 60000 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 10
  });

  // Helper function to calculate variant price
  const calculateVariantPrice = (basePrice, priceModifier) => {
    return parseFloat(basePrice) + parseFloat(priceModifier || 0);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/v1/categories/${categoryId}`);
        setCategory(response.data);
        
        // Count total variants instead of products
        const totalVariants = response.data.products.reduce(
          (acc, product) => acc + (product.variants?.length || 0), 
          0
        );
        
        setPagination(prev => ({
          ...prev,
          total: totalVariants,
          totalPages: Math.ceil(totalVariants / prev.perPage)
        }));
      } catch (err) {
        console.error('Error fetching category:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleFilterChange = (category, value) => {
    setActiveFilters((prev) => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      max: value
    }));
  };

  const toggleWishlist = async (productId, variantId) => {
    try {
      if (wishlist.includes(`${productId}-${variantId}`)) {
        await axios.delete(`http://localhost:5000/v1/wishlist/${productId}`, { data: { variantId } });
      } else {
        await axios.post('http://localhost:5000/v1/wishlist', { productId, variantId });
      }
      
      setWishlist(prev =>
        prev.includes(`${productId}-${variantId}`) 
          ? prev.filter(id => id !== `${productId}-${variantId}`)
          : [...prev, `${productId}-${variantId}`]
      );
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const startIndex = (pagination.currentPage - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  
  // Transform products into variant-based display items
  const allVariants = category?.products?.flatMap(product => 
    product.variants?.map(variant => ({
      ...variant,
      productId: product.id,
      productName: product.name,
      basePrice: product.base_price,
      totalPrice: calculateVariantPrice(product.base_price, variant.price_modifier),
      description: product.description,
      images: product.images // We'll use variant-specific images if available
    })) || []
  ) || [];

  const filteredVariants = allVariants
    .filter((variant) => {

      const matchesPrice = variant.totalPrice >= priceRange.min && 
                          variant.totalPrice <= priceRange.max;
      const matchesColor = !activeFilters.color.length || 
        activeFilters.color.includes(variant.color);
      
      return matchesPrice && matchesColor;
    })
    .sort((a, b) => {
      if (sort === "price-low-high") return a.totalPrice - b.totalPrice;
      if (sort === "price-high-low") return b.totalPrice - a.totalPrice;
      return 0;
    })
    .slice(startIndex, endIndex);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/" className="text-lg font-semibold">Collection</a>
            <a href="/" className="text-lg font-semibold">About Us</a>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="text-xl">🔍</button>
            <button className="text-xl">❤️</button>
            <button className="text-xl">🛒</button>
            <button className="text-xl">👤</button>
          </div>
        </div>
      </nav> */}
      <Navbar />

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold">{category?.name || title}</h1>
        {category?.description && (
          <p className="mt-2 text-gray-600">{category.description}</p>
        )}
      </div>

      <div className="flex px-10 gap-8">
        <div className="w-1/4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Shop By</h2>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700">Price</h3>
            <input
              type="range"
              min="0"
              max="60000"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-sm mt-1 text-gray-500">
              <span>Rs. {priceRange.min}</span>
              <span>Rs. {priceRange.max}</span>
            </div>
          </div>
          
          {Object.entries(defaultFilters).map(([category, options]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 capitalize">{category}</h3>
              <div className="mt-2 space-y-2">
                {options.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={activeFilters[category].includes(option)}
                      onChange={() => handleFilterChange(category, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">
              Showing {filteredVariants.length} of {allVariants.length} variants
            </div>
            <select 
              className="border border-gray-300 rounded px-4 py-2"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVariants.map((variant) => (
              console.log("Variant", variant),
              <div
                key={`${variant.productId}-${variant.id}`}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
                onClick={() => navigate(`/products/${variant.product_id}`)}
              >
                <div className="relative">
                  <img
                    src={variant.image_url || variant.images?.find(img => img.is_primary)?.image_url || '/placeholder.jpg'}
                    alt={`${variant.productName} - ${variant.color} ${variant.size}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(variant.productId, variant.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
                  >
                    {wishlist.includes(`${variant.productId}-${variant.id}`) ? "❤️" : "🤍"}
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{variant.productName}</h3>
                <p className="text-gray-600">{variant.color} - {variant.size}</p>
                <p className="text-gray-500">Rs. {variant.totalPrice}</p>
                <button className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                  className={`px-4 py-2 rounded ${
                    pagination.currentPage === i + 1
                      ? 'bg-black text-white'
                      : 'bg-white text-black border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CategoryTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  defaultFilters: PropTypes.shape({
    color: PropTypes.arrayOf(PropTypes.string),
    occasion: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CategoryTemplate;