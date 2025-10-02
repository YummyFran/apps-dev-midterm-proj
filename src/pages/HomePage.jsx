import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Arrival from '../components/Arrival'

const HomePage = () => {
  return (
    <div className=''>
        <Nav />
        <Hero />
        <Categories />
        <Arrival />
    </div>
  )
}

export default HomePage