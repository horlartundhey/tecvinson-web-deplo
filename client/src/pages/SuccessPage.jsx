import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full sm:w-96">
        <h1 className="text-6xl font-bold text-yellow-600 mb-4">Payment Canceled</h1>
        <p className="text-2xl text-gray-800 mb-6">
         Hurray ! Your payment was Successful.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          You have scuccefully paid for this course and a representative will reach out to you
        </p>
        <a 
          href="/about-us" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          About us
        </a>        
      </div>
    </div>
  );
};

export default SuccessPage;
