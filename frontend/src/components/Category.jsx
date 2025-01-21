import React, { useRef, useEffect } from 'react';

const CategoryGallery = () => {
  const containerRef = useRef(null);
  const indicatorRef = useRef(null);

  const categories = [
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2029.png", text: "Rings" },
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2030.png", text: "Earrings" },
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2031.png", text: "Necklace" },
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/bracelet-category.png", text: "Bracelets" },
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/amulet.png", text: "Amulets" },
    { image: "https://storage.googleapis.com/jwelleryrnpsoft/brooch-category.png", text: "Brooches" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    const handleScroll = () => {
      const scrollPercentage = 
        (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      indicator.style.transform = `translateX(${scrollPercentage}%)`;
    };

    if (container && indicator) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative pb-8 bg-[#FCF8FC]">
      <div 
        ref={containerRef}
        className="flex flex-row gap-4 h-[50vh] overflow-x-auto scrollbar-hide "
      >
        {categories.map((category, index) => (
          <div key={index} className="relative flex-none">
            <div className="relative h-full">
              <img 
                src={category.image} 
                alt={category.text}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]" />
              {/* Text overlay */}
              <div className="absolute bottom-[10%] left-0 w-full text-center text-white text-2xl font-normal font-['Arial'] drop-shadow-lg z-[2]">
                {category.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-5 w-full h-1 bg-gray-200">
        <div 
          ref={indicatorRef}
          className="h-full w-1/4 bg-black absolute left-0 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default CategoryGallery;