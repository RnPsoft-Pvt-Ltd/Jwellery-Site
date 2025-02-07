import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      src: "https://storage.googleapis.com/jwelleryrnpsoft/feat1.jpeg",
      title: "Product 1",
      description: "This is a brief description of Product 1.",
    },
    {
      src: "https://storage.googleapis.com/jwelleryrnpsoft/feat2.jpeg",
      title: "Product 2",
      description: "This is a brief description of Product 2.",
    },
    {
      src: "https://storage.googleapis.com/jwelleryrnpsoft/feat3.jpeg",
      title: "Product 3",
      description: "This is a brief description of Product 3.",
    },
  ];

  const totalSlides = images.length;

  const showSlide = (index) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

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
            <div className="min-w-full relative group" key={index}>
              {/* Image with Blur Effect on Hover */}
              <div className="relative w-full h-72 overflow-hidden">
  {/* Image */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    src={image.src}
                    alt={`Slide ${index + 1}`}
                  />
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>


              {/* Title (centered, only appears on hover) */}
              <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.title}
              </div>

              {/* Description at Bottom (always visible, no shadow) */}
              <div className="absolute bottom-0 left-0 w-full bg-transparent text-white p-3 text-center transition-opacity duration-300">
                <p className="text-sm">{image.description}</p>
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
