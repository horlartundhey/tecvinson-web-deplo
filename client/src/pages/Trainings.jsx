import React from 'react'
import ServiceHero from '../components/ServiceHero'
import { MdOutlinePsychology } from 'react-icons/md'
import { FiPenTool } from 'react-icons/fi'
import { HiCodeBracket, HiOutlineBriefcase } from 'react-icons/hi2'
import Footer from '../components/Footer'
import BodyContainer from '../components/BodyContainer'
import { Link } from 'react-router-dom'
import { delay, motion } from 'framer-motion'

const Trainings = () => {
  const categories = [
    {
      icon: (
        <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg " className="w-14 h-14 transform ">
          <path d="M15.2195 22.904L15.3615 24.254C15.3822 24.495 15.4767 24.6923 15.645 24.846C15.8137 25 16.0205 25.077 16.2655 25.077H17.7345C17.9795 25.077 18.1863 25 18.355 24.846C18.5233 24.6923 18.6178 24.495 18.6385 24.254L18.7805 22.904C19.1755 22.804 19.5455 22.6585 19.8905 22.4675C20.2352 22.2762 20.5293 22.0395 20.773 21.7575L21.9845 22.3115C22.1922 22.4115 22.4052 22.4317 22.6235 22.372C22.8422 22.3123 23.0138 22.178 23.1385 21.969L23.873 20.704C23.9937 20.4963 24.031 20.2852 23.985 20.0705C23.9393 19.8562 23.8252 19.6725 23.6425 19.5195L22.554 18.723C22.6973 18.3153 22.769 17.9077 22.769 17.5C22.769 17.0923 22.6973 16.6847 22.554 16.277L23.6425 15.4805C23.8252 15.3275 23.9393 15.1438 23.985 14.9295C24.031 14.7148 23.9937 14.5037 23.873 14.296L23.1385 13.031C23.0138 12.822 22.8422 12.6877 22.6235 12.628C22.4052 12.5683 22.1922 12.5885 21.9845 12.6885L20.773 13.2425C20.5293 12.9605 20.2352 12.7238 19.8905 12.5325C19.5455 12.3415 19.1755 12.196 18.7805 12.096L18.6385 10.746C18.6178 10.505 18.5233 10.3077 18.355 10.154C18.1863 10 17.9795 9.923 17.7345 9.923H16.2655C16.0205 9.923 15.8137 10 15.645 10.154C15.4767 10.3077 15.3822 10.505 15.3615 10.746L15.2195 12.096C14.8245 12.196 14.4545 12.3415 14.1095 12.5325C13.7648 12.7238 13.4707 12.9605 13.227 13.2425L12.0155 12.6885C11.8078 12.5885 11.5948 12.5683 11.3765 12.628C11.1578 12.6877 10.9862 12.822 10.8615 13.031L10.127 14.296C10.0063 14.5037 9.969 14.7148 10.015 14.9295C10.0607 15.1438 10.1748 15.3275 10.3575 15.4805L11.446 16.277C11.3027 16.6847 11.231 17.0923 11.231 17.5C11.231 17.9077 11.3027 18.3153 11.446 18.723L10.3575 19.5195C10.1748 19.6725 10.0607 19.8562 10.015 20.0705C9.969 20.2852 10.0063 20.4963 10.127 20.704L10.8615 21.969C10.9862 22.178 11.1578 22.3123 11.3765 22.372C11.5948 22.4317 11.8078 22.4115 12.0155 22.3115L13.227 21.7575C13.4707 22.0395 13.7648 22.2762 14.1095 22.4675C14.4545 22.6585 14.8245 22.804 15.2195 22.904ZM16.999 20.8655C16.0637 20.8655 15.2692 20.5382 14.6155 19.8835C13.9615 19.2288 13.6345 18.434 13.6345 17.499C13.6345 16.5637 13.9618 15.7692 14.6165 15.1155C15.2712 14.4615 16.066 14.1345 17.001 14.1345C17.9363 14.1345 18.7308 14.4618 19.3845 15.1165C20.0385 15.7712 20.3655 16.566 20.3655 17.501C20.3655 18.4363 20.0382 19.2308 19.3835 19.8845C18.7288 20.5385 17.934 20.8655 16.999 20.8655ZM6 30.4385C4.1 28.7052 2.625 26.7187 1.575 24.479C0.525 22.239 0 19.908 0 17.486C0 12.7677 1.65283 8.75717 4.9585 5.4545C8.26383 2.1515 12.2777 0.5 17 0.5C20.8847 0.5 24.3583 1.661 27.421 3.983C30.484 6.30467 32.4732 9.31683 33.3885 13.0195L35.725 22.2485C35.875 22.8188 35.7692 23.3367 35.4075 23.802C35.0462 24.2673 34.5642 24.5 33.9615 24.5H30V30.8845C30 31.8788 29.646 32.73 28.938 33.438C28.23 34.146 27.3788 34.5 26.3845 34.5H22V37C22 37.425 21.8562 37.7812 21.5685 38.0685C21.2808 38.3562 20.9245 38.5 20.4995 38.5C20.0742 38.5 19.718 38.3562 19.431 38.0685C19.1437 37.7812 19 37.425 19 37V33.317C19 32.7953 19.1732 32.3622 19.5195 32.0175C19.8662 31.6725 20.2955 31.5 20.8075 31.5H26.3845C26.5642 31.5 26.7117 31.4423 26.827 31.327C26.9423 31.2117 27 31.0642 27 30.8845V23.3075C27 22.7955 27.1732 22.3662 27.5195 22.0195C27.8662 21.6732 28.2955 21.5 28.8075 21.5H32.4L30.5 13.75C29.7333 10.704 28.0937 8.23417 25.581 6.3405C23.068 4.44683 20.2077 3.5 17 3.5C13.1333 3.5 9.83333 4.85183 7.1 7.5555C4.36667 10.2592 3 13.547 3 17.419C3 19.416 3.40833 21.313 4.225 23.11C5.04167 24.907 6.2 26.5043 7.7 27.902L9 29.1V37C9 37.425 8.85617 37.7812 8.5685 38.0685C8.28083 38.3562 7.9245 38.5 7.4995 38.5C7.07417 38.5 6.718 38.3562 6.431 38.0685C6.14367 37.7812 6 37.425 6 37V30.4385Z" fill="#0A70BA"/>
        </svg>
      ),      
      title: 'Product Management',
      description: 'Learn to lead product development and strategy',
      path: '/product-management',
    },
    {
      icon: (
        <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
          <path d="M24 38.5L38 24.5L44 30.5L30 44.5L24 38.5Z" stroke="#0A70BA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M36 26.5L33 11.5L4 4.5L11 33.5L26 36.5L36 26.5Z" stroke="#0A70BA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 4.5L19.172 19.672" stroke="#0A70BA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M23 28C25.2091 28 27 26.2091 27 24C27 21.7909 25.2091 20 23 20C20.7909 20 19 21.7909 19 24C19 26.2091 20.7909 28 23 28Z" stroke="#0A70BA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ), 
      title: 'Product Design',
      description: 'Master UI/UX and digital product design',
      path: '/product-design',
    },
    {
      icon: <HiCodeBracket className="w-14 h-14" />,
      title: 'Product Development',
      description: 'Build expertise in programming and development',
      path: '/development',
    },
    {
      icon: <HiOutlineBriefcase className="w-14 h-14" />,
      title: 'Job Readiness',
      description: 'Prepare for your tech career journey',
      path: '/job-readiness',
    },
  ]

  const glowVariants = {
    rest: {
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)', // No shadow initially
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    hover: {
      boxShadow: '0px 0px 7px 3px rgba(0, 123, 255, 0.4), 0px 0px 10px rgba(0, 123, 255, 0.3)', // Neon blue glow
      scale: 1.02, // Slightly scale up
      transition: { duration: 0.2, ease: 'easeInOut', delay:0.1 },
    },
  }

  return (
    <>
      <div>
        <ServiceHero />

        <div className="w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px] mt-6">
          <div className="lg:w-full w-full flex flex-col justify-center items-start gap-6">
            <motion.h3
              className="font-semibold text-[14px]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: 0.2 }}
            >
              COURSES OFFERED
            </motion.h3>
            <motion.h1
              className="text-[40px] leading-10 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut', delay: 0.2}}
            >
              We provide courses in these categories
            </motion.h1>

            {/* Categories Section */}
            <div className="mt-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center cursor-pointer"
                    
                    initial="rest"
                    whileHover="hover"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Link to={category.path} >
                      <div className="flex justify-center items-center text-[#0A70BA] mb-4">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">{category.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BodyContainer />
      <Footer />
    </>
  )
}

export default Trainings
