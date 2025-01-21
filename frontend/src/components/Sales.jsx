import { useState, useEffect } from 'react';

const Sales = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://storage.googleapis.com/jwelleryrnpsoft/pearl.png",
    "https://storage.googleapis.com/jwelleryrnpsoft/gold.png",
    "https://storage.googleapis.com/jwelleryrnpsoft/diamond.png"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };


  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[100%] h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-[100%] h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-[100%] h-[100%] bg-contain bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${slide})` }}
            />
            
            {/* Offers Title and Buy Now Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-[2%]">
              <h2 className="text-4xl md:text-5xl text-white font-albert">
                Offers
              </h2>
              <button className="px-8 py-2 font-albert border-2 text-2xl border-white text-white hover:bg-white hover:text-black transition-colors mt-auto mb-[5px]">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={` w-20 h-2 transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sales;