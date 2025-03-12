import React, { useState } from 'react';
import { HiClock } from 'react-icons/hi';
import { HiBanknotes, HiCalendarDays, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineClock } from 'react-icons/hi2';
import { MdChecklist } from 'react-icons/md';
import ApplicationModal from './ApplicationModal';
import ImportantNoticeModal from './ImportantNoticeModal';

const CourseCard = ({ 
  number, 
  title, 
  imageUrl, 
  prerequisites, 
  duration, 
  cost, 
  startDate, 
  endDate,  
  category,
  description // Add description field
}) => {
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleApplyNow = () => {
      setIsLoading(true);
  
      // Simulate a delay (e.g., API call) before opening the notice modal
      setTimeout(() => {
        setIsLoading(false);
        setIsNoticeModalOpen(true); // Open notice modal first
      }, 1000);
    };
  
    const handleContinueToApplication = () => {
      setIsNoticeModalOpen(false);
      setIsApplicationModalOpen(true);
    };
  
    const courseData = {
      title,
      cost,
      prerequisites,
      duration,
      startDate,
      endDate,
      imageUrl,
      category
    };

  return (
   <>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col h-[30rem]"> {/* Set a fixed height */}
        {/* Course Image */}
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-[10rem] object-cover rounded-lg"
          />
        </div>
        
        {/* Course Info */}
        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="text-[24px] font-semibold text-gray-900 mb-3">{title}</h3>
          
          <div className="flex items-center mb-2">
            <div className="font-bold text-[20px] text-[#C77800]">
              ${cost}
            </div>
            <div className="text-[#001533] text-[20px] font-normal flex items-center ml-2">
              <span className="mx-2">•</span> {duration}
            </div>
          </div>
          <hr className='my-3' />
          
          {prerequisites && (
            <div className="text-[16px] text-[#5E5E5E] font-normal mb-4 flex items-start">
              <span className="text-[#001533] font-bold inline-block mt-0.5 mr-1">NB:</span>
              {prerequisites}
            </div>
          )}
          
          {/* Spacer to push the button to the bottom */}
          <div className="flex-grow"></div>
          
          {/* Apply Now Button */}
          <button 
            onClick={handleApplyNow}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-2 py-3 transition-colors text-center w-1/2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Apply Now"
            )}
          </button>
        </div>
      </div>

    <ImportantNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onContinue={handleContinueToApplication}
      />

      {/* Application Modal */}
      <ApplicationModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        courseData={courseData}
      />
    </>
  
);
};

export default CourseCard