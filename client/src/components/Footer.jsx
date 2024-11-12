import React from 'react'
import logo from '../assets/teclogo.png'
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6'


const Footer = () => {
  return (
    <div className='bg-white py-10 px-5 lg:px-20'>
      {/* Main Footer Content */}
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        
        {/* Left Column - Logo and Paragraph */}
        <div className='flex flex-col items-start'>
          <img src={logo} alt='Logo' className='mb-4' />
          <p className='text-sm text-gray-600 max-w-xs'>
          At Tecvinson, we believe that the best technology solutions are born from simplicity and collaboration. By combining innovative thinking with seamless teamwork.
          </p>
        </div>

        {/* Center Column - Quick Links */}
        <div className='flex flex-col items-start lg:items-start'>
          <h2 className='text-lg font-semibold mb-4'>Quick Links</h2>
          <ul className='space-y-2'>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>Home</a></li>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>About Us</a></li>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>Services</a></li>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>Training</a></li>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>Solutions</a></li>
            <li><a href='#' className='text-brandprimary font-semibold hover:text-gray-800'>Contact Us</a></li>
          </ul>
        </div>

        {/* Right Column - Newsletter Signup */}
        <div className='flex flex-col items-start '>
          <h2 className='text-lg font-semibold mb-4'>Subscribe to our Newsletter</h2>
          <form className='flex items-center mb-4'>
            <input
              type='email'
              placeholder='Enter your email'
              className='p-2 border border-gray-300 rounded-l-md focus:outline-none'
            />
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600'>
              Subscribe
            </button>
          </form>
          <div className='flex space-x-4 mt-20'>
            {/* Social Icons - replace with actual icons */}
            <a href='#' className='text-gray-600  text-[20px] hover:text-gray-800'><FaFacebook /></a>
            <a href='#' className='text-gray-600 text-[20px] hover:text-gray-800'><FaInstagram /></a>
            <a href='#' className='text-gray-600 text-[20px] hover:text-gray-800'><FaXTwitter /></a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <hr className='my-8 border-gray-300' />

      {/* Footer Bottom */}
      <div className='flex flex-col lg:flex-row justify-between items-start text-gray-600 text-sm'>
        <p>© 2024 Tecvinson. All rights reserved.</p>
        <a href='#' className='hover:text-gray-800'>Privacy Policy</a>
      </div>
    </div>
  )
}

export default Footer
