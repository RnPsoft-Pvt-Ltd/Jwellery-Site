import React, { useState } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: 'https://storage.googleapis.com/jwelleryrnpsoft/feat1.jpeg',
      title: 'Product 1',
      description: 'This is a brief description of Product 1.',
    },
    {
      src: 'https://storage.googleapis.com/jwelleryrnpsoft/feat2.jpeg',
      title: 'Product 2',
      description: 'This is a brief description of Product 2.',
    },
    {
      src: 'https://storage.googleapis.com/jwelleryrnpsoft/feat3.jpeg',
      title: 'Product 3',
      description: 'This is a brief description of Product 3.',
    },
  ];

  const showSlide = (index) => {
    const totalSlides = images.length;
    setCurrentSlide((index + totalSlides) % totalSlides); // Handles circular navigation
  };

  return (
    <div>
      <h2 className="text-4xl font-light text-gray-900 mb-6 text-center mt-10">
        Featured Products
      </h2>
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden border-2 border-gray-300 rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              className="min-w-full relative group"
              key={index}
            >
              {/* Image Container */}
              <img
                className="w-full h-72 object-cover transition duration-300 group-hover:blur-sm"
                src={image.src}
                alt={`Slide ${index + 1}`}
              />

              {/* Hover Effect Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-2xl font-bold mb-2 text-center">{image.title}</h3>
                <p className="text-white mb-4 text-center">{image.description}</p>
                {/* Button aligned to bottom right */}
                <button className="absolute bottom-4 right-4 text-white text-lg font-semibold hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
          <button
            className="bg-black bg-opacity-50 text-white p-2 rounded-full text-xl cursor-pointer hover:bg-opacity-80"
            onClick={() => showSlide(currentSlide - 1)}
          >
            &#10094;
          </button>
          <button
            className="bg-black bg-opacity-50 text-white p-2 rounded-full text-xl cursor-pointer hover:bg-opacity-80"
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
