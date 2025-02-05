import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa6';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ApplicationModal = ({ isOpen, onClose, courseData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    // preferredStartDate: '',
    currentExperienceLevel: '',
    timezone: '',
    reasonForInterest: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Clear error when user types
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
    setErrors((prev) => ({
      ...prev,
      phoneNumber: '', // Clear error when user types
    }));
  };

  // const redirectToStripe = async () => {
  //   try {
  //     if (!courseData?.title || !courseData?.cost || !courseData?.category) {
  //       throw new Error('Incomplete course data for payment');
  //     }

  //     const response = await fetch('/api/create-checkout-session', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({          
  //         courseTitle: courseData.title,
  //         amount: courseData.cost,
  //         category: courseData.category,
  //         currency: 'usd',
  //         customerEmail: formData.email,
  //         customerName: formData.fullName,
  //       }),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //     }
  
  //     const session = await response.json();
  //     window.location.href = session.url;
  //   } catch (error) {
  //     console.error('Error creating checkout session:', error);
  //     setErrors(prev => ({
  //       ...prev,
  //       apiError: 'Failed to create checkout session. Please try again.',
  //     }));
  //   }
  // };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email.';
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10)
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    if (!formData.currentExperienceLevel)
      newErrors.currentExperienceLevel = 'Please select your experience level.';
    if (!formData.timezone) newErrors.timezone = 'Please select your timezone.';
    if (!formData.reasonForInterest.trim())
      newErrors.reasonForInterest = 'Please tell us why you are interested in this course.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Enhanced validation for courseData
    const requiredCourseFields = ['title', 'category', 'cost'];
    const missingFields = requiredCourseFields.filter(field => !courseData?.[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required course data fields:', missingFields);
      setErrors(prev => ({
        ...prev,
        apiError: `Missing required course information: ${missingFields.join(', ')}`
      }));
      setLoading(false);
      return;
    }

    const requestData = {
      ...formData,
      courseTitle: courseData.title,
      category: courseData.category,
      courseCost: courseData.cost,      
    };

    // Log the data being sent
    console.log('Data being sent:', requestData);

    try {
      const response = await fetch('http://localhost:5000/api/save-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout using the URL from the response
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors(prev => ({
        ...prev,
        apiError: error.message || 'Failed to submit application. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg max-w-2xl w-full p-6 relative flex flex-col"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
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

        <div className="overflow-y-auto max-h-full">
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
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PHONE NUMBER <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country="us"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                inputStyle={{
                  width: '100%',
                  padding: '12px',
                  border: errors.phoneNumber ? '1px solid red' : '1px solid #d1d5db',
                  borderRadius: '4px',
                  paddingLeft: '60px',
                }}
                containerStyle={{
                  width: '100%',
                }}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
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
                disabled={loading} // Disable button when loading
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center"
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  'Submit and Make Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
