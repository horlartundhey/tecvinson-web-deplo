import React from 'react'
import ServiceHero from '../components/ServiceHero'
import { FaArrowRight } from 'react-icons/fa6'
import { HiCodeBracket, HiOutlineBriefcase, HiOutlineChatBubbleLeftRight, HiOutlineComputerDesktop, HiOutlineUsers } from 'react-icons/hi2'
import { MdOutlinePsychology } from 'react-icons/md'
import { FiPenTool } from 'react-icons/fi'
import Footer from '../components/Footer'
import BodyContainer from '../components/BodyContainer'
import { Link } from 'react-router-dom';

const Services = () => {
    const categories = [
        {
          icon: (
           <MdOutlinePsychology className='w-14 h-14  transform -scale-x-100 ' />
          ),
          title: 'Product Management',
          description: 'Learn to lead product development and strategy',
          path: '/product-management',
        },
        {
          icon: (
            <FiPenTool className='w-14 h-14' />
          ),
          title: 'Product Design',
          description: 'Master UI/UX and digital product design',
          path: '/product-design',
        },
        {
          icon: (
            <HiCodeBracket className='w-14 h-14' />
          ),
          title: 'Development',
          description: 'Build expertise in programming and development',
          path: '/development',
        },
        {
          icon: (
            <HiOutlineBriefcase  className='w-14 h-14'/>
          ),
          title: 'Job Readiness',
          description: 'Prepare for your tech career journey',
          path: '/job-readiness',
        }
      ];

  return (
    <>
    <div>
        <ServiceHero />

        <div className='w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-32'>
            <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
                <h3 className='font-semibold text-[20px]'>
                    COURSES OFFERED
                </h3>
                <h1 className='text-[40px] font-semibold'>
                    We provide courses in these categories
                </h1>

                    {/* Main White Box Container */}                                
                {/* Categories Section */}
                    <div className="mt-16">                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                            <Link to={category.path} key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center ">
                                <div className=" flex justify-center items-center text-blue-600 mb-4 items-center">
                                {category.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                                <p className="text-gray-600">{category.description}</p>
                            </Link>
                            ))}
                        </div>
                    </div>

                {/* Explore Services Section */}                
               

            </div>
        </div>        
    </div>    
     <BodyContainer />
     <Footer />
    </>
  )
}

export default Services