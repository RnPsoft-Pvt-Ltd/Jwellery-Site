import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/v1/reviews/all"
        );

        // Get the first 5 reviews
        const selectedReviews = response.data.data.reviews.slice(0, 4);

        // Format testimonials
        const formattedTestimonials = selectedReviews.map(
          (testimonial, index) => ({
            id: index + 1,
            author: testimonial.user.name,
            rating: testimonial.rating,
            comment: testimonial.comment,
          })
        );

        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto slide change every 10 seconds
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(nextSlide, 10000);
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  return (
    <div className="w-full py-12 px-2 md:px-24 bg-cover bg-center bg-[url('https://storage.googleapis.com/jwelleryrnpsoft/testimonials.png')] h-fit">
      <div className="w-full mx-auto z-10">
        <h1 className="text-4xl md:text-5xl font-normal text-center font-albert mb-12">
          Testimonials
        </h1>

        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-10 text-black hover:text-gray-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8"
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

          {/* Testimonial Content */}

          <div className="w-[100%] overflow-hidden px-2">
            <div className="w-[100%] transition-transform duration-500 ease-in-out">
              {testimonials.length > 0 && (
                <div className="bg-white rounded-lg p-8 shadow-lg mx-auto md:w-[45%] w-[70%] min-h-[320px] h-fit">
                  <p className="text-yellow-500 text-center text-[48px]">
                    {"★".repeat(testimonials[currentSlide].rating)}
                  </p>
                  <p className="text-gray-700 text-center mb-6 md:text-lg max-[365px]:text-sm text-base font-albert">
                    "{testimonials[currentSlide].comment}"
                  </p>

                  <p className="text-gray-900 font-semibold text-center font-albert text-xl max-[365px]:text-md">
                    {testimonials[currentSlide].author}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-10 text-black hover:text-gray-600 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-12 md:h-12 sm:w-10 sm:h-10 w-8 h-8"
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