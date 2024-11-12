import React from 'react'
import { Link } from 'react-router-dom'

const BodyContainer = () => {
  return (
    <div className='bg-[#E7F3FD] w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] pb-10 mb-14'>
      <div className='flex flex-col items-center w-full'>
        <h1 className='text-3xl font-bold text-center mb-4'>Empowering Your IT Journey—Together</h1>
        <p className='text-lg text-center max-w-xl mb-6'>
          Ready to enhance your team’s skills, scale your business, or launch the next big tech product? Whether it's specialized IT training, expert staff augmentation, or end-to-end consultancy and product development, we’ve got you covered.
        </p>
        <Link to="/contact-us">
          <button className='bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200'>
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BodyContainer