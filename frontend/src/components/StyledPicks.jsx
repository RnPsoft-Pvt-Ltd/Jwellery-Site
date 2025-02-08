import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageLoader } from "../utils/GlobalLoadingManager";

const jewelryItems = [
  { id: 1, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry1.png", alt: "Jewelry item 1" },
  { id: 2, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry2.png", alt: "Jewelry item 2" },
  { id: 3, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry3.png", alt: "Jewelry item 3" },
  { id: 4, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry4.png", alt: "Jewelry item 4" },
  { id: 5, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry5.png", alt: "Jewelry item 5" }
];


const StyledPicks = () => {
  const navigate = useNavigate();
  const galleryRef = useRef(null);

    // Preload all images
    jewelryItems.forEach((slide) => {
      useImageLoader(slide.image);
    });


  const handleItemClick = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <h1 className="text-center py-8 sm:py-12 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight font-['Albert_Sans']">
        Styled Picks
      </h1>

      <div className="relative pb-8">
        <div 
          ref={galleryRef}
          className="w-full h-[400px] md:h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
          style={{ scrollBehavior: 'smooth' }}
        >
          {jewelryItems.map((item) => (
            <div 
              key={item.id}
              onClick={handleItemClick}
              className="flex-none w-[250px] sm:w-[280px] lg:w-[320px] 
                       h-[340px] sm:h-[380px] lg:h-[420px] 
                       rounded-xl overflow-hidden relative 
                       transform transition-transform duration-300 hover:scale-[1.02]
                       cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default StyledPicks;