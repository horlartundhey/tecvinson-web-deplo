import React from 'react'
import consultancy from '../assets/consultancybg.png';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

const ConsultancyHero = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div 
        className="w-full h-[300px] md:h-[500px] bg-cover bg-[center_20%]" 
        style={{ backgroundImage: `url(${consultancy})` }}
      >        
      </div>

      {/* Offset Overlay Content */}
      <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl  w-full text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#F7E3FF]  p-3 rounded-lg w-10 h-10">
              <HiOutlineChatBubbleLeftRight />
            </div>
            <h2 className="text-xl font-semibold">IT Consultancy Services</h2>
          </div>
          <p className="text-gray-700">
          Tecvinson provides top-tier IT consultancy services, offering highly skilled consultants to support projects across industries. Whether your business requires expertise in product management, engineering, or design, we can match you with the perfect resource.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConsultancyHero