import React, { useRef, useEffect, useState } from 'react';
import { collectionService } from '../services/api'; 

const CategoryCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch collections from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await collectionService.getCollections({ limit: 10, page: 1 });
        console.log(response);
        // Filter for specific collections
        const allowedCollections = ['Gold Collection', 'Silver Collection', 'Perl Collection', 'Platinum Collection'];
        
        const filteredCollections = response.data
          .filter(collection => allowedCollections.includes(collection.name))
          .map(collection => ({
            title: collection.name,
            image: collection.products?.[0]?.images?.[0]?.image_url || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
            bgColor: getBgColorForCollection(collection.name),
          }));
        
        setCollections(filteredCollections);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to fetch collections');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCollections();
  }, []);

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Helper function to assign background colors based on collection names
  const getBgColorForCollection = (collectionName) => {
    const colorMap = {
      'Platinum': 'bg-[#E5E4E2]',
      'Perl': 'bg-[#FBEDE9]',
      'Silver': 'bg-[#C0C0C0]',
      'Gold': 'bg-[#EFBF04]',
      'default': 'bg-[#F5F5F5]'
    };
    
    const key = Object.keys(colorMap).find(key => 
      collectionName.toLowerCase().includes(key.toLowerCase())
    );
    
    return colorMap[key] || colorMap.default;
  };

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
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchCollections();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='py-10 mt-10'>
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Shop by Category
      </div>

      <div className="relative overflow-hidden w-full">
        <div 
          ref={carouselRef}
          className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collections.map((collection, index) => (
            console.log("collection",collection),
            console.log("index",index),
            <div 
              key={index}
              className="flex-none w-full snap-start h-[400px]"
            >
              <div className="relative h-full">
                <div className="relative w-full h-full flex">
                  <div className="absolute w-1/2 h-full right-0 flex items-center justify-center z-10 overflow-hidden">
                    <img 
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover object-center scale-120"
                      onError={(e) => {
                        e.target.src = 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png';
                      }}
                    />
                  </div>
                  <div 
                    className={`w-[70%] h-full relative flex items-center z-20 ${collection.bgColor}`}
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
                    }}
                  />
                  <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 z-30">
                    <h3 className="text-5xl font-normal text-black font-['Albert_Sans-Light'] whitespace-pre-line leading-tight">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-[5%] flex gap-2.5 z-20">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-10 h-2 transition-colors duration-300 ${
                activeIndex === index 
                  ? 'bg-black' 
                  : 'bg-white border border-black'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;