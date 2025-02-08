import React, { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalLoading } from '../utils/GlobalLoadingManager';

const ProductSlider = () => {
  const galleryRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { registerImage, markImageLoaded } = useGlobalLoading();

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/v1";

  const fetchProducts = async () => {
    try {

      // Register a loading state for the API call
      const loadingKey = 'api-loading';
      registerImage(loadingKey);

      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.data);

      // Mark API loading as complete
      markImageLoaded(loadingKey);

    } catch (error) {
      console.error("Error fetching products:", error);
      // Make sure to mark loading as complete even on error
      markImageLoaded('api-loading');
    }
  };


  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.get("http://localhost:5000/v1/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error.response?.data || error);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      // Decode userId from token (assuming JWT contains user ID)
      // const userId = JSON.parse(atob(token.split(".")[1])).id;

      // Check if the product is already in the wishlist
      const isWishlisted = wishlist.some(
        (item) => item.product_id === productId
      );

      if (isWishlisted) {
        // REMOVE from wishlist

        await axios.delete(`http://localhost:5000/v1/wishlist`, {
          data: { productId }, // Request body needs to be in a 'data' property
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setWishlist((prev) =>
          prev.filter((item) => item.product_id !== productId)
        );
        console.log("Removed from wishlist");
      } else {
        // ADD to wishlist
        const response = await axios.post(
          `http://localhost:5000/v1/wishlist`,
          {
            productId,
          },
          {
            // Request body needs to be in a 'data' property
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setWishlist((prev) => [...prev, response.data]);
        console.log("Added to wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [registerImage, markImageLoaded]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      

      <div className="relative pb-8">
        <div
          ref={galleryRef}
          className="w-full h-[400px] md:h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[250px] h-[350px] overflow-hidden relative bg-white"
            >
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
              >
                {wishlist.some((wish) => wish.product_id === item.id) ? (
                  "❤️"// Wishlisted (red)
                ) : (
                  "🤍" // Not wishlisted
                )}
              </button>
              <img
                src={
                  item.images[0]?.image_url ||
                  "https://via.placeholder.com/250x350"
                }
                alt={item.name}
                className="w-full h-[75%] object-cover"
                loading="lazy"
              />

              <div className="p-2 flex flex-col justify-between h-[30%]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    {item.name}
                  </span>
                  <span className="font-semibold text-gray-800">
                    Rs. {item.base_price}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="absolute bottom-5 right-1 py-1 bg-black text-white text-xs sm:text-sm uppercase hover:bg-gray-800 transition w-[100px] h-[30px]"
                >
                  Add to Cart
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
