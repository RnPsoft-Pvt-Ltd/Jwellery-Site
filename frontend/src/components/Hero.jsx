import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "https://storage.googleapis.com/jwelleryrnpsoft/image.png",
    heading: "Heading",
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
  const [visibleSlide, setVisibleSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fade-out effect

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 500); // Delay text update for smooth transition

      setTimeout(() => {
        setIsFading(false); // Fade in new text after delay
        setVisibleSlide((prev) => (prev + 1) % slides.length);
      }, 1000); // Matches the duration of background transition
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
    >
      {/* Fade Overlay for Smooth Transition */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-500 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      {/* Heading */}
      <h2
        className={`text-5xl font-light text-white absolute transition-opacity duration-500 ${
          slides[visibleSlide].textPosition
        } ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {slides[visibleSlide].heading}
      </h2>

      {/* Text and Button */}
      <div
        className={`absolute text-white transition-opacity duration-500 ${
          slides[visibleSlide].contentPosition
        } ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        <p className="text-lg font-light mb-4">{slides[visibleSlide].text}</p>
        <button className="px-6 py-3 border-2 border-white text-white text-lg hover:bg-white hover:text-black transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
