import React, { useRef, useEffect, useState, useCallback } from 'react';
import { IoHeartOutline } from "react-icons/io5";
import axios from 'axios';

const ProductSlider = () => {
  const galleryRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/products');
      const allProducts = response.data.data;

      const randomProducts = [];
      while (randomProducts.length < 10 && allProducts.length > 0) {
        const randomIndex = Math.floor(Math.random() * allProducts.length);
        randomProducts.push(allProducts[randomIndex]);
        allProducts.splice(randomIndex, 1); // Remove selected product
      }

      setProducts(randomProducts); // Set the random products to state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleScroll = useCallback(() => {
    if (!galleryRef.current) return;

    const gallery = galleryRef.current;
    const scrollPercentage =
      (gallery.scrollLeft / (gallery.scrollWidth - gallery.clientWidth)) * 100;
    setScrollProgress(scrollPercentage);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!galleryRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollLeft(galleryRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !galleryRef.current) return;

    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    galleryRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    gallery.addEventListener('scroll', handleScroll);
    gallery.addEventListener('mousedown', handleMouseDown);
    gallery.addEventListener('mousemove', handleMouseMove);
    gallery.addEventListener('mouseup', handleMouseUpOrLeave);
    gallery.addEventListener('mouseleave', handleMouseUpOrLeave);

    return () => {
      gallery.removeEventListener('scroll', handleScroll);
      gallery.removeEventListener('mousedown', handleMouseDown);
      gallery.removeEventListener('mousemove', handleMouseMove);
      gallery.removeEventListener('mouseup', handleMouseUpOrLeave);
      gallery.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
  }, [handleScroll, handleMouseDown, handleMouseMove, handleMouseUpOrLeave]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-center py-8 sm:py-12 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight font-['Albert_Sans']">
        Style Picks
      </h1>

      <div className="relative pb-8">
        <div
          ref={galleryRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[250px] sm:w-[280px] lg:w-[320px] h-[350px] sm:h-[370px] lg:h-[400px] overflow-hidden relative transform transition-transform duration-300 hover:scale-[1.02] bg-white"
            >
              <button className="absolute top-4 right-4 p-2 bg-transparent">
                <IoHeartOutline className="text-gray-500 text-3xl" />
              </button>

              <img
                src={item.images[0]?.image_url || 'https://via.placeholder.com/250x350'}
                alt={item.name}
                className="w-full h-[75%] object-cover"
                loading="lazy"
              />


              <div className="w-full p-2 flex flex-col justify-between h-[30%]">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{item.name}</span>
                  <span className="font-semibold text-gray-800">Rs. {item.base_price}</span>
                </div>

                <button className="absolute bottom-8 right-1 py-1 bg-black text-white text-xs sm:text-sm uppercase hover:bg-gray-800 transition w-[100px] h-[30px]">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
