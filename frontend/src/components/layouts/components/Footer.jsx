import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Footer() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://54.206.185.32/v1/collections"
        );
        const ALLOWED_CATEGORIES = ["Men", "Women", "Kids"];

        const filteredCollections = response.data.data.filter((collection) =>
          ALLOWED_CATEGORIES.some((category) =>
            collection.name.toLowerCase().includes(category.toLowerCase())
          )
        );
        setCollections(filteredCollections);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  const handleClickMen = () => {
    navigate(`/collections/8d08f894-9c7a-4a57-8c64-b7d70dfd5848`);
  };
  const handleClickWomen = () => {
    navigate(`/collections/f1ab0cfd-b2d9-45ee-978c-83ef1809e031`);
  };
  const handleClickKids = () => {
    navigate(`/collections/546e1cfd-c60c-428d-948c-843ea279deba`);
  };
  const handleReviews = () => {
    navigate("/reviews");
  };
  const handleAboutUs = () => {
    navigate("/aboutUs");
  };
  return (
    <footer className="flex flex-col md:flex-row w-[100%] pt-10">
      {/* Main Footer Section */}
      <div className="bg-black text-white py-8 w-[100%] md:w-[65%]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-evenly">
            {/* Logo Section */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32">
                  <img
                    src="https://storage.googleapis.com/jwelleryrnpsoft/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center lg:text-left ml-0 sm:ml-4">
                  <div className="font-italiana text-3xl lg:text-[50px] font-normal">
                    Evella
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center lg:text-left">
                <div className="text-lg lg:text-[23px] text-gray-300 font-albert">
                  Always Enhancing What's
                </div>
                <div className="text-lg lg:text-[23px] text-gray-300 font-albert">
                  Already Beautiful
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 sm:space-x-12">
              {/* Collection Section */}
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-normal font-albert text-center lg:text-left">
                  Collection
                </h2>
                <ul className="space-y-3 text-center lg:text-left">
                  {collections.map((collection, index) => (
                    <li key={index}>
                      <span
                        onClick={() => navigate(`/collections/${collection.id}`)}
                        className="text-gray-300 cursor-pointer hover:text-white font-albert text-lg lg:text-xl"
                      >
                        {collection.name}
                      </span>
                    </li>
                  ))}


                  {/* <li>
                    <span
                      onClick={() => handleClickMen()}
                      className="text-gray-300 cursor-pointer hover:text-white font-albert text-lg lg:text-xl"
                    >
                      Mens Jewelry
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleClickWomen()}
                      className="text-gray-300 cursor-pointer hover:text-white font-albert text-lg lg:text-xl"
                    >
                      Womens Jewelry
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleClickKids()}
                      className="text-gray-300 cursor-pointer hover:text-white font-albert text-lg lg:text-xl"
                    >
                      Kids Jewelry
                    </span>
                  </li> */}
                </ul>
              </div>

              {/* About Us Section */}
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-normal font-albert text-center lg:text-left">
                  About Us
                </h2>
                <ul className="space-y-3 text-center lg:text-left">
                  <li>
                    <span
                      onClick={() => handleAboutUs()}
                      className="text-gray-300 hover:text-white font-albert text-lg lg:text-xl cursor-pointer"
                    >
                      Our Story
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleReviews()}
                      className="text-gray-300 hover:text-white font-albert text-lg lg:text-xl cursor-pointer"
                    >
                      Reviews
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#2C2C2C] w-[100%] md:w-[35%] py-8 md:py-10 px-4">
        <div className="w-fit mx-auto">
          <h2 className="text-2xl lg:text-3xl font-normal text-center text-white font-albert mb-8">
            Never Miss On Deals
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
            <input
              type="email"
              placeholder="enter your email here"
              className="p-2 w-full bg-white text-black outline-none"
            />
            <button className="bg-black text-white px-4 py-2 hover:bg-gray-800 sm:w-auto w-full">
              Subscribe
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start space-x-6 mt-12">
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                className="h-6 w-6 lg:h-7 lg:w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                className="h-6 w-6 lg:h-7 lg:w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                className="h-6 w-6 lg:h-7 lg:w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <svg
                className="h-6 w-6 lg:h-7 lg:w-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
