import React, { useEffect, useState } from 'react'
import ServiceHero from '../components/ServiceHero'
import SoftwareCard from '../components/SoftwareCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'



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
        duration: 0.8,
        ease: 'easeOut',
        delay: index * 0.2, // Stagger animation based on index
      }}
    >
      <SoftwareCard {...course} />
    </motion.div>
  )
}


const JobReadiness = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulating a fetch function. Replace this with your API call.
    const fetchCourses = () => {
      const courseData = [
        {
          number: 1,
          title: "CV, Cover Letter and Interviewing Techniques",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730728323/image_tp2hyp.png',
          prerequisites: "Basic computer literacy",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        }
      ];
      setCourses(courseData);
  };

  fetchCourses();
}, []);

  return (
    <>
    <ServiceHero />    

        <div className="mx-auto sm:px-6 lg:px-[150px] px-[20px] py-12">
            <h1 className="text-[40px] font-semibold text-gray-900 mb-8">
                Job Readiness Courses
            </h1>
            
            <div className="space-y-6">
                {courses.map((course, index) => (                
                <CourseCardWithScrollEffect key={course.number} {...course} index={index} />
                ))}     
            </div>
        </div>

        <BodyContainer />
        <Footer />


    </>
  )
}

export default JobReadiness