import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sales = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("https://api.shopevella.com/v1/sales");
        console.log("Slides Data from API:", response.data);

        const formattedSlides = response.data.map((item) => ({
          id: item.id,
          image: item.thumbnail, // Ensure API response has 'thumbnail' field
        }));

        console.log("Formatted Slides:", formattedSlides);
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    // console.log("Updated Slides:", slides);
  }, [slides]); // Logs slides whenever updated

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [slides]); // Only start interval when slides are available

  const handleClick = () => {
    if (slides.length > 0) {
      navigate(`/sales/${slides[currentSlide].id}`);
    }
  };

  return (
    <div className="relative w-full h-[30rem] md:h-[40rem] lg:h-[45rem] overflow-hidden">
      {slides.length === 0 ? (
        <div className="flex items-center justify-center h-full text-white text-xl">
          Loading slides...
        </div>
      ) : (
        <>
          {/* Slides Container */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image */}
                <div
                  className="w-full h-full bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "100% 100%",
                  }}
                />

                {/* Offers Title and Buy Now Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-[2%] px-4 md:px-8">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center">
                    Offers
                  </h2>
                  <button
                    onClick={handleClick}
                    className="px-2 py-1 md:px-4 md:py-2 text-sm md:text-2xl font-semibold border-2 border-white text-white hover:bg-white hover:text-black transition-colors mt-auto mb-6 md:mb-6"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-10 h-2 md:w-20 transition-colors rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sales;
