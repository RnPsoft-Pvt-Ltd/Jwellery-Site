import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { categoryService } from '../services/api';

const CategoryGallery = () => {
  const containerRef = useRef(null);
  const indicatorRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategories({ limit: 10, page: 1 });
        
        // Access the data property of the response
        const categoryData = response.data;
        
        // Transform the backend data to match the frontend structure
        const transformedCategories = categoryData.map(category => ({
          image: category.thumbnail || 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png',
          title: category.name
        }));

        
        setCategories(transformedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    const handleScroll = () => {
      const scrollPercentage = 
        (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      indicator.style.transform = `translateX(${scrollPercentage}%)`;
    };

    if (container && indicator) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh] bg-[#FCF8FC]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh] bg-[#FCF8FC]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative pb-8 bg-[#FCF8FC]">
      <div 
        ref={containerRef}
        className="flex flex-row gap-4 h-[50vh] overflow-x-auto scrollbar-hide"
      >
        {categories.map((category, index) => (
          <div key={index} className="relative flex-none">
            <div className="relative h-full">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://storage.googleapis.com/jwelleryrnpsoft/placeholder.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]" />
              <div className="absolute bottom-[10%] left-0 w-full text-center text-white text-2xl font-normal font-['Arial'] drop-shadow-lg z-[2]">
                {category.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-5 w-full h-1 bg-gray-200">
        <div 
          ref={indicatorRef}
          className="h-full w-1/4 bg-black absolute left-0 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default CategoryGallery;