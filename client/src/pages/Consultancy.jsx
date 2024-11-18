import React from 'react'
import ConsultancyHero from '../components/ConsultancyHero'
import { FaArrowRight } from 'react-icons/fa6'
import BodyContainer from '../components/BodyContainer'
import Footer from '../components/Footer'

import congaler from '../assets/congaler.png';
import congaler2 from '../assets/congaler2.png';
import congaler3 from '../assets/congaler3.png';
import congaler4 from '../assets/congaler4.png';
import conglogo from '../assets/conglogo.png';
import conglogo2 from '../assets/conglogo2.png';
import conglogo3 from '../assets/conglogo3.png';
import conglogo4 from '../assets/conglogo4.png';
import conglogo5 from '../assets/conglogo5.png';
import conglogo6 from '../assets/conglogo6.png';
import conglogo7 from '../assets/conglogo7.png';
import conglogo8 from '../assets/conglogo8.png';



const Consultancy = () => {
  return (
    <>
        <ConsultancyHero />

        <div className='w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-32'>

            <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
                <h3 className='font-semibold text-[14px]'>
                CONSULTANT PLACEMENT
                </h3>
                <h1 className='text-[40px] leading-10 font-semibold'>
                    Our approach to consultant placement is simple.
                </h1>                                   
               
                <div className="lg:w-full w-full">

                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Email Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start border-t-4 border-[#9F63B6] h-[160px] ">
                        {/* <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-blue-600" />
                        </div> */}
                        <h3 className="text-lg font-semibold mb-2">Junior Level Consultants</h3>
                        <p className="text-gray-600">For less complex tasks or roles where mentorship is provided.</p>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start border-t-4 border-[#9F63B6] h-[160px]">
                        {/* <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <Phone className="w-6 h-6 text-blue-600" />
                        </div> */}
                        <h3 className="text-lg font-semibold mb-2">Intermediate Level Consultants</h3>
                        <p className="text-gray-600">For projects requiring more experience and autonomy.</p>
                    </div>

                    {/* Visit Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start border-t-4 border-[#9F63B6] h-[160px]">
                        {/* <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        </div> */}
                        <h3 className="text-lg font-semibold mb-2">Senior Level Consultants</h3>
                        <p className="text-gray-600">For leadership roles or projects that require high-level strategic thinking.</p>
                    </div>

                    </div>

                    <p className='text-[#5E5E5E]'>We offer both onsite and offshore consultants, ensuring flexibility to match your specific needs.</p>

                    <div className='w-full flex lg:flex-row flex-col justify-between items-start mt-5'>
                        <p className='text-[#001533] font-semibold text-2xl mb-8    '>
                        Need to get tailored IT insights that deliver real results?—Let’s talk!
                        </p>
                        <a href="/contact-us" className='inline-flex items-center bg-brandprimary text-white px-6 py-3 rounded-[10px] font-semibold hover:bg-gray-200 transition-colors duration-300'>
                            Contact Us
                        </a>
                    </div>
                </div>                                
            </div>
        </div>   
        <div className="w-full mt-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                            <img 
                            src={congaler} // Replace with your actual image source
                            alt="Consultancy Image 1"
                            className="w-full h-full object-cover"
                            />
                            <img 
                            src={congaler2} // Replace with your actual image source
                            alt="Consultancy Image 2"
                            className="w-full h-full object-cover"
                            />
                            <img 
                            src={congaler3}// Replace with your actual image source
                            alt="Consultancy Image 3"
                            className="w-full h-full object-cover"
                            />
                            <img 
                            src={congaler4} // Replace with your actual image source
                            alt="Consultancy Image 4"
                            className="w-full h-full object-cover"
                            />
                        </div>
        </div>

        <div className='w-full m-auto py-[10px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-10 mb-14'>

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

export default Consultancy