import React, { useEffect, useState } from 'react'
import ServiceHero from '../components/ServiceHero'
import SoftwareCard from '../components/SoftwareCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ProductDevelopment = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulating a fetch function. Replace this with your API call.
    const fetchCourses = () => {
      const courseData = [
        {
          number: 1,
          title: "Frontend Development",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727270/image_rycdsz.png',
          prerequisites: "Basic knowledge of Frontend Development",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 2,
          title: "Mobile Software Development",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727335/image_jlj2gh.png',
          prerequisites: "Basic knowledge of Mobile Software Development",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 3,
          title: "Backend Development (Java)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727348/image_uwkhzt.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 4,
          title: "Backend Development (C#)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727498/image_gm1ywf.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 5,
          title: "Backend Development (Python)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727509/image_aimrwa.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 6,
          title: "DevOps",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727521/image_zi7boq.png',
          prerequisites: "Basic knowledge of Development and Operations",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 7,
          title: "Manual Software Testing",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727543/image_gjkoln.png',
          prerequisites: "Basic knowledge of Software Testing",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 8,
          title: "Automated Software Testing",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727558/image_nvpwvz.png',
          prerequisites: "Basic knowledge of Software Testing",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 9,
          title: "Data Analysis",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727567/image_zobchc.png',
          prerequisites: "Basic knowledge of Data Analysis",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 10,
          title: "Cybersecurity (Offensive and Defensive)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727586/image_ieayx1.png',
          prerequisites: "Basic knowledge of Cybersecurity",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 11,
          title: "Data Science and Machine Learning",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727597/image_gm1xpj.png',
          prerequisites: "Basic knowledge of Data Science",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 12,
          title: "Data Engineering",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1732097563/data-engineering_w21ygk.jpg',
          prerequisites: "Basic knowledge of Data Engineering",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        },
        {
          number: 13,
          title: "Generative A.I",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1741705971/generative-ai_ema6rf.webp',
          prerequisites: "Basic knowledge of Artificial Intelligence",
          duration: "3 Months",
          cost: "400",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025",
          category: "Product Development"
        }
      ];
      setCourses(courseData);
  };

  fetchCourses();
}, []);



const fadeInVariants = {
  hidden: { opacity: 0, y: 50 }, // Initial state: invisible and slightly below
  visible: { opacity: 1, y: 0 }, // Final state: fully visible in place
}

const CourseCardWithScrollEffect = ({ index, ...course }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { triggerOnce: true }) // Trigger only once when in view

  return (
    <motion.div
      ref={ref}
      variants={fadeInVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
        delay: index * 0.1, // Stagger animation based on index
      }}
    >
      <SoftwareCard {...course} />
    </motion.div>
  )
}

  return (
    <>
    <ServiceHero />    

        <div className="mx-auto sm:px-6 lg:px-[150px] px-[20px] py-12">
            <h1 className="text-[40px] font-semibold text-gray-900 mb-8">
                Product Development Courses
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (                
                <CourseCardWithScrollEffect key={course.number} {...course} index={index} />
                ))}            
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  imageUrl={course.imageUrl}
                  cost={course.cost}
                  duration={course.duration}
                  requirementNote={course.requirementNote}
                />
              ))}
      </div> */}
        </div>

        <BodyContainer />
        <Footer />


    </>
  )
}

export default ProductDevelopment