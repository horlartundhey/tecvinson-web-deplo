import React, { useEffect, useState } from 'react'
import ServiceHero from '../components/ServiceHero'
import CourseCard from '../components/CourseCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';
// import scrum from '../assets/scrum.png';
// import productOwner from '../assets/productOwner.png';
// import Businessanalysis from '../assets/Businessanalysis.png';
// import scrum from '../assets/scrum.png';



const ProductManCourse = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Simulating a fetch function. Replace this with your API call.
    const fetchCourses = () => {
      const courseData = [
        {
          number: 1,
          title: "Product Owner",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730724287/productOwner_kzhv7s.png',
          prerequisites: "Basic knowledge of Product Ownership",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 2,
          title: "Scrum Master",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730724263/scrum_tkpb6b.png',
          prerequisites: "Basic knowledge of Scrum Mastery",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 3,
          title: "Business Analysis",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730724227/Businessanalysis_mih7nt.png',
          prerequisites: "Basic knowledge of Business Analysis",
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
            <h1 className="text-[40px] font-semibold text-gray-900 mb-8">
                Product Management Courses
            </h1>
            
            <div className="space-y-6">
                {courses.map((course) => (
                <CourseCard key={course.number} {...course} />
                ))}
            </div>
        </div>

        <BodyContainer />
        <Footer />
    </>
  )
}

export default ProductManCourse