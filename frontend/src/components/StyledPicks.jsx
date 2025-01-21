import React, { useRef, useEffect, useState, useCallback } from 'react';

const StyledPicks = () => {
  const galleryRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const jewelryItems = [
    { id: 1, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry1.png", alt: "Jewelry item 1" },
    { id: 2, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry2.png", alt: "Jewelry item 2" },
    { id: 3, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry3.png", alt: "Jewelry item 3" },
    { id: 4, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry4.png", alt: "Jewelry item 4" },
    { id: 5, image: "https://storage.googleapis.com/jwelleryrnpsoft/jewelry5.png", alt: "Jewelry item 5" }
  ];

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
      {/* Heading */}
      <h1 className="text-center py-8 sm:py-12 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight font-['Albert_Sans']">
        Style Picks
      </h1>

      <div className="relative pb-8">
        <div 
          ref={galleryRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 scrollbar-hide 
                     cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {jewelryItems.map((item) => (
            <div 
              key={item.id}
              className="flex-none w-[250px] sm:w-[280px] lg:w-[320px] 
                       h-[340px] sm:h-[380px] lg:h-[420px] 
                       rounded-xl overflow-hidden relative 
                       transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default StyledPicks;