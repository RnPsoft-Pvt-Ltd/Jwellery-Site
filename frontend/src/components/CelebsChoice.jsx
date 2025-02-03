import React from "react";

const celebs = [
  "https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png",
  "https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png",
  "https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png",
  "https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png",
  "https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png",
];

const CelebsChoice = () => {
  return (
    <section className="w-[100%] h-[663px] bg-gray-100 flex flex-col items-center relative">
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Celebs Choice
      </div>

      {/* Slider */}
      <div className="w-full h-[400px] md:h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        {celebs.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-[320px] h-[320px] md:w-[370px] md:h-[370px]">
            <img src={image} alt={`celeb${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebsChoice;
