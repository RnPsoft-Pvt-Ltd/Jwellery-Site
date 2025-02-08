import { useCallback, useEffect, useState } from 'react';
import { collectionService } from '../services/api';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useGlobalLoading, useImageLoader } from '../utils/GlobalLoadingManager';

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

const CategoryCard = ({ collection }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  return (
    <div className="flex-none w-64 sm:w-80 lg:w-96 text-center flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden mb-4 sm:mb-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
        
          src={collection.image}
          alt={collection.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="relative inline-block mt-2 group">
        <h2 className="text-xl sm:text-2xl font-sans tracking-wide transition-colors duration-300 group-hover:text-gray-700">
          {collection.title}
        </h2>
        {collection.description && (
          <p className="text-sm text-gray-600 mt-1">
            {collection.description}
          </p>
        )}
      </div>
    </div>
  );
};

const JewelryCategories = () => {
  const [collections, setCollections] = useState([]);
  const { registerImage, markImageLoaded } = useGlobalLoading();
  const [error, setError] = useState(null);
  const navigate = useNavigate();




  useEffect(() => {
  const fetchCollections = async () => {
    try {

        // Register a loading state for the API call
        const loadingKey = 'api-loading';
        registerImage(loadingKey);

      const response = await collectionService.getCollections({ limit: 10, page: 1 });
      const allowedCollections = [
        'Casual Jwellery',
        'Party Jwellery',
        'Date Night Jwellery'
      ];

      if (!response.data) {
        throw new Error('No data received from the server');
      }

      // Updated mapping to match your data structure
      const filteredCollections = response.data
      .filter(collection => allowedCollections.includes(collection.name))
        .map(collection => ({
          id: collection.id, // Added id for key prop
          title: collection.name,
          image: collection.thumbnail,
          description: collection.description
        }));

      setCollections(filteredCollections);
              // Mark API loading as complete
              markImageLoaded(loadingKey);
      
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError(err.message || 'Failed to fetch collections');
              // Make sure to mark loading as complete even on error
              markImageLoaded('api-loading');
    }
  };
  
  fetchCollections();
  }, [registerImage, markImageLoaded]);


  if (error) {
    return (
      <div className="flex justify-center items-center h-96 flex-col gap-2">
        <div className="text-red-600">{error}</div>
        <button 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-300"
          onClick={fetchCollections}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4">
      <div className="w-full h-auto flex gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 overflow-x-auto scroll-smooth touch-pan-x snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {collections.map((collection) => (
          <div 
          key={collection.id} 
          className="snap-center"
          onClick={() => navigate(`/collections/${collection.id}`)}
          >
            <CategoryCard collection={collection} />
          </div>
        ))}
      </div>

    </section>
  );
};

CategoryCard.propTypes = {
  collection: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default JewelryCategories;