import React, { useState, useEffect } from 'react'
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
          duration: 0.2,
          ease: 'easeOut',
          delay: index * 0.1, // Stagger animation based on index
        }}
      >
        <SoftwareCard {...course} />
      </motion.div>
    )
  }

const ProductDesign = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Simulating a fetch function. Replace this with your API call.
        const fetchCourses = () => {
            const courseData = [
                {
                    number: 1,
                    title: "Product Design (UI/UX)",
                    imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730728313/image_s5r5j7.png',
                    prerequisites: "Basic knowledge of Product Design",
                    duration: "3 Months",
                    cost: "300",
                    startDate: "January 15, 2025",
                    endDate: "April 15, 2025",
                    description: "Learn how to design user interfaces and experiences for digital products.",
                    category: "Product Design"
                },
                // Add more courses if needed
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
                    Product Design Courses
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

export default ProductDesign;
