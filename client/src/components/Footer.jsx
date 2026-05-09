import React, { useState } from 'react';
import logo from '../assets/teclogo.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    // Basic client-side email validation
    if (!email || !/.+@.+\..+/.test(email)) {
      toast.error('Please enter a valid email address.'); // Display error using toast
      return;
    }

    try {
      const response = await axios.post(
        'https://tecvinson-web-server.vercel.app/api/subscribe',
        // 'http://localhost:5000/api/subscribe',
        { email }
      );

      if (response.status === 200) {
        toast.success('Subscribed successfully!'); // Display success using toast
        setEmail(''); // Clear the email input
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200
        toast.error(error.response.data.message || 'Subscription failed.');
      } else if (error.request) {
        // Request was made but no response was received
        toast.error('No response from the server. Please try again.');
      } else {
        // Something else happened
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='bg-white py-10 lg:px-[150px] px-[20px]'>
      {/* Main Footer Content */}
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        {/* Left Column - Logo and Paragraph */}
        <div className='flex flex-col items-start'>
          <img src={logo} alt='Logo' className='mb-4' />
          <p className='text-sm text-gray-600 max-w-xs'>
            At Tecvinson, we believe that the best technology solutions are born from simplicity and collaboration, By combining innovative thinking with seamless teamwork.
          </p>
        </div>

        {/* Right Column - Newsletter Signup */}
        <div className="flex flex-col items-start order-2 lg:order-3">
          <h2 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h2>

          {/* Error or Success Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          {/* Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch sm:space-x-2 space-y-2 sm:space-y-0 w-full"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none w-full sm:w-[300px] lg:w-auto"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>

          <div className='flex space-x-4 mt-20'>
            {/* Social Icons - replace with actual icons */}
            <a href='https://linkedin.com/company/tecvinsonab/' target='_blank' className='text-gray-600  text-[20px] hover:text-gray-800'><FaLinkedin /></a>
            <a href='https://web.facebook.com/profile.php?id=100091523033144&name=xhp_nt__fb__action__open_user&_rdc=1&_rdr#' target='_blank' className='text-gray-600 text-[20px]  hover:text-gray-800'><FaFacebook /></a>
            {/* <a href='#' target='_blank' className='text-gray-600 text-[20px] hover:text-gray-800'><FaTwitter /></a> */}
          </div>
        </div>

        {/* Center Column - Quick Links */}
        <div className='flex flex-col items-start lg:items-start order-3 lg:order-2'>
          <h2 className='text-lg font-semibold mb-4'>Quick Links</h2>
          <ul className='space-y-2'>
            <li><Link to='/' className='text-brandprimary font-semibold hover:text-gray-800'>Home</Link></li>
            <li><Link to='/about-us' className='text-brandprimary font-semibold hover:text-gray-800'>About Us</Link></li>
            {/* <li><Link to='/services' className='text-brandprimary font-semibold hover:text-gray-800'>Services</Link></li>             */}
            <li><Link to='/solutions' className='text-brandprimary font-semibold hover:text-gray-800'>Solutions</Link></li>
            <li><Link to='/contact-us' className='text-brandprimary font-semibold hover:text-gray-800'>Contact Us</Link></li>
          </ul>
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
  );
};

export default Footer;