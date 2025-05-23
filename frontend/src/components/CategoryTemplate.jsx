import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, Loader2, Sliders, X} from "lucide-react";
import { useToast } from "../utils/toastContext";

const CategoryTemplate = ({ 
  title, 
  categoryId,
  defaultFilters = {
    color: ["Gold", "Silver", "Platinum", "Rose Gold", "White Gold", "Diamond", "Pearl", "Black" , "Ruby", "Emerald", "Sapphire", "Solitare"],
    // occasion: ["Party", "Formal", "Traditional"],
    // type: ["Modern", "Ethnic"]
  }
}) => {
  //const navigate = useNavigate(); // todo
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    color: [],
    // occasion: [],
    // type: [],
  });

  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 60000 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 12
  });

  const calculateVariantPrice = (basePrice, priceModifier) => {
    return parseFloat(basePrice) + parseFloat(priceModifier || 0);
  };
  
  const transformProductsToVariants = (products) => {
    return products?.flatMap(product => 
      product.variants?.map(variant => ({
        ...variant,
        productId: product.id,
        productName: product.name,
        basePrice: parseFloat(product.base_price),
        totalPrice: calculateVariantPrice(product.base_price, variant.price_modifier),
        description: product.description,
        images: product.images,
        category: product.category
      })) || []
    ) || [];
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.shopevella.com/v1/categories/${categoryId}`);
        setCategory(response.data);
        
        const totalProducts = response.data.products.length;
        setPagination(prev => ({
          ...prev,
          total: totalProducts,
          totalPages: Math.ceil(totalProducts / prev.perPage)
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

  // const toggleWishlist = async (productId, variantId) => {
  //   try {
  //     if (wishlist.includes(`${productId}-${variantId}`)) {
  //       await axios.delete(`https://api.shopevella.com/v1/wishlist/${productId}`, { data: { variantId } });
  //     } else {
  //       await axios.post('https://api.shopevella.com/v1/wishlist', { productId, variantId });
  //     }
      
  //     setWishlist(prev =>
  //       prev.includes(`${productId}-${variantId}`) 
  //         ? prev.filter(id => id !== `${productId}-${variantId}`)
  //         : [...prev, `${productId}-${variantId}`]
  //     );
  //   } catch (error) {
  //     console.error('Error updating wishlist:', error);
  //   }
  // };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
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
  
  const allVariants = transformProductsToVariants(category?.products);
  const filteredVariants = allVariants
    .filter((product) => {

      const matchesPrice = product.totalPrice >= priceRange.min && 
                          product.totalPrice <= priceRange.max;
      const matchesColor = !activeFilters.color.length || 
      product.variants?.some(variant => activeFilters.color.includes(variant.color));

      return matchesPrice && matchesColor;
    })
    .sort((a, b) => {
      if (sort === "price-low-high") return a.totalPrice - b.totalPrice;
      if (sort === "price-high-low") return b.totalPrice - a.totalPrice;
      return 0;
    })
    .slice(startIndex, endIndex);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{category?.name || title}</h1>
          {category?.description && (
            <p className="mt-4 text-gray-600">{category.description}</p>
          )}
        </div>

        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50"
          >
            <Sliders className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <div className={`
            lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit
            ${showFilters ? 'fixed inset-0 z-50 overflow-auto' : 'hidden lg:block'}
          `}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              {showFilters && (
                <X 
                  className="lg:hidden w-6 h-6 cursor-pointer" 
                  onClick={() => setShowFilters(false)}
                />
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  value={priceRange.max}
                  onChange={handlePriceRangeChange}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm mt-1 text-gray-500">
                  <span>₹{priceRange.min}</span>
                  <span>₹{priceRange.max}</span>
                </div>
              </div>
              
              {Object.entries(defaultFilters).map(([category, options]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-900 capitalize mb-3">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          checked={activeFilters[category].includes(option)}
                          onChange={() => handleFilterChange(category, option)}
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid Section */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredVariants?.length} of {allVariants.length} variants
              </p>
              <select 
                className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="default">Sort By</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVariants?.map((variant) => (
              <VariantCard key={`${variant.productId}-${variant.id}`} variant={variant} />
            ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      pagination.currentPage === i + 1
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border hover:bg-gray-50'
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
    </div>
  );

};

const VariantCard = ({ variant }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await axios.get("https://api.shopevella.com/v1/wishlist", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setIsWishlisted(response.data.some(item => item.product_id === variant.productId));
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [variant.productId]);

  const handleWishlist = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      if (isWishlisted) {
        await axios.delete(`https://api.shopevella.com/v1/wishlist`, {
          data: { productId: variant.productId },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast({
          description: "Item removed from your wishlist",
        });
      } else {
        await axios.post(
          `https://api.shopevella.com/v1/wishlist`,
          { productId: variant.productId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        toast({
          description: "Item added to your wishlist",
        });
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast({
        variant: "destructive",
        description: "Failed to update wishlist. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
          if(!localStorage.getItem("user")||!localStorage.getItem("token"))window.location.href="/login"

      
        if(localStorage.getItem("cart")){
        localStorage.setItem("cart",Number(localStorage.getItem("cart"))+1)
      }else{
        localStorage.setItem("cart",1)
      }
      await axios.post(
        "https://api.shopevella.com/v1/cart",
        {
          productVariantId: variant.id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast({
        description: "Added to cart successfully",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        variant: "destructive",
        description: "Failed to add to cart. Please try again.",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(variant.totalPrice);

  return (
    <div
      onClick={() => navigate(`/products/${variant.productId}`)}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={variant.images?.[0]?.image_url}
          alt={variant.productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <button
          onClick={handleWishlist}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              }`}
            />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {variant.productName} - {variant.color} 
          </h3>
          <p className="text-lg font-semibold text-gray-900">
            {formattedPrice}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isAddingToCart ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
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

VariantCard.propTypes = {
  variant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image_url: PropTypes.string.isRequired
      })
    ),
  }).isRequired,
};

export default CategoryTemplate;