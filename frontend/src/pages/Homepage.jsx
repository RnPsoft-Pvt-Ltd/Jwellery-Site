import React from 'react'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import Callback from '../components/Callback'
import CelebsChoice from '../components/CelebsChoice'
import Sales from '../components/Sales'
import ThemeCollection from '../components/ThemeCollection'
import StyledPicks from '../components/StyledPicks'
import SpecialProducts from '../components/SpecialProducts'
import Category from '../components/Category'
import MetalCollection from '../components/MetalCollection'
import ProductSlider from '../components/ProductSlider'
import GenderCollections from '../components/GenderCollections'

import Hero from '../components/Hero'
import NavBar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'



export default function Homepage() {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <GenderCollections/>
        <ImageSlider/>
        <ProductSlider/> 

        <MetalCollection/>
        <Category/>
        <SpecialProducts/>
        <StyledPicks/>
        <ThemeCollection/>
        
        <CelebsChoice/>
        <Callback/>
        <Sales/>
        <Testimonials/>
        <Footer/> 
    </div>
  )
}
