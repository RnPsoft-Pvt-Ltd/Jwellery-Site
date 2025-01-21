import React from "react";

const CelebsChoice = () => {
  return (
    <section className="w-full h-[663px] bg-gray-100 flex flex-col items-center relative">
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Celebs Choice
      </div>

      {/* Slider */}
      <div className="w-full h-[450px] flex overflow-x-auto gap-5 p-2 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        <div className="flex-shrink-0 w-[30.77%] h-[370px]">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png"
            alt="celeb1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-[30.77%] h-[370px]">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png"
            alt="celeb2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-[30.77%] h-[370px]">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png"
            alt="celeb3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-[30.77%] h-[370px]">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png"
            alt="celeb4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-[30.77%] h-[370px]">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png"
            alt="celeb5"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CelebsChoice;
