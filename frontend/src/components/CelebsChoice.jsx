import React from "react";
import { useNavigate } from "react-router-dom";

const celebs = [
  {
    // Bracelet
    id: "2b0ac489-0b34-493e-8016-d65c08e1c7ee",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png",
  },
  {
    // Earrings
    id: "78f14e45-c25a-4abf-8a3e-718cc3d4b448",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png",
  },
  {
    // Earrings
    id: "78f14e45-c25a-4abf-8a3e-718cc3d4b448",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png",
  },
  {
    // Necklace
    id: "a353bdf4-56e5-4a07-86a9-c255785aaa9f",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png",
  },
  {
    // Necklaces
    id: "a353bdf4-56e5-4a07-86a9-c255785aaa9f",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png",
  },
];

const CelebsChoice = () => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/categories/${id}`);
  };
  
  return (
    <section className="w-[100%] h-[663px] bg-gray-100 flex flex-col items-center relative">
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Celebs Choice
      </div>

      {/* Slider */}
      <div className="w-full h-[400px] md:h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        {celebs.map((item, index) => (
          <div key={index} className="flex-shrink-0 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105 w-[320px] h-[320px] md:w-[370px] md:h-[370px]" onClick={() => handleClick(item.id)}>
            <img src={item.image} alt={`celeb${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebsChoice;