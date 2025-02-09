import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useImageLoader } from "../utils/GlobalLoadingManager";
import axios from "axios";


const CelebsChoice = () => {
  const [categories, setCategories] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/categories");
        console.log("response", response.data.data);
        const ALLOWED_CATEGORIES = ["Bracelets", "Earrings", "Necklaces"];
  
        const filteredCategories = response.data.data.filter((collection) =>
          ALLOWED_CATEGORIES.some((category) =>
            collection.name.toLowerCase().includes(category.toLowerCase())
          )
        );
        setCategories(filteredCategories);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
  
    fetchCategories();
  }, []);
  
  // Update `celebs` after `categories` is set
  useEffect(() => {
    if (categories.length < 3) return; // Ensure categories are available before setting celebs
  
    setCelebs([
      {
        id: categories[2].id, // Bracelets
        image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb1.png",
      },
      {
        id: categories[1].id, // Earrings
        image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb2.png",
      },
      {
        id: categories[1].id, // Earrings
        image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb3.png",
      },
      {
        id: categories[0].id, // Necklaces
        image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb4.png",
      },
      {
        id: categories[0].id, // Necklaces
        image: "https://storage.googleapis.com/jwelleryrnpsoft/celeb5.png",
      },
    ]);
  }, [categories]); // Runs when `categories` updates
  

  
  console.log(categories)
  console.log(celebs)

  

    // Preload all images
    // celebs.forEach((slide) => {
    //   useImageLoader(slide.image);
    // });

  const handleClick = (id) => {
    navigate(`/categories/${id}`);
  };
  
  return (
    <section className="w-[100%] h-[663px] bg-white flex flex-col items-center relative">
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