import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa6';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import generateCohorts from './cohortmanager';
import { disableBodyScroll, enableBodyScroll } from './utils/bodyScrollLock';

// Map of countries to their primary timezone
const countryTimezoneMap = {
  'Afghanistan': 'GMT+04:30',
  'Albania': 'GMT+01:00',
  'Algeria': 'GMT+01:00',
  'Andorra': 'GMT+01:00',
  'Angola': 'GMT+01:00',
  'Antigua and Barbuda': 'GMT-04:00',
  'Argentina': 'GMT-03:00',
  'Armenia': 'GMT+04:00',
  'Australia': 'GMT+10:00', // Using Sydney as default
  'Austria': 'GMT+01:00',
  'Azerbaijan': 'GMT+04:00',
  'Bahamas': 'GMT-05:00',
  'Bahrain': 'GMT+03:00',
  'Bangladesh': 'GMT+06:00',
  'Barbados': 'GMT-04:00',
  'Belarus': 'GMT+03:00',
  'Belgium': 'GMT+01:00',
  'Belize': 'GMT-06:00',
  'Benin': 'GMT+01:00',
  'Bhutan': 'GMT+06:00',
  'Bolivia': 'GMT-04:00',
  'Bosnia and Herzegovina': 'GMT+01:00',
  'Botswana': 'GMT+02:00',
  'Brazil': 'GMT-03:00', // Using Brasilia as default
  'Brunei': 'GMT+08:00',
  'Bulgaria': 'GMT+02:00',
  'Burkina Faso': 'GMT+00:00',
  'Burundi': 'GMT+02:00',
  'Cabo Verde': 'GMT-01:00',
  'Cambodia': 'GMT+07:00',
  'Cameroon': 'GMT+01:00',
  'Canada': 'GMT-05:00', // Using Eastern Time as default
  'Central African Republic': 'GMT+01:00',
  'Chad': 'GMT+01:00',
  'Chile': 'GMT-04:00',
  'China': 'GMT+08:00',
  'Colombia': 'GMT-05:00',
  'Comoros': 'GMT+03:00',
  'Congo': 'GMT+01:00',
  'Costa Rica': 'GMT-06:00',
  'Croatia': 'GMT+01:00',
  'Cuba': 'GMT-05:00',
  'Cyprus': 'GMT+02:00',
  'Czech Republic': 'GMT+01:00',
  'Denmark': 'GMT+01:00',
  'Djibouti': 'GMT+03:00',
  'Dominica': 'GMT-04:00',
  'Dominican Republic': 'GMT-04:00',
  'Ecuador': 'GMT-05:00',
  'Egypt': 'GMT+02:00',
  'El Salvador': 'GMT-06:00',
  'Equatorial Guinea': 'GMT+01:00',
  'Eritrea': 'GMT+03:00',
  'Estonia': 'GMT+02:00',
  'Eswatini': 'GMT+02:00',
  'Ethiopia': 'GMT+03:00',
  'Fiji': 'GMT+12:00',
  'Finland': 'GMT+02:00',
  'France': 'GMT+01:00',
  'Gabon': 'GMT+01:00',
  'Gambia': 'GMT+00:00',
  'Georgia': 'GMT+04:00',
  'Germany': 'GMT+01:00',
  'Ghana': 'GMT+00:00',
  'Greece': 'GMT+02:00',
  'Grenada': 'GMT-04:00',
  'Guatemala': 'GMT-06:00',
  'Guinea': 'GMT+00:00',
  'Guinea-Bissau': 'GMT+00:00',
  'Guyana': 'GMT-04:00',
  'Haiti': 'GMT-05:00',
  'Honduras': 'GMT-06:00',
  'Hungary': 'GMT+01:00',
  'Iceland': 'GMT+00:00',
  'India': 'GMT+05:30',
  'Indonesia': 'GMT+07:00', // Using Jakarta as default
  'Iran': 'GMT+03:30',
  'Iraq': 'GMT+03:00',
  'Ireland': 'GMT+00:00',
  'Israel': 'GMT+02:00',
  'Italy': 'GMT+01:00',
  'Jamaica': 'GMT-05:00',
  'Japan': 'GMT+09:00',
  'Jordan': 'GMT+02:00',
  'Kazakhstan': 'GMT+06:00', // Using Almaty as default
  'Kenya': 'GMT+03:00',
  'Kiribati': 'GMT+12:00',
  'Korea, North': 'GMT+09:00',
  'Korea, South': 'GMT+09:00',
  'Kosovo': 'GMT+01:00',
  'Kuwait': 'GMT+03:00',
  'Kyrgyzstan': 'GMT+06:00',
  'Laos': 'GMT+07:00',
  'Latvia': 'GMT+02:00',
  'Lebanon': 'GMT+02:00',
  'Lesotho': 'GMT+02:00',
  'Liberia': 'GMT+00:00',
  'Libya': 'GMT+02:00',
  'Liechtenstein': 'GMT+01:00',
  'Lithuania': 'GMT+02:00',
  'Luxembourg': 'GMT+01:00',
  'Madagascar': 'GMT+03:00',
  'Malawi': 'GMT+02:00',
  'Malaysia': 'GMT+08:00',
  'Maldives': 'GMT+05:00',
  'Mali': 'GMT+00:00',
  'Malta': 'GMT+01:00',
  'Marshall Islands': 'GMT+12:00',
  'Mauritania': 'GMT+00:00',
  'Mauritius': 'GMT+04:00',
  'Mexico': 'GMT-06:00', // Using Mexico City as default
  'Micronesia': 'GMT+10:00',
  'Moldova': 'GMT+02:00',
  'Monaco': 'GMT+01:00',
  'Mongolia': 'GMT+08:00',
  'Montenegro': 'GMT+01:00',
  'Morocco': 'GMT+00:00',
  'Mozambique': 'GMT+02:00',
  'Myanmar': 'GMT+06:30',
  'Namibia': 'GMT+02:00',
  'Nauru': 'GMT+12:00',
  'Nepal': 'GMT+05:45',
  'Netherlands': 'GMT+01:00',
  'New Zealand': 'GMT+12:00',
  'Nicaragua': 'GMT-06:00',
  'Niger': 'GMT+01:00',
  'Nigeria': 'GMT+01:00',
  'North Macedonia': 'GMT+01:00',
  'Norway': 'GMT+01:00',
  'Oman': 'GMT+04:00',
  'Pakistan': 'GMT+05:00',
  'Palau': 'GMT+09:00',
  'Palestine': 'GMT+02:00',
  'Panama': 'GMT-05:00',
  'Papua New Guinea': 'GMT+10:00',
  'Paraguay': 'GMT-04:00',
  'Peru': 'GMT-05:00',
  'Philippines': 'GMT+08:00',
  'Poland': 'GMT+01:00',
  'Portugal': 'GMT+00:00',
  'Qatar': 'GMT+03:00',
  'Romania': 'GMT+02:00',
  'Russia': 'GMT+03:00', // Using Moscow as default
  'Rwanda': 'GMT+02:00',
  'Saint Kitts and Nevis': 'GMT-04:00',
  'Saint Lucia': 'GMT-04:00',
  'Saint Vincent and the Grenadines': 'GMT-04:00',
  'Samoa': 'GMT+13:00',
  'San Marino': 'GMT+01:00',
  'Sao Tome and Principe': 'GMT+00:00',
  'Saudi Arabia': 'GMT+03:00',
  'Senegal': 'GMT+00:00',
  'Serbia': 'GMT+01:00',
  'Seychelles': 'GMT+04:00',
  'Sierra Leone': 'GMT+00:00',
  'Singapore': 'GMT+08:00',
  'Slovakia': 'GMT+01:00',
  'Slovenia': 'GMT+01:00',
  'Solomon Islands': 'GMT+11:00',
  'Somalia': 'GMT+03:00',
  'South Africa': 'GMT+02:00',
  'South Sudan': 'GMT+03:00',
  'Spain': 'GMT+01:00',
  'Sri Lanka': 'GMT+05:30',
  'Sudan': 'GMT+02:00',
  'Suriname': 'GMT-03:00',
  'Sweden': 'GMT+01:00',
  'Switzerland': 'GMT+01:00',
  'Syria': 'GMT+02:00',
  'Taiwan': 'GMT+08:00',
  'Tajikistan': 'GMT+05:00',
  'Tanzania': 'GMT+03:00',
  'Thailand': 'GMT+07:00',
  'Timor-Leste': 'GMT+09:00',
  'Togo': 'GMT+00:00',
  'Tonga': 'GMT+13:00',
  'Trinidad and Tobago': 'GMT-04:00',
  'Tunisia': 'GMT+01:00',
  'Turkey': 'GMT+03:00',
  'Turkmenistan': 'GMT+05:00',
  'Tuvalu': 'GMT+12:00',
  'Uganda': 'GMT+03:00',
  'Ukraine': 'GMT+02:00',
  'United Arab Emirates': 'GMT+04:00',
  'United Kingdom': 'GMT+00:00',
  'United States': 'GMT-05:00', // Using Eastern Time as default
  'Uruguay': 'GMT-03:00',
  'Uzbekistan': 'GMT+05:00',
  'Vanuatu': 'GMT+11:00',
  'Vatican City': 'GMT+01:00',
  'Venezuela': 'GMT-04:00',
  'Vietnam': 'GMT+07:00',
  'Yemen': 'GMT+03:00',
  'Zambia': 'GMT+02:00',
  'Zimbabwe': 'GMT+02:00'
};

const ApplicationModal = ({ isOpen, onClose, courseData }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    courseOfInterest: '',
    year: new Date().getFullYear().toString(),
    cohort: '',
    currentExperienceLevel: '',
    timezone: '',
    reasonForInterest: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [cohorts, setCohorts] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);



  useEffect(() => {
    const availableCohorts = generateCohorts(parseInt(formData.year));
    setCohorts(availableCohorts);
    // Reset cohort when year changes
    setFormData(prev => ({
      ...prev,
      cohort: null
    }));
  }, [formData.year]);

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
  
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 
    'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 
    'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 
    'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 
    'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 
    'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 
    'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 
    'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 
    'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 
    'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 
    'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 
    'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 
    'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
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

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setFormData(prev => ({
      ...prev,
      year: newYear,
      cohort: '' // Clear cohort when year changes
    }));
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    
    // Get the corresponding timezone for the selected country
    const correspondingTimezone = countryTimezoneMap[selectedCountry] || '';
    
    setFormData(prev => ({
      ...prev,
      country: selectedCountry,
      timezone: correspondingTimezone
    }));
    
    setErrors(prev => ({
      ...prev,
      country: '',
      timezone: '' // Clear timezone error since we're setting it automatically
    }));
  };

  const handleCohortChange = (e) => {
    const cohortId = e.target.value;
    const selectedCohort = cohorts.find(c => c.id === cohortId);
  
    if (!selectedCohort || selectedCohort.isDisabled) {
      setErrors(prev => ({
        ...prev,
        cohort: 'This cohort is not available.'
      }));
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      cohort: {
        id: selectedCohort.id,
        name: selectedCohort.name,
        dateRange: selectedCohort.dateRange,
        fullName: selectedCohort.fullName
      }
    }));
  
    setErrors(prev => ({
      ...prev,
      cohort: ''
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Please enter a valid email.';
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10)
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    if (!formData.country.trim())
      newErrors.country = 'Please select your country.';
    if (!formData.cohort)
      newErrors.cohort = 'Please select a cohort.';
    if (!formData.currentExperienceLevel)
      newErrors.currentExperienceLevel = 'Please select your experience level.';
    if (!formData.timezone)
      newErrors.timezone = 'Please select your timezone.';
    if (!formData.reasonForInterest.trim())
      newErrors.reasonForInterest = 'Please tell us why you are interested in this course.';

    if (formData.cohort) {
      const selectedCohort = cohorts.find(c => c.id === formData.cohort);
      if (selectedCohort?.isDisabled) {
        newErrors.cohort = 'This cohort is not available.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      console.log('Validation failed', errors);
      return;
    }

    setLoading(true);

    try {
      // Ensure courseData exists and has required fields
      if (!courseData?.title || !courseData?.category || !courseData?.cost) {
        throw new Error('Missing required course information');
      }

      const requestData = {
        ...formData,
        courseTitle: courseData.title,
        category: courseData.category,
        courseCost: courseData.cost,
      };

      console.log('Sending application data:', requestData);

      // const response = await fetch('http://localhost:5000/api/save-application', {
      const response = await fetch('https://tecvinson-web-server.vercel.app/api/save-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe checkout
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
      <div
        className="bg-white rounded-lg max-w-[57rem] w-full p-6 relative flex flex-col"
        style={{
          maxHeight: '100vh',
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
          <form onSubmit={handleSubmit} className="space-y-6 pr-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TIME ZONE <span className="text-red-500">*</span>
                </label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select time zone</option>
                  {timezones.map(timezone => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                  ))}
                </select>
                {errors.timezone && <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  {Array.from({ length: 2 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cohort <span className="text-red-500">*</span>
                </label>
                <select
                  name="cohort"
                  value={formData.cohort?.id || ''}
                  onChange={handleCohortChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Cohort</option>
                  {cohorts.map((cohort) => (
                    <option
                      key={cohort.id}
                      value={cohort.id}
                      disabled={cohort.isDisabled}
                    >
                      {cohort.name} ({cohort.dateRange})
                    </option>
                  ))}
                </select>
                {errors.cohort && (
                  <p className="text-red-500 text-sm mt-1">{errors.cohort}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  CURRENT EXPERIENCE LEVEL <span className="text-red-500">*</span>
                </label>
                <select
                  name="currentExperienceLevel"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.currentExperienceLevel && <p className="text-red-500 text-sm mt-1">{errors.currentExperienceLevel}</p>}
              </div>
              {/* <div>
                <label className="block text-sm font-medium mb-1">
                  TIME ZONE <span className="text-red-500">*</span>
                </label>
                <select
                  name="timezone"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select time zone</option>
                  {timezones.map(timezone => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                  ))}
                </select>
                {errors.timezone && <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>}
              </div> */}
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
              {errors.reasonForInterest && <p className="text-red-500 text-sm mt-1">{errors.reasonForInterest}</p>}
            </div>

            {errors.apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.apiError}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 mb-4 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading} // Disable button when loading
                className="px-4 py-2 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center"
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