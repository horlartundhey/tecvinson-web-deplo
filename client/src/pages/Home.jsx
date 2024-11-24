import React from 'react'
import Navbar from '../components/Navbar'
import HeroSect from '../components/HeroSect'
import Header from '../components/Header'
import Aboutcomp from '../components/Aboutcomp'
import Coreservice from '../components/Coreservice'
import Testimonial from '../components/Testimonial'
import BodyContainer from '../components/BodyContainer'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import SectionWithScroll from '../components/SectionWithScroll'


// const pageVariants = {
//   initial: { opacity: 0, y: 50 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -50 },
// };

// const pageTransition = { duration: 0.8, ease: 'easeInOut' };

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <SectionWithScroll>
        <HeroSect />
      </SectionWithScroll>

      <SectionWithScroll>
        <Aboutcomp />
      </SectionWithScroll>

      <SectionWithScroll>
        <Coreservice />
      </SectionWithScroll>

      <SectionWithScroll>
        <Testimonial />
      </SectionWithScroll>

      <SectionWithScroll>
      <BodyContainer />
      </SectionWithScroll>

      <Footer />
    </>
  );
}

export default Home