import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Trainings from './pages/Trainings'
import Solutions from './pages/SolutionsProd'
import ContactUs from './pages/ContactUs'
import ProductManCourse from './pages/ProductManCourse'
import ProductDesign from './pages/ProductDesign'
import ProductDevelopment from './pages/ProductDevelopment'
import JobReadiness from './pages/JobReadiness'
import Consultancy from './pages/Consultancy'
import StaffAugment from './pages/StaffAugment'
import SolutionsProd from './pages/SolutionsProd'
import NotFound from './pages/NotFound'
import CancelPage from './pages/CancelPage'
import SuccessPage from './pages/SuccessPage'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product-management" element={<ProductManCourse />} />
        <Route path="/product-design" element={<ProductDesign />} />
        <Route path="/development" element={<ProductDevelopment/>} />
        <Route path="/job-readiness" element={<JobReadiness />} />
        <Route path="/consultancy" element={<Consultancy />} />
        <Route path="/staff-augment" element={<StaffAugment />} />
        <Route path="/solutions" element={<SolutionsProd/>} />
        <Route path="/cancel" element={<CancelPage/>} />
        <Route path="/success" element={<SuccessPage/>} />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
