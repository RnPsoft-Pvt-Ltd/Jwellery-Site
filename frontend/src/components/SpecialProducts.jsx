import React from 'react';

const SpecialProducts = () => {
  const products = [
    {
      id: 1,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/1.jpeg",
      title: "Wedding Jewelry",
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/2.jpeg",
      title: "Festive Jewelry",
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/jwelleryrnpsoft/3.jpeg",
      title: "Auspicious Jewelry",
    },
  ];

  return (
    <section className="text-center py-10 px-5">
      {/* Heading */}
      <div className="flex justify-center items-center h-[125px] text-4xl md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
        Celebs Choice
      </div>


      <div className="flex flex-wrap justify-center gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-[300px] h-[300px] overflow-hidden
                     transition-all duration-300 ease-in-out 
                     hover:transform hover:-translate-y-2.5 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover absolute top-0 left-0"
            />
            
            <div className="absolute inset-0 bg-black/50 text-white flex flex-col justify-between p-2.5">
                  <div className="flex justify-center items-center h-[125px] text-4xl  md:text-5xl font-light leading-[76.8px] font-['Albert_Sans']">
                    {product.title}
                  </div>
              
              <button
                className="self-center mb-8 px-5 py-2.5 bg-black text-white border border-white
                         cursor-pointer transition-colors duration-300 ease-in-out
                         hover:bg-white hover:text-black  font-['Albert_Sans']"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialProducts;