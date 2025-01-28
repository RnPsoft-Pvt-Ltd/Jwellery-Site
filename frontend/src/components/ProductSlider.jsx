import React, { useState } from "react";
import { IoHeartCircleOutline } from "react-icons/io5"; // Import heart circle outline icon

const ProductSlider = () => {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/earring.png.png",
      name: "Earring",
      price: "Rs. 2000",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/bangle.jpeg",
      name: "Bangle",
      price: "Rs. 1600",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/00481006-01.webp",
      name: "Necklace",
      price: "Rs. 3000",
    },
    {
      imgSrc: "https://storage.googleapis.com/jwelleryrnpsoft/earring.jpeg",
      name: "Stud Earring",
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
          <div key={idx} className="w-full flex flex-col items-center px-3 py-5 bg-white relative">
            {/* Heart Icon for Wishlist, no outer circle, just the icon */}
            <button className="absolute top-6 right-5 p-2 bg-transparent">
              <IoHeartCircleOutline className="text-gray-500 text-3xl" />
            </button>

            <img
              src={slide.imgSrc}
              alt={`Product ${idx + 1}`}
              className="w-60 h-60 object-cover rounded-lg"
            />
            <div className="flex justify-between w-full mt-2">
              <p className="text-lg font-semibold text-black">{slide.name}</p>
              <p className="text-lg font-semibold text-black">{slide.price}</p>
            </div>
            <div className="flex justify-end w-full mt-1">
              <button className="px-2 py-1 bg-black text-white text-xs uppercase hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
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
