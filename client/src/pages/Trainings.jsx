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
        <MdOutlinePsychology className="w-14 h-14 transform -scale-x-100" />
      ),
      title: 'Product Management',
      description: 'Learn to lead product development and strategy',
      path: '/product-management',
    },
    {
      icon: <FiPenTool className="w-14 h-14" />,
      title: 'Product Design',
      description: 'Master UI/UX and digital product design',
      path: '/product-design',
    },
    {
      icon: <HiCodeBracket className="w-14 h-14" />,
      title: 'Development',
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
      transition: { duration: 0.9, ease: 'easeInOut', delay:0.1 },
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
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
            >
              COURSES OFFERED
            </motion.h3>
            <motion.h1
              className="text-[40px] leading-10 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 1 }}
            >
              We provide courses in these categories
            </motion.h1>

            {/* Categories Section */}
            <div className="mt-16">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer"
                    variants={glowVariants}
                    initial="rest"
                    whileHover="hover"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Link to={category.path}>
                      <div className="flex justify-center items-center text-blue-600 mb-4">
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
