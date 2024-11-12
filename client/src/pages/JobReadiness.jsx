import React, { useEffect, useState } from 'react'
import ServiceHero from '../components/ServiceHero'
import SoftwareCard from '../components/SoftwareCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Job Readiness Courses
            </h1>
            
            <div className="space-y-6">
                {courses.map((course) => (
                <SoftwareCard key={course.number} {...course} />
                ))}
            </div>
        </div>

        <BodyContainer />
        <Footer />


    </>
  )
}

export default JobReadiness