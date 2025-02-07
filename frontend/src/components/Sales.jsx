import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: "560883a9-0f36-44fb-98cd-ee0a3a69a4e8",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/pearl.png",
    },
    {
      id: "898a7627-1b2a-4bd6-98dd-6557ec46ed76",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/gold.png",
    },
    {
      id: "7503e9a3-aacd-4255-851e-b758c9f0aedf",
      image: "https://storage.googleapis.com/jwelleryrnpsoft/diamond.png",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    navigate(`/sales/${slides[currentSlide].id}`);
  };

  return (
    <div className="relative w-full h-[30rem] md:h-[40rem] lg:h-[45rem] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${slide.image})`, backgroundSize: '100% 100%' }}
            />
            
            {/* Offers Title and Buy Now Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-[2%] px-4 md:px-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center">
                Offers
              </h2>
              {/* Buy Now Button */}
              <button
                onClick={handleClick}
                className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-2xl font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition-colors mt-auto mb-6 md:mb-6"
              >
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
            className={`w-10 h-2 md:w-20 transition-colors rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sales;
