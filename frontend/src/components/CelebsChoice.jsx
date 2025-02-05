import React from "react";
import { useNavigate } from "react-router-dom";

// const celebs = [
//   "https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png",
//   "https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png",
//   "https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png",
//   "https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png",
//   "https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png",
// ];

const celebs = [
  {
    id: "efbab753-a649-4598-a2cc-0bd0fea58500",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png",
  },
  {
    id: "846d2bf7-a634-4e0b-aa70-23eb37c77dc6",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png",
  },
  {
    id: "846d2bf7-a634-4e0b-aa70-23eb37c77dc6",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png",
  },
  {
    id: "7fb3587b-1a6d-44cf-9213-d58e67ba9a24",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png",
  },
  {
    id: "7fb3587b-1a6d-44cf-9213-d58e67ba9a24",
    image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png",
  },
];

console.log(celebs);

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
          <div key={index} className="flex-shrink-0 w-[320px] h-[320px] md:w-[370px] md:h-[370px]" onClick={() => handleClick(item.id)}>
            <img src={item.image} alt={`celeb${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebsChoice;
