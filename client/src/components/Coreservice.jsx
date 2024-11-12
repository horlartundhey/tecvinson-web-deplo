import React from 'react'
import { FaProjectDiagram } from 'react-icons/fa'
import { FaArrowRight, FaCode, FaLaptop, FaLaptopCode } from 'react-icons/fa6'
import { HiCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineComputerDesktop, HiOutlineUsers } from 'react-icons/hi2'

const Coreservice = () => {
  return (
    <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>

        <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
                CORE SERVICES
            </h3>
            <h1 className='text-[40px] font-semibold'>
                What we do
            </h1>

                {/* Main White Box Container */}                
            <div className='bg-[#05385D] w-full m-auto py-[50px] flex flex-col justify-start items-start gap-[30px] lg:px-[40px] px-[20px] rounded-xl'>

            {/* Cards Section */}
                <div className='w-full flex lg:flex-row flex-col justify-between items-start gap-[30px]'>

                {/* Card 1 */}
                <div className='bg-[#D2F8FF] w-full h-[240px] rounded-lg p-5 flex flex-col '>
                    <HiOutlineComputerDesktop className='text-6xl mb-6' />
                    <h2 className='font-semibold text-2xl'>IT Training</h2>
                </div>

                {/* Card 2 */}
                <div className='bg-[#FFEAE7] w-full h-[240px] rounded-lg p-4 flex flex-col'>
                    <HiCodeBracket className='text-6xl mb-4 font-medium' />
                    <h2 className='font-semibold text-2xl'>
                    Solutions and <br /> Product <br /> Development
                    </h2>
                </div>

                {/* Card 3 */}
                <div className='bg-[#F7E3FF] w-full h-[240px] rounded-lg p-4 flex flex-col'>
                    <HiOutlineChatBubbleLeftRight className='text-6xl mb-4' />
                    <h2 className='font-semibold text-2xl'>IT Consultancy</h2>
                </div>

                {/* Card 4 */}
                <div className='bg-[#DFFFE8] w-full h-[240px] rounded-lg p-4 flex flex-col'>
                    <HiOutlineUsers className='text-6xl mb-4' />
                    <h2 className='font-semibold text-2xl'>
                    Staff <br /> Augmentation
                    </h2>
                </div>
                </div>

                {/* Explore Services Section Inside the Blue Box */}
                <div className='w-full flex lg:flex-row flex-col justify-between items-center mt-5'>
                <p className='text-white text-2xl'>
                    Would you like an in-depth understanding of what we do?
                </p>
                <a href="/services" className='inline-flex items-center bg-white text-[#05385D] px-6 py-3 rounded-[10px] font-semibold hover:bg-gray-200 transition-colors duration-300'>
                    Explore our services <FaArrowRight className='ml-3' />
                </a>
                </div>

            </div>  

            {/* Explore Services Section */}
            
            
        </div>

    </div>
  )
}

export default Coreservice