import React from 'react';
import servicesHero from '../assets/Serviceshero.png';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';

const ServiceHero = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div 
        className="w-full h-[500px] bg-cover bg-center" 
        style={{ backgroundImage: `url(${servicesHero})` }}
      >        
      </div>

      {/* Offset Overlay Content */}
      <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl  w-full text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#D2F8FF]  p-3 rounded-lg w-10 h-10">
              <HiOutlineComputerDesktop />
            </div>
            <h2 className="text-xl font-semibold">Professional IT Training Courses</h2>
          </div>
          <p className="text-gray-700">
            At Tecvinson, we offer professional training courses in various fields. Our courses are designed to equip participants with industry-ready skills in a matter of months.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceHero;