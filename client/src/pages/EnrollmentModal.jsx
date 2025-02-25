import React from 'react';

const EnrollmentModal = ({ isOpen, onClose, application }) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"> {/* Added overflow-y-auto */}
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-lg max-h-[90vh] overflow-y-auto"> {/* Added max-h and overflow */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-800">Enrolment Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <div className="p-6"> {/* Removed bg-white and shadow here */}

          {/* User Details Section */}
          <div className="mb-8 bg-gray-100 rounded-lg p-6 shadow-inner">
            <h3 className="text-lg mb-5 font-bold">User Details</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">FULL NAME:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.name}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">EMAIL ADDRESS:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.email}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">PHONE NUMBER:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.phone}</dd>
              </div>
            </div>
          </div>

          {/* Application Details Section */}
          <div className="mb-8 bg-gray-100 rounded-lg p-6 shadow-inner">
            <h3 className="text-base mb-5 font-bold">Application Details</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">CATEGORY:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.category || "-"}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">COURSE OF INTEREST:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.course || "-"}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">CURRENT EXPERIENCE LEVEL:</dt>
                <dd className="w-2/3 text-[16px] font-bold">
                  {application.currentExperienceLevel && application.currentExperienceLevel.trim() !== ''
                    ? application.currentExperienceLevel
                    : '-'}
                </dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">TIME ZONE:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.timezone || 'GMT-12:00'}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">PAYMENT STATUS:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.status || "-"}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">YEAR:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.year || "-"}</dd>
              </div>
              <div className="flex items-start">
                <dt className="w-1/3 text-sm font-medium text-gray-500">COHORT:</dt>
                <dd className="w-2/3 text-[16px] font-bold">{application.cohort?.name || application.cohort || "-"}</dd>
              </div>
            </div>
          </div>

          {/* Reason for Interest Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
            <h3 className="text-base font-bold mb-5">Reason for Interest</h3>
            <div className="prose prose-sm max-w-none">
              <p>
                {application.reasonForInterest && application.reasonForInterest.trim() !== ''
                  ? application.reasonForInterest
                  : 'No reason provided'}
              </p>
            </div>
          </div>

        </div>

        <div className="flex justify-end p-4 border-t bg-gray-100 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white text-blue-500 rounded-lg border hover:bg-blue-50 hover:text-blue-700 transition duration-300 ease-in-out font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;