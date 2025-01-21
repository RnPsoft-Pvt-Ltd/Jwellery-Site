import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    rating: 5,
    comment:
      "These earrings are simply stunning! The braided design is so unique and intricate, and they add a perfect touch of elegance to any outfit. I've received so many compliments whenever I wear them. Highly recommend!",
    author: "Sophia R.",
  },
  {
    id: 2,
    rating: 5,
    comment:
      "I love these earrings! They're lightweight yet durable, and the sterling silver has a beautiful shine. The craftsmanship is excellent, and they go well with both casual and formal wear. Definitely a great purchase!",
    author: "Mia L.",
  },
  {
    id: 3,
    rating: 5,
    comment:
      "These silver braided earrings are my new favorite accessory! The detail in the braid is exquisite, and they have a nice weight without being too heavy. Perfect for daily wear or special occasions",
    author: "Emma T.",
  },
  {
    id: 4,
    rating: 5,
    comment:
      "Good product overall. Shipping was quick and the item matches the description. There's room for improvement in packaging, but I'm satisfied with my purchase.",
    author: "Michael P.",
  },
  {
    id: 5,
    rating: 5,
    comment:
      "The earrings are gorgeous and exactly as described. The only reason I'm giving four stars is that I wish they were slightly larger. Nonetheless, they are beautifully made and very elegant.",
    author: "Olivia K.",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="w-full py-12 px-16 md:px-24 bg-cover bg-center bg-[url('https://storage.googleapis.com/jwelleryrnpsoft/testimonials.png')] h-fit">
      <div className="w-fit mx-auto z-10">
        <h1 className="text-5xl font-normal text-center font-albert mb-12">
          Testimonials
        </h1>

        <div className="relative flex items-center">
          <button
            onClick={prevSlide}
            className="absolute w-fit left-[25%] -translate-x-12 md:-translate-x-16 text-black hover:text-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="w-fit overflow-hidden px-2">
            <div className="w-fit transition-transform duration-500 ease-in-out">
              <div className="bg-white rounded-lg p-8 shadow-lg mx-auto w-[45%] min-h-[320px] h-fit">
                <div className="flex justify-center mb-4 gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill={
                        index < testimonials[currentSlide].rating
                          ? "#FBBF24"
                          : "none"
                      }
                      stroke={
                        index < testimonials[currentSlide].rating
                          ? "#FBBF24"
                          : "#D1D5DB"
                      }
                      strokeWidth="1.5"
                      className="transition-colors duration-200"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 text-center mb-6 text-lg font-albert">
                  "{testimonials[currentSlide].comment}"
                </p>

                <p className="text-gray-900 font-semibold text-center font-albert text-xl">
                  {testimonials[currentSlide].author}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute w-fit right-[25%] translate-x-12 md:translate-x-16 text-black hover:text-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
