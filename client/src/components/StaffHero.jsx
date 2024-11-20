import React from 'react'
import staffauagment2 from '../assets/staffauagment2.png';
import { Link, useLocation } from 'react-router-dom';
import {  HiOutlineComputerDesktop, HiCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineUsers} from 'react-icons/hi2';



const StaffHero = () => {
  const location = useLocation();
  
  const services = [
    {
      id: 'it-training',
      title: 'IT Training',
      icon: HiOutlineComputerDesktop,
      path: '/services',
      description: ' At Tecvinson, we offer professional training courses in various fields. Our courses are designed to equip participants with industry-ready skills in a matter of months.'
    },
    {
      id: 'solutions',
      title: 'Solutions & Product Development',
      icon: HiCodeBracket,
      path: '/solutions',      
    },
    {
      id: 'consultancy',
      title: 'IT Consultancy',
      icon: HiOutlineChatBubbleLeftRight ,
      path: '/consultancy',      
    },
    {
      id: 'staff',
      title: 'Staff Augmentation',
      icon: HiOutlineUsers,
      path: '/staff-augment',      
    }
  ];
  
  // Define sub-tabs
  const subTabs = [
    { title: 'Product Management', path: '/product-management' },
    { title: 'Software Development', path: '/development' },
    { title: 'Product Design', path: '/product-design' },
    { title: 'Job Readiness', path: '/job-readiness' },
  ];

  // Check if the current path matches any of the sub-tab paths
  const isSubTabPath = ['/product-management', '/development', '/product-design', '/job-readiness'].includes(
    location.pathname
  );


  return (
    <>
      {/* Navigation Tabs Section */}
      <div className="bg-white border-b border-t-2 pt-6 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
            {/* Gradient indicators for scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />
            
            {/* Scrollable container */}
            <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="w-max min-w-full flex">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className={`flex items-center gap-2 px-6 py-3 whitespace-nowrap text-center font-medium
                        transition-colors duration-200 border-2 mb-6 mr-6 rounded-xl
                      ${location.pathname.startsWith(service.path)
                        ? 'border-blue-500 text-blue-500 bg-blue-50'
                        : 'border-gray-300 text-gray-500 hover:text-gray-800 hover:border-gray-400'
                      }
                    `}
                  >
                    <span className={`text-xl ${location.pathname.startsWith(service.path) ? 'text-brandprimary' : 'text-gray-400'}`}>
                      {React.createElement(service.icon)}
                    </span>
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Section */}
      {isSubTabPath && (
        <div className="bg-white border-b border-t-2 pt-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative">
              {/* Gradient indicators for scroll */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />

              {/* Scrollable container */}
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-max min-w-full flex space-x-6">
                  {subTabs.map((tab) => (
                    <Link
                      key={tab.path}
                      to={tab.path}
                      className={`px-6 py-3 font-medium text-sm border-b-2 
                        ${
                          location.pathname === tab.path
                            ? 'text-blue-500 border-brandprimary'
                            : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300'
                        }
                      `}
                    >
                      {tab.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div 
          className="w-full h-[300px] md:h-[500px] bg-cover bg-[center_20%]"
          style={{ backgroundImage: `url(${staffauagment2})` }}
        />

        {/* Offset Overlay Content */}
      <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl  w-full text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#DFFFE8]  p-3 rounded-lg w-10 h-10">
            <HiOutlineUsers />
            </div>
            <h2 className="text-xl font-semibold">Staff Augmentation Services</h2>
          </div>
          <p className="text-gray-700">
          At Tecvinson, we offer Staff Augmentation Services designed to provide flexible, high-quality resources to support your business. Whether you need help with a short-term project or are looking for long-term expertise, our pool of skilled professionals—trained through our platform—can be tailored to meet the specific needs of your company.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default StaffHero