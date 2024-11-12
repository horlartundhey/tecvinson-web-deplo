import React from 'react'
import SolutionsHero from '../components/SolutionsHero'
import { HiCodeBracket, HiOutlineLightBulb } from 'react-icons/hi2'
import { MdOutlineHandshake } from 'react-icons/md'
import { TbBulb } from 'react-icons/tb'
import solu1 from '../assets/solu1.png'
import solu2 from '../assets/solu2.png'
import solu3 from '../assets/solu3.png'


const Solutions = () => {
  return (
    <>
        <SolutionsHero />

        <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mx-4'>
          <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
              CONTACT US
            </h3>
            <h1 className='text-[40px] font-semibold'>
                Feel free to reach out to us
            </h1>   

              <div className="lg:w-full w-full">

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Email Card */}
                <div className="bg-[#FFF7F5] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px]">
                    <div className="  flex items-center justify-center mb-4">
                    <TbBulb className="w-24 h-24 text-[#B4746A]" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Ideation & Discovery</h3>
                    <p className="text-[#131313]">We collaborate with you through workshops and brainstorming sessions to discover the best solutions for your business.</p>
                </div>

                {/* Phone Card */}
                <div className="bg-[#FCF4FF] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px]">
                    <div className="  flex items-center justify-center mb-4">
                    <HiCodeBracket className="w-24 h-24 text-[#845896]" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Agile Product Development</h3>
                    <p className="text-[#131313]">We use sprints to build, test, and release features incrementally. This allows us to gather feedback and improve upon each iteration.</p>
                </div>

                {/* Visit Card */}
                <div className="bg-[#F2FFF6] p-6 rounded-lg shadow-sm flex flex-col items-center text-center h-[350px]">
                    <div className="  flex items-center justify-center mb-4">
                    <MdOutlineHandshake className="w-24 h-24 text-[#5A7E64] font-normal" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-[#001533] ">Product Delivery</h3>
                    <p className="text-[#131313]">Once the solution is ready, we launch it in stages, allowing for continuous improvements and adaptation to real-world feedback.</p>
                </div>
              </div>     
                    <div className='w-full flex lg:flex-row flex-col justify-between items-center mt-5 mx-4'>
                        <p className='text-[#001533] font-semibold text-2xl'>
                        Expand your team with skilled professionals—connect with us today!
                        </p>
                        <a href="/contact" className='inline-flex items-center bg-brandprimary text-white px-6 py-3 rounded-[10px] font-semibold hover:bg-gray-200 transition-colors duration-300'>
                            Contact Us
                        </a>
                    </div>     
        </div>
      </div>
      
    </div>      
    <div className="w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mx-4">    
      <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
              SOLUTIONS AT TECVINSON
            </h3>
            <h1 className='text-[40px] font-semibold'>
                Here are some solutions we've built
            </h1>   

            <div className='lg:w-full w-full'>              
            
              {/* About Us Section */}
              <section  className="mb-32">
                <div className="relative flex flex-col lg:flex-row items-start">
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2">
                    <img 
                      src={solu1}
                      alt="Team collaborating"
                      className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
                    />
                  </div>
                  
                  {/* Overlapping Content */}
                  <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                                lg:absolute lg:right-0 lg:top-12 lg:w-[60%]
                                w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Event Management System (D’EventMatcha)</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                    Our Event Management System is designed to create a unified platform for event venue owners, service providers, event planners, and customers. This solution enables seamless engagement and management of events, ensuring a safe and professional experience for all parties involved. Key features include venue booking, service coordination, event planning tools, and customer feedback management.
                    </p>                    
                  </div>
                </div>
              </section>

              {/* Vision Section */}
              <section className="mb-32">
                <div className="relative flex flex-col lg:flex-row items-start">
                  <div className="w-full lg:w-1/2 lg:ml-auto">
                    <img 
                      src={solu2}
                      alt="Person with VR headset"
                      className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
                    />
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                                lg:absolute lg:left-0 lg:top-12 lg:w-[60%]
                                w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Diaspora System</h2>
                    <p className="text-gray-600 leading-relaxed">
                    The Diaspora System aims to connect embassies, communities, associations, and organizations, fostering collaboration and support among them. This platform facilitates engagement, leverages collective strengths, and brings communities closer together to address common issues and celebrate achievements. It is designed to enhance communication, coordination, and resource sharing within the diaspora.
                    </p>
                  </div>
                </div>
              </section>

              {/*mission section */}
              <section  className="mb-32">
                <div className="relative flex flex-col lg:flex-row items-start">
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2">
                    <img 
                      src={solu3}
                      alt="Team collaborating"
                      className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
                    />
                  </div>
                  
                  {/* Overlapping Content */}
                  <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 
                                lg:absolute lg:right-0 lg:top-12 lg:w-[60%]
                                w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
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
    </>
  )
}

export default Solutions