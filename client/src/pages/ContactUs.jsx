import React, { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';
import SectionWithScroll from '../components/SectionWithScroll';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const ContactUs = () => {
    
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
  });

  const countryOptions = countryList().getData();

  const validate = () => {
    let isValid = true;
    const newErrors = {};
  
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
      isValid = false;
    }
    if (!service.trim()) {
      newErrors.service = 'Please select a service of interest.';
      isValid = false;
    }
  
    setErrors(newErrors);
  
    // Display toast for each validation error
    Object.keys(newErrors).forEach((key) => {
      toast.error(newErrors[key]);
    });
  
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
        return; // Validation errors will already be displayed via toast
    }

    try {
        const response = await axios.post('https://tecvinson-web-server.vercel.app/api/contact', {
            fullName,
            email,
            phone,
            companyName,
            service,
            note,
        });

        if (response.status === 200) {
            toast.success('Message sent successfully!');
            // Reset form fields and errors after success
            setFullName('');
            setEmail('');
            setPhone('');
            setCompanyName('');
            setService('');
            setNote('');
            setErrors({});
        }
    } catch (error) {
        if (error.response) {
            // Backend errors, such as validation errors (400, 422, etc.)
            if (error.response.status === 400 || error.response.status === 422) {
                const errorMessages = Object.values(error.response.data.errors || {});
                toast.error(`Validation Error: ${errorMessages.join(', ') || 'Please correct the form.'}`);
            } else {
                // Generic error response from the backend
                toast.error(
                    error.response?.data?.message || 
                    `Server error: ${error.response.statusText || 'An error occurred.'}`
                );
            }
        } else if (error.request) {
            // No response received (could be network issue or CORS error)
            toast.error('Network error: Unable to reach the server. Please try again later.');
        } else {
            // Other types of errors (e.g., error in setting up the request)
            toast.error(`Unexpected error: ${error.message || 'Please try again later.'}`);
        }
    }
};

  


  return (
    <>
    <SectionWithScroll>
    <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>
      <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
        <h3 className='font-semibold text-[20px]'>
          CONTACT US
        </h3>
        <h1 className='text-[40px] font-semibold'>
            Feel free to reach out to us
        </h1>   

        <div className="lg:w-full w-full">

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Send an Email</h3>
                <p className="text-gray-600">info@tecvinson.com</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+46 703 699 614</p>
            </div>

            {/* Visit Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-start text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">Rudhögsgatan 10B, 21231 Malmö, Sweden</p>
            </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <p className="text-center text-gray-600 mb-8">
                Fill out the form below, and we will get back to you promptly.
            </p>

            
            {/* {status && <p className="text-red mb-4">{status}</p>} */}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@domain.com"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PHONE NUMBER <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={selectedCountry ? selectedCountry.value.toLowerCase() : 'us'}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      placeholder="Enter phone number"
                      inputStyle={{
                        width: '100%',
                        padding: '12px',
                        border: errors.phone ? '1px solid red' : '1px solid #d1d5db',
                        borderRadius: '4px',
                        paddingLeft: '60px',
                      }}
                      containerStyle={{
                        width: '100%',
                      }}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                {/* Company Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    COMPANY NAME <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SERVICE OF INTEREST <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.service ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  >
                    <option value="">Select a service of interest</option>
                    <option value="training">IT Training</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="development">Product Development</option>
                    <option value="staffing">Staff Augmentation</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>

                {/* Additional Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ADDITIONAL NOTE (OPTIONAL)
                  </label>
                  <textarea
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Leave a note..."
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!fullName || !email || !phone || !service}
                    className={`w-full py-2 px-4 rounded-md text-white ${
                        !fullName || !email || !phone || !service
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    >
                    Submit
                    </button>
              </form>           
            </div>
            </div>        
      </div>                
    </div>
    {/* Map location */}
    <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6 lg:px-[150px] px-[20px] mb-14'>
    <h3 className='font-semibold text-[20px]'>
        MAP LOCATION
    </h3>
    <h1 className='text-[40px] font-semibold'>
        Visit Our Office
    </h1> 

    <div className="w-full h-[500px] lg:h-[600px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d609.0465138060981!2d13.062581199162826!3d55.592645359867404!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a186e74062e3%3A0x6cabbb9302e2f90!2sRudh%C3%B6gsgatan%2010B%2C%20212%2031%20Malm%C3%B6%2C%20Sweden!5e0!3m2!1sen!2sng!4v1730631221477!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full rounded-md"
        ></iframe>
      </div>

</div>
</SectionWithScroll>
    {/* <ToastContainer 
      position="top-right" 
      autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
      theme="light"
    /> */}
<Footer />
</>
  )
}

export default ContactUs