import React from 'react'
import StaffHero from '../components/StaffHero'
import BodyContainer from '../components/BodyContainer'
import Footer from '../components/Footer'

import conglogo from '../assets/conglogo.png';
import conglogo2 from '../assets/conglogo2.png';
import conglogo3 from '../assets/conglogo3.png';
import conglogo4 from '../assets/conglogo4.png';
import conglogo5 from '../assets/conglogo5.png';
import conglogo6 from '../assets/conglogo6.png';
import conglogo7 from '../assets/conglogo7.png';
import conglogo8 from '../assets/conglogo8.png';

const StaffAugment = () => {
  return (
    <>
        <StaffHero />

        <div className='w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-10'>

            <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
                <h3 className='font-semibold text-[14px]'>
                OUR APPROACH
                </h3>
                <h1 className='text-[40px] leading-10 font-semibold'>
                    We offer a wide range of resources for all experience levels.
                </h1>                                   
               
                <div className="lg:w-full w-full">

                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {/* Junior Level Consultants */}
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col  border-t-4 border-[#5D976E] h-[200px]">
                            {/* Large Number */}
                            <div className="text-gray-300 text-6xl font-bold mb-4">
                            01
                            </div>
                            <h3 className="text-lg font-semibold mb-2 ">Junior Level </h3>
                            <p className="text-gray-600 ">
                            For businesses needing fresh talent to handle entry-level tasks or contribute to less complex projects.
                            </p>
                        </div>

                        {/* Intermediate Level Consultants */}
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col border-t-4 border-[#5D976E] h-[200px]">
                            {/* Large Number */}
                            <div className="text-gray-300 text-6xl font-bold mb-4">
                            02
                            </div>
                            <h3 className="text-lg font-semibold mb-2 ">Intermediate Level</h3>
                            <p className="text-gray-600">
                            Ideal for projects that require a blend of experience and creativity to move quickly from idea to execution.
                            </p>
                        </div>

                        {/* Senior Level Consultants */}
                        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col border-t-4 border-[#5D976E] h-[200px]">
                            {/* Large Number */}
                            <div className="text-gray-300 text-6xl font-bold mb-4">
                            03
                            </div>
                            <h3 className="text-lg font-semibold mb-2 ">Senior Level </h3>
                            <p className="text-gray-600">
                            Perfect for projects that need strong leadership, in-depth technical expertise, and a strategic approach.
                            </p>
                        </div>
                    </div>

                  

                    <div className='w-full flex lg:flex-row flex-col justify-between items-start mt-5'>
                        <p className='text-[#001533] font-semibold text-2xl mb-8'>
                            Expand your team with skilled professionals—connect with us today!
                        </p>
                        <a href="/contact-us" className='inline-flex items-center bg-brandprimary text-white px-6 py-3 rounded-[10px] font-semibold hover:bg-gray-200 transition-colors duration-300'>
                            Contact Us
                        </a>
                    </div>
                </div>                                
            </div>
        </div> 
     
        <div className='w-full m-auto py-[10px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-10'>

            <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
                <h3 className='font-semibold text-[20px]'>
                    Our Clients
                </h3>
                <h1 className='text-[40px] font-semibold'>
                    Here are some companies we’ve worked with
                </h1> 

                <div className="w-full py-10">                                   
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 items-start justify-center ">
                            <img 
                            src={conglogo} // Replace with your logo image source
                            alt="Logo 1"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo2} // Replace with your logo image source
                            alt="Logo 2"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo3} // Replace with your logo image source
                            alt="Logo 3"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo4} // Replace with your logo image source
                            alt="Logo 4"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo5}
                            alt="Logo 5"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo6}
                            alt="Logo 6"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo7}
                            alt="Logo 7"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            <img 
                            src={conglogo8}
                            alt="Logo 8"
                            className="w-full h-auto max-h-[80px] object-contain"
                            />
                            {/* Add more logo images as needed */}
                        </div>
                </div>


            </div>
        </div>

        <BodyContainer />
        <Footer />
    </>
  )
}

export default StaffAugment