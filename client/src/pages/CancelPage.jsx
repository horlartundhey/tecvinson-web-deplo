import React from 'react';

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white shadow-lg rounded-lg p-10 w-full sm:w-96">
        <h1 className="text-6xl font-bold text-yellow-600 mb-4">Payment Canceled</h1>
        <p className="text-2xl text-gray-800 mb-6">
          Oops! Your payment was not completed.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          It seems that you have canceled the payment process. If this was a mistake, please try again.
        </p>
        <a 
          href="/services" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Services and choose the course you want to pay for
        </a>
        <p className="mt-4 text-sm text-gray-500">
          If you need assistance, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
