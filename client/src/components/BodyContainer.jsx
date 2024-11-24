import React from 'react'
import { Link } from 'react-router-dom'

const BodyContainer = () => {
  return (
    <div className='bg-[#E7F3FD] w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mb-14'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='text-3xl font-bold text-center mb-4'>Empowering Your IT Journey—Together</h1>
        <p className='text-lg text-center max-w-xl mb-6'>
          Ready to enhance your team’s skills, scale your business, or launch the next big tech product? Whether it's specialized IT training, expert staff augmentation, or end-to-end consultancy and product development, we’ve got you covered.
        </p>
        <Link to="/contact-us" onClick={() => window.scrollTo(0, 0)}>
          <button className='bg-blue-500 hover:bg-white hover:text-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-500 ease-in-out delay-100 flex items-center hover:shadow-neon hover:scale-105'>
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BodyContainer
