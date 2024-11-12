import React, { useEffect, useState } from 'react'
import ServiceHero from '../components/ServiceHero'
import SoftwareCard from '../components/SoftwareCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';

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
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 2,
          title: "Mobile Software Development",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727335/image_jlj2gh.png',
          prerequisites: "Basic knowledge of Mobile Software Development",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 3,
          title: "Backend Development (Java)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727348/image_uwkhzt.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 4,
          title: "Backend Development (C#)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727498/image_gm1ywf.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 5,
          title: "Backend Development (Python)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727509/image_aimrwa.png',
          prerequisites: "Basic knowledge of Backend Development",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 6,
          title: "DevOps",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727521/image_zi7boq.png',
          prerequisites: "Basic knowledge of Development and Operations",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 7,
          title: "Manual Software Testing",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727543/image_gjkoln.png',
          prerequisites: "Basic knowledge of Software Testing",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 8,
          title: "Automated Software Testing",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727558/image_nvpwvz.png',
          prerequisites: "Basic knowledge of Software Testing",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 9,
          title: "Data Analysis",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727567/image_zobchc.png',
          prerequisites: "Basic knowledge of Data Analysis",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 10,
          title: "Cybersecurity (Offensive and Defensive)",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727586/image_ieayx1.png',
          prerequisites: "Basic knowledge of Cybersecurity",
          duration: "3 Months",
          cost: "500",
          startDate: "January 15, 2025",
          endDate: "April 15, 2025"
        },
        {
          number: 11,
          title: "Data Science and Machine Learning",
          imageUrl: 'https://res.cloudinary.com/kamisama/image/upload/v1730727597/image_gm1xpj.png',
          prerequisites: "Basic knowledge of Data Science",
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
                Software Development Courses
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

export default ProductDevelopment