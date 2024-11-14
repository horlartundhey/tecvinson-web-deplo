import React from 'react'
import productsolution from '../assets/solutionhero2.png';
import { HiCodeBracket } from 'react-icons/hi2';

const SolutionsHero = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div 
        className="w-full h-[300px] md:h-[500px] bg-cover bg-center" 
        style={{ backgroundImage: `url(${productsolution})` }}
      >        
      </div>

      {/* Offset Overlay Content */}
      <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl  w-full text-left">
          <div className="flex items-center gap-3 mb-4">
           
            <div className="bg-[#FFEAE7]  p-3 rounded-lg w-10 h-10">
              <HiCodeBracket />
            </div>
           
            <h2 className="text-xl font-semibold">Solutions and Product Development</h2>
          </div>
          <p className="text-[#5E5E5E]">
          At Tecvinson, we specialize in custom solutions development. Using a combination of agile methodologies, design thinking, and a product-first mindset, we engage with you from ideation through to delivery, ensuring your solution meets the highest standards of quality and user experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SolutionsHero