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
import ScrollToTop from './components/ScrollToTop'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import VerifyLogin from './pages/VerifyLogin'
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import NavbarLayout from './layouts/NavbarLayout'
import DashboardLayout from './layouts/DashboardLayout'
import { ThemeProvider } from './contexts/ThemeContext'
import Enrollments from './pages/Enrollments'




function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const AppContent = () => {  
  return (
    <Router>            
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        closeOnClick 
        pauseOnHover 
        draggable 
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/verify-login/:token" element={<VerifyLogin />} />                    
          <Route path="/product-management" element={<ProductManCourse />} />
          <Route path="/product-design" element={<ProductDesign />} />
          <Route path="/development" element={<ProductDevelopment />} />
          <Route path="/job-readiness" element={<JobReadiness />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/staff-augment" element={<StaffAugment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solutions" element={<SolutionsProd />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        
        <Route element={<DashboardLayout />}>        
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Enrollments />} path="/enrollments" />
        </Route>

        </Routes>
      </AnimatePresence>          
    </Router>
  )
}

export default App
