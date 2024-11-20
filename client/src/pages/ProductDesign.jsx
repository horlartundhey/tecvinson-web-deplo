import React, { useState, useEffect } from 'react'
import ServiceHero from '../components/ServiceHero'
import SoftwareCard from '../components/SoftwareCard';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';

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
                    cost: "500",
                    startDate: "January 15, 2025",
                    endDate: "April 15, 2025",
                    description: "Learn how to design user interfaces and experiences for digital products."
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-[40px] font-semibold text-gray-900 mb-8">
                    Product Design Courses
                </h1>
                
                <div className="space-y-6">
                    {courses.map((course) => (
                        <SoftwareCard 
                            key={course.number} 
                            {...course} 
                        />
                    ))}
                </div>
            </div>

            <BodyContainer />
            <Footer />
        </>
    )
}

export default ProductDesign;
