import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  HiOutlineComputerDesktop, HiCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineUsers} from 'react-icons/hi2';

import servicesHero from '../assets/Serviceshero.png';

const ServiceHero = () => {
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
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative">
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
                    <span className={`text-xl ${location.pathname.startsWith(service.path) ? 'text-blue-500' : 'text-gray-400'}`}>
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
        <div className="bg-gray-50 border-b pt-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex space-x-6">
              {subTabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-6 py-3 font-medium text-sm border-b-2 
                    ${
                      location.pathname === tab.path
                        ? 'text-blue-500 border-blue-500'
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
      )}

      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div
          className="w-full h-[300px] md:h-[500px] bg-cover bg-center"
          style={{ backgroundImage: `url(${servicesHero})` }}
        />

        {/* Content Section */}
        <div className="relative mx-auto px-[20px] lg:px-[150px]" style={{ marginTop: '-100px' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#D2F8FF] p-3 rounded-lg w-10 h-10">
              <HiOutlineComputerDesktop />
            </div>
            <h2 className="text-xl font-semibold">Professional IT Training Courses</h2>
          </div>
          <p className="text-gray-700">
            At Tecvinson, we offer professional training courses in various fields. Our courses are designed to equip participants with industry-ready skills in a matter of months.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ServiceHero;
