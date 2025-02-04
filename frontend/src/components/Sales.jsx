import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sales = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
    const handleClick = (id) => {
      navigate(`/collections/${id}`);
    };

  const slides = [
    "https://storage.googleapis.com/jwelleryrnpsoft/pearl.png",
    "https://storage.googleapis.com/jwelleryrnpsoft/gold.png",
    "https://storage.googleapis.com/jwelleryrnpsoft/diamond.png"
  ];

  // const slides = [
  //   {
  //     id: "7dcd2e58-2bbe-45ef-90e7-b78500bf3eed",
  //     image: "https://storage.googleapis.com/jwelleryrnpsoft/pearl.png",
  //   },
  //   {
  //     id: "7515ebd5-8aa4-4634-9610-f4644f1d58c3",
  //     image: "https://storage.googleapis.com/jwelleryrnpsoft/gold.png",
  //   },
  //   {
  //     id: "005daa73-7472-442e-be9b-b52952830658",
  //     image: "https://storage.googleapis.com/jwelleryrnpsoft/diamond.png",
  //   },
  // ];
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[100%] h-[30rem] md:h-[40rem] lg:h-[45rem] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover bg-no-repeat bg-center md:bg-center lg:bg-center"
              style={{ backgroundImage: `url(${slide})`, backgroundSize: '100% 100%' }}
            />
            
            {/* Offers Title and Buy Now Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-[2%] px-4 md:px-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center">
                Offers
              </h2>
              <button onClick={()=>navigate(`/collections/76453539-a29b-4dd2-80b4-daea17fc0dbf`)} className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-2xl font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition-colors mt-auto mb-6 md:mb-6">
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
