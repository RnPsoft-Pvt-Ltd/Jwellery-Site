// JewelryCards.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenderCollections = () => {
  const navigate = useNavigate();

  const jewelryItems = [
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/mens.jpeg", alt: "Mens Jewelry", text: "Mens Jewelry", path: "/mencollection" },
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/women.jpeg", alt: "Womens Jewelry", text: "Womens Jewelry", path: "/womencollection" },
    { src: "https://storage.googleapis.com/jwelleryrnpsoft/kids.jpeg", alt: "Kids Jewelry", text: "Kids Jewelry", path: "/kidcollection" },
  ];

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective collection page
  };

  return (
    <div className="flex flex-wrap justify-center gap-5 p-5 mt-8">
      {jewelryItems.map((item, index) => (
        <button 
          key={index} 
          onClick={() => handleCardClick(item.path)} 
          className="relative w-72 h-72 border-2 border-transparent hover:border-gray-300 rounded-md overflow-hidden focus:outline-none"
        >
          <img 
            src={item.src} 
            alt={item.alt} 
            className="w-full h-full object-cover rounded-md brightness-75"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-normal tracking-wide text-center">
            {item.text}
          </div>
        </button>
      ))}
    </div>
  );
};

export default GenderCollections;