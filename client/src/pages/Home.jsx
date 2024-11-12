import React from 'react'
import Navbar from '../components/Navbar'
import HeroSect from '../components/HeroSect'
import Header from '../components/Header'
import Aboutcomp from '../components/Aboutcomp'
import Coreservice from '../components/Coreservice'
import Testimonial from '../components/Testimonial'
import BodyContainer from '../components/BodyContainer'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>        
    {/* <Header /> */}
    <HeroSect />
    <Aboutcomp />
    <Coreservice />
    <Testimonial />
    <BodyContainer />
    <Footer />
    </>
  )
}

export default Home