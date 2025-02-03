import React, { useCallback, useEffect, useState } from 'react';
import { collectionService } from '../services/api';

// Separate CategoryCard into its own component
const CategoryCard = ({ category }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  return (
    <div className="flex-none w-[280px] sm:w-[320px] lg:w-[400px] text-center flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden mb-4 sm:mb-5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={category.image}
          alt={category.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="relative inline-block mt-2 group">
        <h2 className="text-xl sm:text-2xl font-['Albert_Sans'] tracking-wide transition-colors duration-300 group-hover:text-gray-700">
          {category.title}
        </h2>
        {category.description && (
          <p className="text-sm text-gray-600 mt-1">
            {category.description}
          </p>
        )}
      </div>
    </div>
  );
};

const JewelryCategories = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ALLOWED_COLLECTIONS = ["Casual Jwellery", "Party Jwellery", "Date Night Jwellery"];

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await collectionService.getCollections({ limit: 10, page: 2 });
      console.log(response.data);

      const filteredCollections = response.data
        .filter(collection => ALLOWED_COLLECTIONS.includes(collection.name))
        .map(collection => ({
          title: collection.name,
          image: collection.thumbnail || '/api/placeholder/300/300',
        }));

        console.log(filteredCollections);

      setCollections(filteredCollections);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError('Failed to fetch collections');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px] flex-col gap-2">
        <div className="text-red-600">{error}</div>
        <button 
          className="px-4 py-2 bg-black text-white rounded"
          onClick={fetchCollections}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <div className="w-full h-auto flex gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 overflow-x-auto scroll-smooth touch-pan-x scrollbar-hide snap-x snap-mandatory">
        {collections.map((collection, index) => (
          <div key={collection.title || index} className="snap-center">
            <CategoryCard category={collection} />
          </div>
        ))}
      </div>

      <div className="hidden md:flex justify-center gap-2 mt-4">
        {collections.map((collection, index) => (
          <div
            key={collection.title || index}
            className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300 hover:bg-gray-600 cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
};

export default JewelryCategories;