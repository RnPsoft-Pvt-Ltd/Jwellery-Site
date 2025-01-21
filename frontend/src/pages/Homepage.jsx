import React from 'react'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import Callback from '../components/Callback'
import CelebsChoice from '../components/CelebsChoice'
import Sales from '../components/Sales'
import Wear from '../components/Wear'
import StyledPicks from '../components/StyledPicks'
import SpecialProducts from '../components/SpecialProducts'
import Category from '../components/Category'
import Carousal from '../components/Carousal'
import ProductSlider from '../components/temp/ProductSlider'
import JewelryCards from '../components/temp/JewelryCards'

import Hero from '../components/temp/Hero'
import NavBar from '../components/temp/NavBar'



export default function Homepage() {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <JewelryCards/>
        <ProductSlider/>

        <Carousal/>
        <Category/>
        <SpecialProducts/>
        <StyledPicks/>
        <Wear/>
        
        <CelebsChoice/>
        <Callback/>
        <Sales/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}
