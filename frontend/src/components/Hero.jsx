import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useImageLoader } from "../utils/GlobalLoadingManager";

const slides = [
  {
    image: "https://storage.googleapis.com/jwelleryrnpsoft/image.png",
    heading: "Discover the Beauty",
    text: "Always Enhancing What's Already Beautiful",
    textPosition: "left-16 top-1/3",
    contentPosition: "right-16 bottom-32 text-left",
  },
  {
    image: "https://storage.googleapis.com/jwelleryrnpsoft/hero.png",
    heading: "Grace in Every Detail",
    text: "Always Enhancing What's Already Beautiful",
    textPosition: "center top-1/4",
    contentPosition: "left-16 bottom-32 text-right",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  // Preload all images
  slides.forEach((slide) => {
    useImageLoader(slide.image);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center bg-cover bg-center transition-opacity duration-3000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Fade Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Heading */}
          <h2
            className={`absolute text-5xl font-light text-white transition-opacity duration-1000 ${slide.textPosition}`}
          >
            {slide.heading}
          </h2>

          {/* Text and Button */}
          <div
            className={`absolute text-white transition-opacity duration-1000 ${slide.contentPosition}`}
          >
            <p className="text-lg font-light mb-4">{slide.text}</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 border-2 border-white text-white text-lg hover:bg-white hover:text-black transition"
            >
              Explore Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
