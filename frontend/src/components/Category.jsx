import { useRef, useEffect, useState } from "react";
import { categoryService } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  useGlobalLoading,
  useImageLoader,
} from "../utils/GlobalLoadingManager";

// Create a wrapper component for images
const LoadingImage = ({ src, alt, className, onError }) => {
  useImageLoader(src);

  return <img src={src} alt={alt} className={className} onError={onError} />;
};

const CategoryCarousal = () => {
  const indicatorRef = useRef(null);
  const carouselRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const { registerImage, markImageLoaded } = useGlobalLoading();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Register a loading state for the API call
        const loadingKey = "api-loading";
        registerImage(loadingKey);

        const response = await categoryService.getCategories({
          limit: 10,
          page: 1,
        });

        // Access the data property of the response
        const categoryData = response.data;

        // Transform the backend data to match the frontend structure
        const transformedCategories = categoryData.map((category) => ({
          id: category.id,
          image:
            category.thumbnail ||
            "https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png",
          title: category.name,
        }));

        setCategories(transformedCategories);
        // Mark API loading as complete
        markImageLoaded(loadingKey);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        // Make sure to mark loading as complete even on error
        markImageLoaded("api-loading");
      }
    };

    fetchCategories();
  }, [registerImage, markImageLoaded]);

  useEffect(() => {
    const container = carouselRef.current;
    const indicator = indicatorRef.current;

    const handleScroll = () => {
      const scrollPercentage =
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100;
      indicator.style.transform = `translateX(${scrollPercentage}%)`;
    };

    if (container && indicator) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh] bg-[#FCF8FC]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative pb-8 bg-[#FCF8FC]">
      <div
        ref={carouselRef}
        className="w-full h-[400px] md:h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative flex-none"
            onClick={() => navigate(`/categories/${category.id}`)}
          >
            <div className="relative h-full">
              <img
                src={category.image}
                alt={category.title}
                className="w-[300px] h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]" />
              <div className="absolute bottom-[10%] left-0 w-full text-center text-white text-2xl font-normal font-['Arial'] drop-shadow-lg z-[2]">
                {category.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousal;
