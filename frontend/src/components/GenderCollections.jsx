import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const ALLOWED_CATEGORIES = ["Men", "Women", "Kids"];
import {
  useGlobalLoading,
  useImageLoader,
} from "../utils/GlobalLoadingManager";

const GenderCollections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const { registerImage, markImageLoaded } = useGlobalLoading();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
          // Register a loading state for the API call
          const loadingKey = 'api-loading';
          registerImage(loadingKey);

        const response = await axios.get(
          "https://api.shopevella.com/v1/collections"
        );
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
        markImageLoaded("api-loading");
      } 
    };
    fetchCollections();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-10">
      <div className="text-center py-8">
        {/* <h1 className="text-4xl font-bold">{title}</h1> */}
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
              src={collection.name.toLowerCase().includes("women")?"https://media-hosting.imagekit.io/34db6bfb3c4c411e/image.jpg?Expires=1840451818&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=leSo6TFWWD8q63O-WwWYwS5hKmiTu5qqYl25BtHLvZMxTNqu7nrGeZRNqyxzQ-VQ6KlkDOg-eqvKDqGoIz~-WM1iWw4iiP2JRcilqzCxMyusJ-RH3g2QPodY7K6Y2l9BnLcWjycsXfpfJsH90mpVz4qcUrwuqZJ6sB5fCjwClYiTY~T-tjQn6LgXsNzTE8e4dzqUmYEa9ofpQ3-UacQ2~gwUESJVbyFXcIVIKCSNY35N3qGLlme0y1OhC32CkuTe2yV4YtGB-zRx27CbOUErqo9V7St9bl6tdKpUb2SEvH-SIXVJ7i8v9QwkPcqRCO~Qibn3GunC90OdL-pm9EIjRg__":collection.thumbnail}
              alt={collection.name}
              loading="eager"
              className="w-full h-full object-cover rounded-md brightness-75 hover:brightness-100 transition-all duration-300"
            />

            {/* Collection Name */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-normal tracking-wide text-center transition-all duration-300 group-hover:text-2xl group-hover:font-bold">
              {collection.name.replace("Mens","Men's").replace("Women","Women's").replace("Kids","Kids'")}
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
