import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';


const ContactUs = () => {
    
    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        service: '',
        note: ''
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
      };

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };


  return (
    <>
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
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Send an Email</h3>
                <p className="text-gray-600">info@tecvinson.com</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+46 703 699 614</p>
            </div>

            {/* Visit Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
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

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    FULL NAME <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    EMAIL ADDRESS <span className="text-red-500">*</span>
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    PHONE NUMBER
                    </label>
                    <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="XXX XXX XXX XXX"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                </div>

                {/* Company Name */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    COMPANY NAME (OPTIONAL)
                </label>
                <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                {/* Service of Interest */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    SERVICE OF INTEREST <span className="text-red-500">*</span>
                </label>
                <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">Select a service of interest</option>
                    <option value="training">IT Training</option>
                    <option value="consulting">IT Consulting</option>
                    <option value="development">Product Development</option>
                    <option value="staffing">Staff Augmentation</option>
                </select>
                </div>

                {/* Additional Note */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    ADDITIONAL NOTE (OPTIONAL)
                </label>
                <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Leave a note..."
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
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
<Footer />
</>
  )
}

export default ContactUs