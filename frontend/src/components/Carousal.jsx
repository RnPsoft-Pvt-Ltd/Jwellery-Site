import React, { useRef, useEffect, useState } from 'react';

const CategoryCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      title: "Platinum\nCollection",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%201321315013.png",
      bgColor: "bg-[#E5E4E2]"
    },
    {
      title: "Pearl\nCollection",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/pearl-carousel.png",
      bgColor: "bg-[#FBEDE9]"
    },
    {
      title: "Silver\nCollection",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/silver-carousel.png",
      bgColor: "bg-[#C0C0C0]"
    },
    {
      title: "Gold\nCollection",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/gold-carousel.png",
      bgColor: "bg-[#EFBF04]"
    }
  ];

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
          {slides.map((slide, index) => (
            <div 
              key={index}
              className="flex-none w-full snap-start h-[400px]"
            >
              <div className="relative h-full">
                <div className="relative w-full h-full flex">
                  <div className="absolute w-1/2 h-full right-0 flex items-center justify-center z-10 overflow-hidden">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center scale-120"
                    />
                  </div>
                  <div 
                    className={`w-[70%] h-full relative flex items-center z-20 ${slide.bgColor}`}
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
                    }}
                  />
                  <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 z-30">
                    <h3 className="text-5xl font-normal text-black font-['Albert_Sans-Light'] whitespace-pre-line leading-tight">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-[5%] flex gap-2.5 z-20">
          {slides.map((_, index) => (
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