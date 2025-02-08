import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalLoading } from "../utils/GlobalLoadingManager";

// Create a wrapper component for images
const LoadingImage = ({ src, alt, className, onError }) => {
  useImageLoader(src);
  
  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      onError={onError}
    />
  );
};

const GenderCollections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const { registerImage, markImageLoaded } = useGlobalLoading();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collections.length) return;

    collections.forEach((collection) => {
      registerImage(collection.image);
      const img = new Image();
      img.onload = () => markImageLoaded(collection.image);
      img.onerror = () => markImageLoaded(collection.image);
      img.src = collection.image;
    });

    return () => {
      collections.forEach((collection) => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [collections, registerImage, markImageLoaded]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
          // Register a loading state for the API call
          const loadingKey = 'api-loading';
          registerImage(loadingKey);

        const response = await axios.get(
          "http://localhost:5000/v1/collections"
        );
        console.log("response", response.data.data);
        const ALLOWED_CATEGORIES = ["Men", "Women", "Kids"];

        const filteredCollections = response.data.data.filter((collection) =>
          ALLOWED_CATEGORIES.some((category) =>
            collection.name.toLowerCase().includes(category.toLowerCase())
          )
        );
        setCollections(filteredCollections);
        // Mark API loading as complete
        markImageLoaded(loadingKey);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collections.");

        // Make sure to mark loading as complete even on error
        markImageLoaded('api-loading');
      } 
    };
    fetchCollections();
  }, [registerImage, markImageLoaded]);
  // console.log("collections", collections);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center py-8">
        {/* <h1 className="text-4xl font-bold">{title}</h1>  */}
      </div>

      <div className="flex flex-wrap justify-center gap-5 p-5">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => navigate(`/collections/${collection.id}`)}
            className="relative w-72 h-72 border-2 border-transparent rounded-md overflow-hidden focus:outline-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {/* Image with hover effect */}
            <img
              src={collection.thumbnail}
              alt={collection.name}
              loading="eager"
              className="w-full h-full object-cover rounded-md brightness-75 hover:brightness-100 transition-all duration-300"
            />

            {/* Collection Name */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-normal tracking-wide text-center transition-all duration-300 group-hover:text-2xl group-hover:font-bold">
              {collection.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// GenderCollections.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default GenderCollections;
