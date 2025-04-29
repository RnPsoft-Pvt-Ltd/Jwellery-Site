import React from 'react'

import Hero from '../components/Hero'
import GenderCollections from '../components/GenderCollections'
import ImageSlider from '../components/ImageSlider'
import ProductSlider from '../components/ProductSlider'

import MetalCollection from '../components/MetalCollection'
import Category from '../components/Category'
import SpecialProducts from '../components/SpecialProducts'
import StyledPicks from '../components/StyledPicks'
import ThemeCollection from '../components/ThemeCollection'
import CelebsChoice from '../components/CelebsChoice'
import Callback from '../components/Callback'
import Sales from '../components/Sales'
import Testimonials from '../components/Testimonials'
import { GlobalLoadingProvider } from '../utils/GlobalLoadingManager';



export default function Homepage() {
  return (
    <GlobalLoadingProvider>
    <div>
        <Hero/>
        <GenderCollections />
        <ProductSlider/> 
        <Category/>
        <Callback/>
        <Testimonials/>
    </div>
    </GlobalLoadingProvider>
  )
}
