import React, { useState } from 'react';
import { X } from 'lucide-react';

const ApplicationModal = ({ isOpen, onClose, courseData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredStartDate: '',
    currentExperienceLevel: '',
    timezone: '',
    reasonForInterest: ''
  });

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Professional'
  ];

  const timezones = [
    'GMT-12:00', 'GMT-11:00', 'GMT-10:00', 'GMT-09:00', 'GMT-08:00',
    'GMT-07:00', 'GMT-06:00', 'GMT-05:00', 'GMT-04:00', 'GMT-03:00',
    'GMT-02:00', 'GMT-01:00', 'GMT+00:00', 'GMT+01:00', 'GMT+02:00',
    'GMT+03:00', 'GMT+04:00', 'GMT+05:00', 'GMT+06:00', 'GMT+07:00',
    'GMT+08:00', 'GMT+09:00', 'GMT+10:00', 'GMT+11:00', 'GMT+12:00'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const redirectToStripe = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseTitle: courseData.title,
          amount: courseData.cost,
          currency: 'usd',
          customerEmail: formData.email,
          customerName: formData.fullName
        }),
      });

      const session = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }
  
    try {
      const response = await fetch('https://tecvinson-web-server.vercel.app/api/save-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          courseTitle: courseData.title,
          courseCost: courseData.cost,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Unknown error');
      }
  
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe payment
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Professional IT Training Application Form</h2>

        <div className="mb-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Enrollment Process:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Application: Interested participants fill out the application form.</li>
            <li>Entry Test: After applying, participants need to pass a test to confirm their understanding of the course</li>
            <li>Payment: Once the test is passed, participants can make payment.</li>
            <li>Course Start: Training will commence as per the schedule.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course of Interest
            </label>
            <input
              type="text"
              value={courseData.title}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Experience Level *
              </label>
              <select
                name="currentExperienceLevel"
                value={formData.currentExperienceLevel}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Zone *
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select time zone</option>
                {timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Why are you interested in this course? *
            </label>
            <textarea
              name="reasonForInterest"
              value={formData.reasonForInterest}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              placeholder="Tell us why you're interested in taking this course"
            />
          </div>
          

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Submit and Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
