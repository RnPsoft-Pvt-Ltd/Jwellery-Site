import React, { useState } from "react";

const ProductSlider = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.png",
      price: "Rs. 2000",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/bangle.jpeg",
      price: "Rs. 1600",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/00481006-01.webp",
      price: "Rs. 3000",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/earring.jpeg",
      price: "Rs. 5000",
    },
  ];

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-4/5 mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full flex flex-col items-center p-5 bg-white rounded-lg shadow-md">
            <img
              src={slide.imgSrc}
              alt={`Product ${idx + 1}`}
              className="w-60 h-60 object-cover rounded-lg" /* Ensures equal image size */
            />
            <p className="mt-2 text-lg font-semibold text-black">{slide.price}</p>
            <button className="mt-2 px-4 py-2 border border-black text-black uppercase rounded hover:bg-black hover:text-white transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 w-full flex justify-between transform -translate-y-1/2">
        <button onClick={prevSlide} className="p-3 bg-black/50 text-white rounded-full text-xl">
          &#10094;
        </button>
        <button onClick={nextSlide} className="p-3 bg-black/50 text-white rounded-full text-xl">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
