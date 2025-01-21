import React, { useCallback, useMemo, useState } from 'react';

const JewelryCategories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const categories = useMemo(() => [
    {
      id: 1,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/common-wear.png",
      title: "Common Wear Jewelry",
      isCommonWear: true
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/date-night.png",
      title: "Date Night Jewelry",
      isCommonWear: false
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/party-wear.png",
      title: "Party Jewelry",
      isCommonWear: false
    },
    {
      id: 4,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/wedding.png",
      title: "Wedding Jewelry",
      isCommonWear: false
    }
  ], []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const CategoryCard = ({ category }) => (
    <div 
      className="flex-none w-[280px] sm:w-[320px] lg:w-[400px] 
                 text-center flex flex-col items-center 
                 transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] 
                    rounded-full overflow-hidden mb-4 sm:mb-5 
                    bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={category.image}
          alt={category.title}
          className={`w-full h-full object-cover transition-opacity duration-300 
                     ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </div>
      
      <div className="relative inline-block mt-2 group">
        <h2 className="text-xl sm:text-2xl font-['Albert_Sans'] tracking-wide
                     transition-colors duration-300 group-hover:text-gray-700 ">
          {category.title}
        </h2>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <div 
        className="w-full h-auto 
                   flex gap-6 sm:gap-8 
                   p-4 sm:p-6 lg:p-8 
                   overflow-x-auto scroll-smooth touch-pan-x scrollbar-hide
                   snap-x snap-mandatory"
      >
        {categories.map((category) => (
          <div key={category.id} className="snap-center">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>

      {/* Optional scroll indicators for desktop */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300 
                     hover:bg-gray-600 cursor-pointer"
          />
        ))}
      </div>
    </section>
  );
};

export default JewelryCategories;