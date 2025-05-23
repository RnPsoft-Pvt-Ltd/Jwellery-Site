import {useEffect, useState } from 'react';
import { collectionService } from '../services/api'; 
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


const SpecialProducts = () => {
    const [collections, setCollections] = useState([]);
    const { registerImage, markImageLoaded } = useGlobalLoading();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    // Fetch collections from the backend
    useEffect(() => {
      const fetchCollections = async () => {
        try {
        // Register a loading state for the API call
        const loadingKey = 'api-loading';
        registerImage(loadingKey);

        const response = await collectionService.getCollections({ limit: 10, page: 1 });
        const allowedCollections = ["Wedding Jwellery", "Festive Jwellery", "Auspicious Jwellery"];
          
          const filteredCollections = response.data
            .filter(collection => allowedCollections.includes(collection.name))
            .map(collection => ({
              id: collection.id,
              title: collection.name,
              image: collection.thumbnail || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
            }));
          
          setCollections(filteredCollections);
        // Mark API loading as complete
        markImageLoaded(loadingKey);
        } catch (err) {
          console.error('Error fetching collections:', err);
          setError('Failed to fetch collections');
        // Make sure to mark loading as complete even on error
        markImageLoaded('api-loading');
        } 
      };
    
      fetchCollections();
    }, [registerImage, markImageLoaded]);

  
    if (error) {
      return (
        <div className="flex justify-center items-center h-[400px] flex-col gap-2">
          <div className="text-red-600">{error}</div>
          <button 
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => {
              setError(null);
              setLoading(true);
              //fetchCollections();
            }}
          >
            Retry
          </button>
        </div>
      );
    }
  
  

  return (
    <section className="text-center py-10 px-5">
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Special Products
      </div>


      <div className="flex flex-wrap justify-center gap-5">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="relative w-[300px] h-[300px] overflow-hidden
                     transition-all duration-300 ease-in-out 
                     hover:transform hover:-translate-y-2.5 hover:shadow-xl"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-full object-cover absolute top-0 left-0"
            />
            
            <div className="absolute inset-0 bg-black/50 text-white flex flex-col justify-between p-2.5">
                  <div className="flex justify-center items-center h-[125px] text-4xl  md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
                    {collection.title}
                  </div>
              
              <button
                onClick={() => navigate(`/collections/${collection.id}`)}
                className="self-center mb-8 px-5 py-2.5 bg-black text-white border border-white
                         cursor-pointer transition-colors duration-300 ease-in-out
                         hover:bg-white hover:text-black  font-['Albert_Sans']"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialProducts;