import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, Loader2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const ProductSlider = () => {
  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishloadingStates, setWishLoadingStates] = useState({});
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/v1";

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const toggleWishlist = async (productId) => {
    setWishLoadingStates(prev => ({ ...prev, [productId]: true }));
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const isWishlisted = wishlist.some(item => item.product_id === productId);

      if (isWishlisted) {
        await axios.delete(`${BASE_URL}/wishlist`, {
          data: { productId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(prev => prev.filter(item => item.product_id !== productId));
      } else {
        const response = await axios.post(
          `${BASE_URL}/wishlist`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        setWishlist(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setWishLoadingStates(prev => ({ ...prev, [productId]: false }));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[280px] flex-none bg-white rounded-lg shadow animate-pulse">
              <div className="h-[250px] bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Product Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] flex-none bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.images[0]?.image_url || "/api/placeholder/280/250"}
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded-t-lg"
                  loading="lazy"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  disabled={wishloadingStates[product.id]}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all disabled:cursor-not-allowed"
                >
                  {wishloadingStates[product.id] ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.some((w) => w.product_id === product.id)
                          ? "fill-red-500 stroke-red-500"
                          : "stroke-gray-600"
                      }`}
                    />
                  )}
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-black-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{product.base_price}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;