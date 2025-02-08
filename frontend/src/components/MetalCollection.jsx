// import { useRef, useEffect, useState } from 'react';
// import { collectionService } from '../services/api'; 
// import { useNavigate } from 'react-router-dom';
// import { useImageLoader, useGlobalLoading } from '../utils/GlobalLoadingManager';

// const CollectionCarousel = () => {
//   const carouselRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [collections, setCollections] = useState([]);
//   const {isLoading} = useState();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch collections from the backend
//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const response = await collectionService.getCollections({ limit: 10, page: 1 });
//         const allowedCollections = ['Gold Collection', 'Silver Collection', 'Pearl Collection', 'Platinum Collection'];
        
//         const filteredCollections = response.data
//           .filter(collection => allowedCollections.includes(collection.name))
//           .map(collection => ({
//             id: collection.id,
//             title: collection.name,
//             image: collection.thumbnail || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
//             bgColor: getBgColorForCollection(collection.name),
//           }));
        
//         setCollections(filteredCollections);
//       } catch (err) {
//         console.error('Error fetching collections:', err);
//         setError('Failed to fetch collections');
//       } 
//     };
  
//     fetchCollections();
//   }, []);

//     // Register all collection images for loading tracking
//     collections.forEach(collection => {
//       useImageLoader(collection.image);
//     });

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel && collections.length > 0) {
//       const autoScroll = setInterval(() => {
//         const nextIndex = (activeIndex + 1) % collections.length;
//         scrollToIndex(nextIndex);
//       }, 3000); // Scroll every 3 seconds
  
//       return () => clearInterval(autoScroll);
//     }
//   }, [activeIndex, collections.length]);

//   const handleScroll = () => {
//     if (carouselRef.current) {
//       const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth);
//       setActiveIndex(index);
//     }
//   };

//   const scrollToIndex = (index) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: index * carouselRef.current.offsetWidth,
//         behavior: 'smooth'
//       });
//       setActiveIndex(index);
//     }
//   };

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       carousel.addEventListener('scroll', handleScroll);
//       return () => carousel.removeEventListener('scroll', handleScroll);
//     }
//   }, []);

//   // Helper function to assign background colors based on collection names
//   const getBgColorForCollection = (collectionName) => {
//     const colorMap = {
//       'Platinum': 'bg-[#E5E4E2]',
//       'Perl': 'bg-[#FBEDE9]',
//       'Silver': 'bg-[#C0C0C0]',
//       'Gold': 'bg-[#EFBF04]',
//       'default': 'bg-[#F5F5F5]'
//     };
    
//     const key = Object.keys(colorMap).find(key => 
//       collectionName.toLowerCase().includes(key.toLowerCase())
//     );
    
//     return colorMap[key] || colorMap.default;
//   };


//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-[400px] flex-col gap-2">
//         <div className="text-red-600">{error}</div>
//         <button 
//           className="px-4 py-2 bg-black text-white rounded"
//           onClick={() => {
//             setError(null);
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className='py-10 mt-10'>
//       {/* Heading */}
//       <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
//         Shop by Category
//       </div>

//       <div className="relative overflow-hidden w-full">
//         <div 
//           ref={carouselRef}
//           className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {collections.map((collection, index) => (
//             <div 
//             key={index}
//             className="flex-none w-full snap-start h-[400px] cursor-pointer"
//             onClick={() => navigate(`/collections/${collection.id}`)}
//           >

//               <div className="relative h-full">
//                 <div className="relative w-full h-full flex">
//                   <div className="absolute w-1/2 h-full right-0 flex items-center justify-center z-10 overflow-hidden">
//                     <img 
//                       src={collection.image}
//                       alt={collection.title}
//                       className="w-full h-full object-cover object-center scale-120"
//                       onError={(e) => {
//                         e.target.src = 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png';
//                       }}
//                     />
//                   </div>
//                   <div 
//                     className={`w-[70%] h-full relative flex items-center z-20 ${collection.bgColor}`}
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
//                     }}
//                   />
//                   <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 z-30">
//                     <h3 className="text-5xl font-thin text-black font-['Albert_Sans'] whitespace-pre-line leading-tight">
//                       {collection.title}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="absolute bottom-5 left-[5%] flex gap-2.5 z-20">
//           {collections.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => scrollToIndex(index)}
//               className={`w-10 h-2 transition-colors duration-300 ${
//                 activeIndex === index 
//                   ? 'bg-black' 
//                   : 'bg-white border border-black'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollectionCarousel;

//---


// import { useRef, useEffect, useState } from 'react';
// import { collectionService } from '../services/api'; 
// import { useNavigate } from 'react-router-dom';
// import { useGlobalLoading } from '../utils/GlobalLoadingManager';

// const CollectionCarousel = () => {
//   const carouselRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [collections, setCollections] = useState([]);
//   const { registerImage, markImageLoaded } = useGlobalLoading();
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Handle image loading in a single useEffect
//   useEffect(() => {
//     if (!collections.length) return;

//     collections.forEach(collection => {
//       registerImage(collection.thumbnail);
//       const img = new Image();
//       img.onload = () => markImageLoaded(collection.thumbnail);
//       img.onerror = () => markImageLoaded(collection.thumbnail);
//       img.src = collection.thumbnail;
//     });

//     return () => {
//       collections.forEach(collection => {
//         const img = new Image();
//         img.onload = null;
//         img.onerror = null;
//       });
//     };
//   }, [collections, registerImage, markImageLoaded]);

//   // Fetch collections from the backend
//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const response = await collectionService.getCollections({ limit: 10, page: 1 });
//         const allowedCollections = ['Gold Collection', 'Silver Collection', 'Pearl Collection', 'Platinum Collection'];
        
//         const filteredCollections = response.data
//           .filter(collection => allowedCollections.includes(collection.name))
//           .map(collection => ({
//             id: collection.id,
//             title: collection.name,
//             image: collection.thumbnail || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
//             bgColor: getBgColorForCollection(collection.name),
//           }));
        
//         setCollections(filteredCollections);
//       } catch (err) {
//         console.error('Error fetching collections:', err);
//         setError('Failed to fetch collections');
//       } 
//     };
  
//     fetchCollections();
//   }, []);

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel && collections.length > 0) {
//       const autoScroll = setInterval(() => {
//         const nextIndex = (activeIndex + 1) % collections.length;
//         scrollToIndex(nextIndex);
//       }, 3000); // Scroll every 3 seconds
  
//       return () => clearInterval(autoScroll);
//     }
//   }, [activeIndex, collections.length]);

//   const handleScroll = () => {
//     if (carouselRef.current) {
//       const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth);
//       setActiveIndex(index);
//     }
//   };

//   const scrollToIndex = (index) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollTo({
//         left: index * carouselRef.current.offsetWidth,
//         behavior: 'smooth'
//       });
//       setActiveIndex(index);
//     }
//   };

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       carousel.addEventListener('scroll', handleScroll);
//       return () => carousel.removeEventListener('scroll', handleScroll);
//     }
//   }, []);

//   const getBgColorForCollection = (collectionName) => {
//     const colorMap = {
//       'Platinum': 'bg-[#E5E4E2]',
//       'Perl': 'bg-[#FBEDE9]',
//       'Silver': 'bg-[#C0C0C0]',
//       'Gold': 'bg-[#EFBF04]',
//       'default': 'bg-[#F5F5F5]'
//     };
    
//     const key = Object.keys(colorMap).find(key => 
//       collectionName.toLowerCase().includes(key.toLowerCase())
//     );
    
//     return colorMap[key] || colorMap.default;
//   };

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-[400px] flex-col gap-2">
//         <div className="text-red-600">{error}</div>
//         <button 
//           className="px-4 py-2 bg-black text-white rounded"
//           onClick={() => setError(null)}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className='py-10 mt-10'>
//       <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
//         Shop by Category
//       </div>

//       <div className="relative overflow-hidden w-full">
//         <div 
//           ref={carouselRef}
//           className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {collections.map((collection, index) => (
//             <div 
//               key={collection.id}
//               className="flex-none w-full snap-start h-[400px] cursor-pointer"
//               onClick={() => navigate(`/collections/${collection.id}`)}
//             >
//               <div className="relative h-full">
//                 <div className="relative w-full h-full flex">
//                   <div className="absolute w-1/2 h-full right-0 flex items-center justify-center z-10 overflow-hidden">
//                     <img 
//                       src={collection.image}
//                       alt={collection.title}
//                       className="w-full h-full object-cover object-center scale-120"
//                       onError={(e) => {
//                         e.target.src = 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png';
//                       }}
//                     />
//                   </div>
//                   <div 
//                     className={`w-[70%] h-full relative flex items-center z-20 ${collection.bgColor}`}
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
//                     }}
//                   />
//                   <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 z-30">
//                     <h3 className="text-5xl font-thin text-black font-['Albert_Sans'] whitespace-pre-line leading-tight">
//                       {collection.title}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="absolute bottom-5 left-[5%] flex gap-2.5 z-20">
//           {collections.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => scrollToIndex(index)}
//               className={`w-10 h-2 transition-colors duration-300 ${
//                 activeIndex === index 
//                   ? 'bg-black' 
//                   : 'bg-white border border-black'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollectionCarousel;


import { useRef, useEffect, useState } from 'react';
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

const CollectionCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const { registerImage, markImageLoaded } = useGlobalLoading();
  const navigate = useNavigate();

  // Fetch collections from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Register a loading state for the API call
        const loadingKey = 'api-loading';
        registerImage(loadingKey);
        
        const response = await collectionService.getCollections({ limit: 10, page: 1 });
        const allowedCollections = ['Gold Collection', 'Silver Collection', 'Pearl Collection', 'Platinum Collection'];
        
        const filteredCollections = response.data
          .filter(collection => allowedCollections.includes(collection.name))
          .map(collection => ({
            id: collection.id,
            title: collection.name,
            image: collection.thumbnail || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
            bgColor: getBgColorForCollection(collection.name),
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

    useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel && collections.length > 0) {
      const autoScroll = setInterval(() => {
        const nextIndex = (activeIndex + 1) % collections.length;
        scrollToIndex(nextIndex);
      }, 3000); // Scroll every 3 seconds
  
      return () => clearInterval(autoScroll);
    }
  }, [activeIndex, collections.length]);

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
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

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

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px] flex-col gap-2">
        <div className="text-red-600">{error}</div>
        <button 
          className="px-4 py-2 bg-black text-white rounded"
          onClick={() => setError(null)}
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <div className='py-10 mt-10'>
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
            <div 
              key={collection.id}
              className="flex-none w-full snap-start h-[400px] cursor-pointer"
              onClick={() => navigate(`/collections/${collection.id}`)}
            >
              <div className="relative h-full">
                <div className="relative w-full h-full flex">
                  <div className="absolute w-1/2 h-full right-0 flex items-center justify-center z-10 overflow-hidden">
                    <LoadingImage 
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
                    <h3 className="text-5xl font-thin text-black font-['Albert_Sans'] whitespace-pre-line leading-tight">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
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

export default CollectionCarousel;