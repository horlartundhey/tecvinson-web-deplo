import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { disableBodyScroll, enableBodyScroll } from './utils/bodyScrollLock';

const ImportantNoticeModal = ({ isOpen, onClose, onContinue }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(); // Disable scroll when modal is open
    } else {
      enableBodyScroll(); // Enable scroll when modal is closed
    }

    // Cleanup function to re-enable scroll when the component unmounts
    return () => {
      enableBodyScroll();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
      <div className="bg-white rounded-lg max-w-[57rem] w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-[24px] font-semibold mb-4">Important Notice – Please Read Before Applying</h2>
        
        <div className="text-sm text-[#5E5E5E] space-y-4 mb-6 font-normal">
          <p>
            At TechVinson AR, our offer paid training courses in Product Management, Product Design, 
            and Software Development, and UX Design. Each training offers more than a basic overview 
            of the concepts. To ensure that we maximize the output of our training, we require all applicants 
            to meet the following prerequisites before applying:
          </p>

          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-[#FFF8EC] text-[#D58A00] text-[24px] font-bold text-center rounded-full mr-4 flex items-center justify-center">
                1
            </div>
            <div>
                <h3 className="font-bold text-[#001533] text-[16px]">Prior Knowledge & Experience Required</h3>
                <p className='mb-5 text-[#5E5E5E] text-[14px] font-normal'>
                Our paid courses are not for complete beginners. To ensure that all students can keep up with the pace and depth of the training, we require that applicants have some prior knowledge and experience in the subject area they are applying for.
                </p>
                <p className='mb-5 text-[#5E5E5E] text-[14px] font-normal'>
                Our courses are designed to enhance and advance existing knowledge, rather than introduce foundational concepts from scratch. If you are new to the field or a complete beginner, we recommend starting with a foundational course elsewhere before applying.
                </p>
            </div>
            </div>

            <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-[#FFF8EC] text-[#D58A00] text-[24px] font-bold text-center rounded-full mr-4 flex items-center justify-center">
                2
            </div>
            <div>
                <h3 className="font-bold text-[#001533] text-[16px]">Computer Literacy is Mandatory</h3>
                <p>All training sessions are conducted remotely, and students must be able to:</p>
                <ul className="list-inside space-y-1 mt-1">
                <li className="flex items-start text-[14px] font-semibold">
                    <span className="text-[#5E5E5E] mr-2">✓</span>
                    <span>Use a computer efficiently for learning, research, and assignments.</span>
                </li>
                <li className="flex items-start text-[14px] font-semibold">
                    <span className="text-[#5E5E5E] mr-2">✓</span>
                    <span>Navigate online learning platforms, video conferencing tools, and collaboration tools.</span>
                </li>
                <li className="flex items-start text-[14px] font-semibold">
                    <span className="text-[#5E5E5E] mr-2">✓</span>
                    <span>Follow structured learning in a fast-paced environment.</span>
                </li>
                </ul>
            </div>
            </div>

            <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-[#FFF8EC] text-[#D58A00] text-[24px] font-bold text-center rounded-full mr-4 flex items-center justify-center">
                3
            </div>
            <div>
                <h3 className="font-bold text-[#001533] text-[16px]">No Refunds After Enrollment</h3>
                <p className='mb-5 text-[#5E5E5E] text-[14px] font-normal'>
                Once enrolled, no refunds will be issued if a student finds the course too difficult due to a lack of prior knowledge. We highly encourage prospective students to carefully evaluate their readiness before applying.
                </p>
            </div>
            </div>

            <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-8 h-8 bg-[#FFF8EC] text-[#D58A00] text-[24px] font-bold text-center rounded-full mr-4 flex items-center justify-center">
                4
            </div>
            <div>
                <h3 className="font-bold text-[#001533] text-[16px]">Confirmation of Readiness</h3>
                <p className='mb-5 text-[#5E5E5E] text-[14px] font-normal'>
                By proceeding with the application, you confirm that you meet the prerequisites and that you understand the conditions outlined above.
                </p>
            </div>
            </div>

            <div className="flex items-start mb-6">
            <input
                type="checkbox"
                id="confirmReadiness"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mt-1 mr-2 w-[24px] h-[24px]  rounded-lg border-2 border-[#757575]"
            />
            <label htmlFor="confirmReadiness" className="text-sm">
                I acknowledge and confirm that I meet the requirements and understand the terms of enrollment.
            </label>
            </div>                    
        </div>
        
        <div className="flex justify-start space-x-4">
        <button
            onClick={onContinue}
            disabled={!isChecked}
            className={`px-4 py-2 ${
              isChecked ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-[#E3E3E3] text-[#ACACAC]  cursor-not-allowed'
            } rounded-lg text-[16px] font-semibold`}
          >
            Continue to Apply
          </button>
          <button
            onClick={onClose}
            className="px-4 py-4 border border-[#C8C8C8] text-[#0C8CE9] rounded-lg text-[16px] font-semibold hover:bg-gray-[#ACACAC]"
          >
            Cancel
          </button>         
        </div>
      </div>
    </div>
  );
};

export default ImportantNoticeModal;