import React from 'react';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Callback from '../components/Callback';
import CelebsChoice from '../components/CelebsChoice';
import Sales from '../components/Sales';
import Wear from '../components/Wear';
import StyledPicks from '../components/StyledPicks';
import SpecialProducts from '../components/SpecialProducts';
import Category from '../components/Category';
import Carousal from '../components/Carousal';
import ProductSlider from '../components/ProductSlider';
import JewelryCards from '../components/JewelryCards';

import Hero from '../components/Hero';
import NavBar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';

export default function Homepage() {
  return (
    <div>
      {/* Container for the shared background image for Navbar and Hero */}
      <div
        className="relative"
        style={{
          backgroundImage: 'url(https://storage.googleapis.com/jwelleryrnpsoft/image.png)', // Your background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Navbar and Hero Section */}
        <NavBar />
        <Hero />
      </div>

      {/* Other Components */}
      <JewelryCards />
      <ImageSlider />
      <ProductSlider />
      <Carousal />
      <Category />
      <SpecialProducts />
      <StyledPicks />
      <Wear />
      <CelebsChoice />
      <Callback />
      <Sales />
      <Testimonials />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
