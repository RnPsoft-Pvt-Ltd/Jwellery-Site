import React, { useState } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    'https://storage.googleapis.com/jwelleryrnpsoft/feat1.jpeg',
    'https://storage.googleapis.com/jwelleryrnpsoft/feat2.jpeg',
    'https://storage.googleapis.com/jwelleryrnpsoft/feat3.jpeg',
  ];

  const showSlide = (index) => {
    const totalSlides = images.length;
    if (index < 0) {
      setCurrentSlide(totalSlides - 1);
    } else if (index >= totalSlides) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(index);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-light text-gray-900 mb-6 text-center mt-10">Featured Products</h2>
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden border-2 border-gray-300 rounded-lg">
      
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="min-w-full" key={index}>
            <img className="w-full h-72 object-cover rounded-lg" src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
        <button
          className="bg-black bg-opacity-50 text-white p-2 rounded-full text-2xl cursor-pointer hover:bg-opacity-80"
          onClick={() => showSlide(currentSlide - 1)}
        >
          &#10094;
        </button>
        <button
          className="bg-black bg-opacity-50 text-white p-2 rounded-full text-2xl cursor-pointer hover:bg-opacity-80"
          onClick={() => showSlide(currentSlide + 1)}
        >
          &#10095;
        </button>
      </div>
    </div>
    </div>
  );
};

export default ImageSlider;
