import React from 'react'
import SolutionsHero from '../components/SolutionsHero'
import { HiCodeBracket, HiOutlineLightBulb } from 'react-icons/hi2'
import { MdOutlineHandshake } from 'react-icons/md'
import { TbBulb } from 'react-icons/tb'
import solu1 from '../assets/solu1.png'
import solu2 from '../assets/solu2.png'
import solu3 from '../assets/solu3.png'
import BodyContainer from '../components/BodyContainer'
import Footer from '../components/Footer'
import { motion } from 'framer-motion';

const h3Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const Solutions = () => {
  return (
    <>
        <SolutionsHero />

        <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mx-4'>
          <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
          <motion.h3
                className="font-semibold text-[14px]"
                variants={h3Variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, ease: 'easeOut', delay: 0.2}}
              >
                OUR APPROACH 
              </motion.h3>            
            <h1 className='text-[40px] leading-10 font-semibold'>
              Our Development Process
            </h1>   

              <div className="lg:w-full w-full">

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Email Card */}
                <div className="bg-[#FFF7F5] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px]">
                    <div className="  flex items-center justify-center mb-4">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-[#B4746A]">
                    <path d="M30.45 74.995C28.5033 70.595 27.4984 65.8364 27.5 61.025C27.5 42.5 42.05 27.495 60 27.495C77.95 27.495 92.5 42.505 92.5 61.025C92.5016 65.8364 91.4967 70.595 89.55 74.995M60 9.995V14.995M110 59.995H105M15 59.995H10M95.35 24.64L91.815 28.175M28.185 28.18L24.65 24.645M72.585 96.53C77.635 94.895 79.665 90.27 80.235 85.62C80.405 84.23 79.26 83.075 77.86 83.075H42.385C42.0431 83.0695 41.704 83.1367 41.39 83.2722C41.076 83.4076 40.7944 83.6081 40.5637 83.8605C40.3331 84.1129 40.1587 84.4115 40.052 84.7363C39.9453 85.0612 39.9089 85.405 39.945 85.745C40.505 90.385 41.915 93.775 47.265 96.525M72.585 96.53L47.265 96.525M72.585 96.53C71.98 106.255 69.17 110.105 60.035 109.995C50.265 110.175 48.015 105.41 47.265 96.525" stroke="#B4746A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {/* <TbBulb className="w-24 h-24 text-[#B4746A]" /> */}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Ideation & Discovery</h3>
                    <p className="text-[#131313]">We collaborate with you through workshops and brainstorming sessions to discover the best solutions for your business.</p>
                </div>

                {/* Phone Card */}
                <div className="bg-[#FCF4FF] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px] ">
                    <div className="  flex items-center justify-center mb-4">
                    {/* <HiCodeBracket className="w-24 h-24 text-[#845896]" /> */}
                    <svg width="120" className="w-24 h-24 text-[#5A7E64]" height="120" viewBox="0 0 120 120" fill="none"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M86.25 33.75L112.5 60L86.25 86.25M33.75 86.25L7.5 60L33.75 33.75M71.25 18.75L48.75 101.25" stroke="#845896" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Agile Product Development</h3>
                    <p className="text-[#131313]">We use sprints to build, test, and release features incrementally. This allows us to gather feedback and improve upon each iteration.</p>
                </div>

                {/* Visit Card */}
                <div className="bg-[#F2FFF6] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px]">
                    <div className="  flex items-center justify-center mb-4">
                    {/* <MdOutlineHandshake className="w-24 h-24 text-[#5A7E64] font-normal" /> */}
                    <svg className="w-24 h-24 text-[#5A7E64]" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M58.2494 99.625C58.9994 99.625 59.7703 99.4583 60.562 99.125C61.3536 98.7917 61.9995 98.375 62.4995 97.875L100.874 59.5C102.208 58.1667 103.249 56.8333 103.999 55.5C104.749 54.1667 105.124 52.6667 105.124 51C105.124 49.3333 104.749 47.7083 103.999 46.125C103.249 44.5417 102.208 43.0833 100.874 41.75L82.8745 23.75C81.5411 22.4167 80.2078 21.4375 78.8745 20.8125C77.5411 20.1875 76.0411 19.875 74.3745 19.875C72.7078 19.875 71.187 20.1875 69.812 20.8125C68.437 21.4375 67.1245 22.4167 65.8745 23.75L60.6245 29L69.8745 38.25C70.7911 39.1667 71.4786 40.2083 71.937 41.375C72.3953 42.5417 72.6245 43.7083 72.6245 44.875C72.6245 47.2083 71.8745 49.125 70.3745 50.625C68.8745 52.125 66.9578 52.875 64.6245 52.875C63.4578 52.875 62.312 52.7083 61.187 52.375C60.062 52.0417 59.0411 51.4167 58.1244 50.5L51.3744 43.75C50.6244 43 49.6661 42.625 48.4994 42.625C47.3328 42.625 46.3744 43 45.6244 43.75L26.9994 62.375C26.4161 62.9583 25.9786 63.625 25.6869 64.375C25.3953 65.125 25.2494 65.875 25.2494 66.625C25.2494 67.9583 25.6661 69.0417 26.4994 69.875C27.3328 70.7083 28.4161 71.125 29.7494 71.125C30.4994 71.125 31.2703 70.9583 32.0619 70.625C32.8536 70.2917 33.4994 69.875 33.9994 69.375L48.2494 55.125C48.5828 54.7917 48.9786 54.6042 49.4369 54.5625C49.8953 54.5208 50.3328 54.7083 50.7494 55.125C51.1661 55.5417 51.3744 55.9583 51.3744 56.375C51.3744 56.7917 51.1661 57.2083 50.7494 57.625L36.4994 71.875C35.9161 72.4583 35.4786 73.125 35.1869 73.875C34.8953 74.625 34.7494 75.375 34.7494 76.125C34.7494 77.375 35.1869 78.4375 36.0619 79.3125C36.9369 80.1875 37.9994 80.625 39.2494 80.625C39.9994 80.625 40.7703 80.4583 41.5619 80.125C42.3536 79.7917 42.9994 79.375 43.4994 78.875L59.2494 63.125C59.5828 62.7917 59.9786 62.6042 60.437 62.5625C60.8953 62.5208 61.3328 62.7083 61.7495 63.125C62.1661 63.5417 62.3745 63.9583 62.3745 64.375C62.3745 64.7917 62.1661 65.2083 61.7495 65.625L45.9994 81.375C45.4994 81.875 45.0828 82.5208 44.7494 83.3125C44.4161 84.1042 44.2494 84.875 44.2494 85.625C44.2494 86.875 44.6869 87.9375 45.5619 88.8125C46.4369 89.6875 47.4994 90.125 48.7494 90.125C49.4994 90.125 50.2494 89.9792 50.9994 89.6875C51.7494 89.3958 52.4161 88.9583 52.9994 88.375L68.7495 72.625C69.0828 72.2917 69.4786 72.1042 69.937 72.0625C70.3953 72.0208 70.8328 72.2083 71.2495 72.625C71.6661 73.0417 71.8745 73.4583 71.8745 73.875C71.8745 74.2917 71.6661 74.7083 71.2495 75.125L55.4994 90.875C54.9161 91.4583 54.4786 92.1667 54.1869 93C53.8953 93.8333 53.7494 94.5833 53.7494 95.25C53.7494 96.5833 54.2078 97.6458 55.1244 98.4375C56.0411 99.2292 57.0828 99.625 58.2494 99.625ZM58.2494 103.125C55.8328 103.125 53.7911 102.208 52.1244 100.375C50.4578 98.5417 49.8328 96.2917 50.2494 93.625C47.4161 93.7917 45.0619 93.0417 43.1869 91.375C41.3119 89.7083 40.4994 87.2917 40.7494 84.125C37.5828 84.2917 35.1244 83.5 33.3744 81.75C31.6244 80 30.9161 77.625 31.2494 74.625C28.5828 74.7917 26.3328 74.1875 24.4994 72.8125C22.6661 71.4375 21.7494 69.375 21.7494 66.625C21.7494 65.4583 21.9786 64.2708 22.4369 63.0625C22.8953 61.8542 23.5828 60.7917 24.4994 59.875L43.2494 41.125C44.6661 39.7083 46.4161 39 48.4994 39C50.5828 39 52.3328 39.7083 53.7494 41.125L60.3745 47.75C60.8745 48.25 61.4786 48.6667 62.187 49C62.8953 49.3333 63.7078 49.5 64.6245 49.5C65.7911 49.5 66.8328 49.0833 67.7495 48.25C68.6661 47.4167 69.1245 46.3333 69.1245 45C69.1245 44.0833 68.9578 43.2708 68.6245 42.5625C68.2911 41.8542 67.8745 41.25 67.3745 40.75L50.3744 23.75C49.0411 22.4167 47.6869 21.4375 46.3119 20.8125C44.9369 20.1875 43.4161 19.875 41.7494 19.875C40.0828 19.875 38.6036 20.1875 37.3119 20.8125C36.0203 21.4375 34.7078 22.4167 33.3744 23.75L18.8744 38.25C16.9578 40.1667 15.7494 42.5208 15.2494 45.3125C14.7494 48.1042 15.0828 50.75 16.2494 53.25C16.4161 53.6667 16.3953 54.1042 16.1869 54.5625C15.9786 55.0208 15.6661 55.3333 15.2494 55.5C14.8328 55.6667 14.3744 55.6458 13.8744 55.4375C13.3744 55.2292 13.0411 54.9167 12.8744 54.5C11.6244 51.25 11.2494 47.9375 11.7494 44.5625C12.2494 41.1875 13.7911 38.2083 16.3744 35.625L30.7494 21.25C32.4161 19.5833 34.1453 18.3542 35.9369 17.5625C37.7286 16.7708 39.7078 16.375 41.8744 16.375C44.0411 16.375 45.9994 16.7708 47.7494 17.5625C49.4994 18.3542 51.2078 19.5833 52.8744 21.25L58.1244 26.5L63.3745 21.25C65.0411 19.5833 66.7495 18.3542 68.4995 17.5625C70.2495 16.7708 72.2078 16.375 74.3745 16.375C76.5411 16.375 78.5203 16.7708 80.312 17.5625C82.1036 18.3542 83.8328 19.5833 85.4995 21.25L103.374 39.125C105.041 40.7917 106.333 42.6458 107.249 44.6875C108.166 46.7292 108.624 48.8333 108.624 51C108.624 53.1667 108.166 55.125 107.249 56.875C106.333 58.625 105.041 60.3333 103.374 62L64.9995 100.375C63.9995 101.375 62.937 102.083 61.812 102.5C60.687 102.917 59.4994 103.125 58.2494 103.125Z" fill="#5A7E64"/>
                    </svg>

                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Product Delivery</h3>
                    <p className="text-[#131313]">Once the solution is ready, we launch it in stages, allowing for continuous improvements and adaptation to real-world feedback.</p>
                </div>
              </div>     
                    <div className='w-full flex lg:flex-row flex-col justify-between items-start mt-5 mx-4'>
                        <p className='text-[#001533] font-semibold text-2xl mb-3'>
                        Expand your team with skilled professionals—connect with us today!
                        </p>
                        <a href="/contact-us" className='inline-flex bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-500 ease-in-out delay-100 items-center hover:shadow-lg hover:scale-105'>
                            Contact Us
                        </a>
                    </div>     
        </div>
      </div>
      
    </div>      
    <div className="w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]">
  <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
    <h3 className='font-semibold text-[14px]'>
      SOLUTIONS AT TECVINSON
    </h3>
    <h1 className='text-[40px] font-semibold'>
      Here are some solutions we've built
    </h1>

    <div className='lg:w-full'>
      {/* About Us Section */}
      <section className="mb-8 md:mb-12">
        <div className="relative flex flex-col lg:flex-row items-start gap-4 ">
          {/* Image Container */}
          <div className="w-full lg:w-1/2">
            <img 
              src={solu1}
              alt="Team collaborating"
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
          
          {/* Overlapping Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                        lg:absolute lg:right-0 lg:top-12 lg:w-[60%]
                        w-full -mt-16 mx-auto lg:mt-[50px] lg:mx-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Event Management System <br /> (D’EventMatcha)</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our Event Management System is designed to create a unified platform for event venue owners, service providers, event planners, and customers. This solution enables seamless engagement and management of events, ensuring a safe and professional experience for all parties involved. Key features include venue booking, service coordination, event planning tools, and customer feedback management.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="mb-8 md:mb-12">
        <div className="relative flex flex-col lg:flex-row items-start gap-4">
          <div className="w-full lg:w-1/2 lg:ml-auto">
            <img 
              src={solu2}
              alt="Person with VR headset"
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                        lg:absolute lg:left-0 lg:top-12 lg:w-[60%]
                        w-full -mt-16 mx-auto lg:mt-[50px] lg:mx-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Diaspora System</h2>
            <p className="text-gray-600 leading-relaxed">
              The Diaspora System aims to connect embassies, communities, associations, and organizations, fostering collaboration and support among them. This platform facilitates engagement, leverages collective strengths, and brings communities closer together to address common issues and celebrate achievements. It is designed to enhance communication, coordination, and resource sharing within the diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-8 md:mb-12">
        <div className="relative flex flex-col lg:flex-row items-start gap-4">
          {/* Image Container */}
          <div className="w-full lg:w-1/2">
            <img 
              src={solu3}
              alt="Team collaborating"
              className="rounded-lg object-cover w-full h-[300px] md:h-[400px] lg:h-[500px]"
            />
          </div>
          
          {/* Overlapping Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                        lg:absolute lg:right-0 lg:top-12 lg:w-[60%]
                        w-full -mt-16 mx-auto lg:mt-[50px] lg:mx-0">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Service Request and Delivery Solution (HelpMeg)</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our Service Request and Delivery Solution provides a streamlined way for individuals to access cleaning services from freelance providers. This platform simplifies the process of finding and booking reliable cleaning services, ensuring convenience and quality for customers. Features include service provider profiles, booking management, payment processing, and customer reviews.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
<BodyContainer />
<Footer />
    </>
  )
}

export default Solutions