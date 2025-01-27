import React, { useState } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://storage.googleapis.com/jwelleryrnpsoft/feat1.jpeg",
    "https://storage.googleapis.com/jwelleryrnpsoft/feat2.jpeg",
    "https://storage.googleapis.com/jwelleryrnpsoft/feat3.jpeg"
  ];

  const showSlide = (index) => {
    if (index < 0) {
      setCurrentSlide(slides.length - 1);
    } else if (index >= slides.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-full max-w-lg overflow-hidden border-2 border-gray-300 rounded-lg">
        {/* Slides Container */}
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((src, idx) => (
            <div key={idx} className="min-w-full">
              <img className="w-full h-[300px] object-cover rounded-lg" src={src} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
          <button onClick={prevSlide} className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
            &#10094;
          </button>
          <button onClick={nextSlide} className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80">
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
