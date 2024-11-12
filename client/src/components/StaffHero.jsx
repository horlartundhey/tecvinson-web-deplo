import React from 'react'
import staffauagment from '../assets/staffauagment.png';
import { HiOutlineUsers } from 'react-icons/hi2';



const StaffHero = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div 
        className="w-full h-[500px] bg-cover bg-center" 
        style={{ backgroundImage: `url(${staffauagment})` }}
      >        
      </div>

      {/* Offset Overlay Content */}
      <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl  w-full text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#DFFFE8]  p-3 rounded-lg w-10 h-10">
            <HiOutlineUsers />
            </div>
            <h2 className="text-xl font-semibold">Staff Augmentation Services</h2>
          </div>
          <p className="text-gray-700">
          At Tecvinson, we offer Staff Augmentation Services designed to provide flexible, high-quality resources to support your business. Whether you need help with a short-term project or are looking for long-term expertise, our pool of skilled professionals—trained through our platform—can be tailored to meet the specific needs of your company.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StaffHero