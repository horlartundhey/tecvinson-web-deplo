import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';
import SectionWithScroll from '../components/SectionWithScroll';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import countryList from 'react-select-country-list';
import { ToastContainer, toast } from 'react-toastify';
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState('');
  const [note, setNote] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({ value: 'se' });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
  });

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
    Object.values(newErrors).forEach((error) => {
      if (error) toast.error(error);
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        toast.success('Your message has been sent successfully, we will get in touch with you shortly!');
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
        if (error.response.status === 400 || error.response.status === 422) {
          const errorMessages = Object.values(error.response.data.errors || {});
          toast.error(`Validation Error: ${errorMessages.join(', ') || 'Please correct the form.'}`);
        } else {
          toast.error(
            error.response?.data?.message ||
            `Server error: ${error.response.statusText || 'An error occurred.'}`
          );
        }
      } else if (error.request) {
        toast.error('Network error: Unable to reach the server. Please try again later.');
      } else {
        toast.error(`Unexpected error: ${error.message || 'Please try again later.'}`);
      }
    }
  };

  return (
    <>
      <SectionWithScroll>
      <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>
      <div className='lg:w-full w-full max-w-[90rem] mx-auto px-4'>
        <h3 className='font-semibold text-[20px]'>
          CONTACT US
        </h3>
        <h1 className='text-[40px] font-semibold'>
            Feel free to reach out to us
        </h1>         

          <div className="flex flex-col lg:flex-row gap-8 mb-16 mt-8">
            {/* Contact Information Cards */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Send an Email</h3>
                <p className="text-gray-600">info@tecvinson.com</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+46 703 699 614</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#07548C]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">Rudhögsgatan 10B, 21231 Malmö, Sweden</p>
              </div>

              {/* Social Links */}
              <div className="">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className='flex space-x-4 mt-2'>
                  {/* Social Icons - replace with actual icons */}
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4'>
                    <a href='https://linkedin.com/company/tecvinsonab/' target='_blank' className='text-gray-600  text-[20px] hover:text-gray-800'><FaLinkedin /></a>
                  </div>

                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4'>
                    <a href='#' target='_blank' className='text-gray-600 text-[20px]  hover:text-gray-800'><FaInstagram /></a>
                  </div>
                  <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4'>
                    <a href='#'  target='_blank' className='text-gray-600 text-[20px] hover:text-gray-800'><FaXTwitter /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Request a Callback</h2>
              <p className="text-gray-600 mb-8">
                Fill out this form, and we will get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FULL NAME <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-md focus:border-[#0C8CE9] ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@domain.com"
                      className={`w-full px-4 py-2 border rounded-md focus:border-[#0C8CE9] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PHONE NUMBER <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country={selectedCountry.value.toLowerCase()}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputStyle={{
                        width: '100%',
                        height: '42px',
                        padding: '8px 8px 8px 60px',
                        borderRadius: '6px'
                      }}
                      containerStyle={{
                        width: '100%'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-2 border rounded-md focus:border-[#0C8CE9]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SERVICE OF INTEREST <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "IT Training",
                      "Solutions & Product Development",
                      "IT Consultancy",
                      "Staff Augmentation",
                      "Internship Opportunity",
                    ].map((option) => (
                      <label
                        key={option}
                        className={`flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-all duration-200 
                          ${service === option ? "border-[#0C8CE9] text-[#0C8CE9] font-semibold" : "border-gray-300 text-gray-700"}`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={option}
                          checked={service === option}
                          onChange={(e) => setService(e.target.value)}
                          className="text-blue-600 focus:ring-[#0C8CE9]"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ADDITIONAL NOTE
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Leave a note..."
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-1/3 bg-[#0C8CE9] text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>            
            
          </div>

          <div className="mb-14">
            <h3 className="font-semibold text-[20px] mb-4">
              MAP LOCATION
            </h3>
            <h1 className="text-[40px] font-semibold mb-6">
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
              />
            </div>
          </div>
        </div>      
        </div>  
      </SectionWithScroll>
      
      <ToastContainer 
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
      />
      <Footer />
    </>
  );
};

export default ContactUs;