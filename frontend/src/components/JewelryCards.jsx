import React from 'react';

const JewelryCards = () => {
  const jewelryItems = [
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/mens.jpeg", alt: "Mens Jewelry", text: "Mens Jewelry" },
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/women.jpeg", alt: "Womens Jewelry", text: "Womens Jewelry" },
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/kids.jpeg", alt: "Kids Jewelry", text: "Kids Jewelry" },
  ];

  return (
    <div className="text-center mt-12">
      {/* Collection Heading */}
      <h2 className="text-4xl font-light text-gray-900 mb-6">Collection</h2>

      {/* Jewelry Items */}
      <div className="flex flex-wrap justify-center gap-5 p-5">
        {jewelryItems.map((item, index) => (
          <div key={index} className="relative w-72 h-72">
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover rounded-md brightness-75" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-normal tracking-wide text-center">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelryCards;
