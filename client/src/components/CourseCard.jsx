import React, { useState } from 'react';
import { HiClock } from 'react-icons/hi';
import { HiBanknotes, HiCalendarDays } from 'react-icons/hi2';
import { MdChecklist } from 'react-icons/md';
import ApplicationModal from './ApplicationModal';

const CourseCard = ({ 
  number, 
  title, 
  imageUrl, 
  prerequisites, 
  duration, 
  cost, 
  startDate, 
  endDate,
  description // Add description field
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Loading state

  const handleApplyNow = () => {
    setIsLoading(true); // Show loading animation

    const courseData = {
       title,
       cost,
       description,
       prerequisites,
       duration,
       startDate,
       endDate,
       imageUrl
    };
    
    console.log("Course Data:", courseData);

    // Simulate a delay (e.g., API call) before opening the modal
    setTimeout(() => {
      setIsLoading(false);   // Hide loading animation
      setIsModalOpen(true);   // Open modal after loading
    }, 2000); // Adjust the delay as needed
  };

  return (
   <>
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg p-6 border border-gray-200">
        {/* Course Image */}
        <div className="md:w-1/3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-[200px] md:h-[400px] object-cover object-top"
          />
        </div>

        {/* Course Details */}
        <div className="md:w-2/3">
          <h3 className="text-xl font-semibold mb-6">
            {number}. {title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Prerequisites */}
            <div className='border border-[#E3E3E3] p-9 flex flex-col items-start lg:px-4'>
              <div className='bg-[#E7F3FD] p-3 rounded-md mb-4'>
                <MdChecklist  className='w-5 h-5 text-[#07548C]'/>
              </div>
              <span className="text-sm font-bold text-[#001533] uppercase mb-2 text-left">Prerequisites:</span>
              <p className="text-sm text-[#5E5E5E]">{prerequisites}</p>
            </div>

            {/* Duration */}
            <div className='border border-[#E3E3E3] p-9 flex flex-col items-start lg:px-4'>
              <div className='bg-[#E7F3FD] p-3 rounded-md mb-4'>
                <HiClock  className='w-5 h-5 text-[#07548C]'/>
              </div>
              <span className="text-sm font-bold text-[#001533] uppercase mb-2 text-left">Duration</span>
              <p className="text-sm text-[#5E5E5E]">{duration}</p>
            </div>

            {/* Cost */}
            <div className='border border-[#E3E3E3] p-9 flex flex-col items-start lg:px-4'>
              <div className='bg-[#E7F3FD] p-3 rounded-md mb-4'>
                <HiBanknotes  className='w-5 h-5 text-[#07548C]'/>
              </div>
              <span className="text-sm font-bold text-[#001533] uppercase mb-2 text-left">Cost</span>
              <p className="text-sm text-[#5E5E5E]">${cost}</p>
            </div>

            {/* Dates */}
            <div className='border border-[#E3E3E3] p-9 flex flex-col items-start lg:px-4'>
              <div className='bg-[#E7F3FD] p-3 rounded-md mb-4'>
                <HiCalendarDays className='w-5 h-5 text-[#07548C]'/>
              </div>
              <span className="text-sm font-bold text-[#001533] uppercase mb-2 text-left">Start Date</span>
              <p className="text-sm mb-5 text-[#5E5E5E]">{startDate}</p>
              <span className="text-sm font-bold text-[#001533] uppercase mb-2 text-left">End Date</span>
              <p className="text-sm text-[#5E5E5E]">{endDate}</p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              onClick={handleApplyNow}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.268 0 0 6.268 0 14h4z"
                  ></path>
                </svg>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseData={{
          title,
          cost
        }}
      />
    </>
  
);
};

export default CourseCard