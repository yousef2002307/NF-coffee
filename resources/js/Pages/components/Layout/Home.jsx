import React from 'react'
import Hero from '../Hero/Hero'
import Categories from '../Categories/Categories'
import BottomNav from '../Header/BottomNav'
import TestimonialSlider from '../Silder/TestimonialSlider'
import ProductSlider from '../Silder/ProductSlider'
import WorkWithUsForm from '../Form/WorkWithUsForm'
import NewItem from '../NewItem/NewItem'

export default function Home() {
  return (
    <div>
        <Hero/>
        <Categories/>
        <ProductSlider/>
        <TestimonialSlider/>
        <NewItem/>
      <WorkWithUsForm/>
        <BottomNav />
    </div>
  )
}
