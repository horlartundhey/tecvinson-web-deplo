import React, { useState, useEffect } from 'react';
import about from '../assets/About-us.png';
import vision from '../assets/vision.png';
import mission from '../assets/mission.png';
import strategy from '../assets/strategy.png';
import BodyContainer from '../components/BodyContainer';
import Footer from '../components/Footer';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('about');

  const handleScroll = () => {
    const sections = ['about', 'vision', 'mission', 'strategy'];
    const scrollPosition = window.scrollY + 100; // Adding a small offset to trigger before reaching the section
    for (let section of sections) {
      const element = document.getElementById(section);
      if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
        setActiveSection(section);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <nav className="mb-20 sticky top-0 w-full py-10 px-3 bg-white z-10 shadow-sm">
          <ul className="flex space-x-8">
            <li>
              <a
                href="#about"
                className={`text-gray-500 hover:text-gray-700 ${activeSection === 'about' ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : ''}`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#vision"
                className={`text-gray-500 hover:text-gray-700 ${activeSection === 'vision' ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : ''}`}
              >
                Vision
              </a>
            </li>
            <li>
              <a
                href="#mission"
                className={`text-gray-500 hover:text-gray-700 ${activeSection === 'mission' ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : ''}`}
              >
                Mission
              </a>
            </li>
            <li>
              <a
                href="#strategy"
                className={`text-gray-500 hover:text-gray-700 ${activeSection === 'strategy' ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : ''}`}
              >
                Strategy
              </a>
            </li>
          </ul>
        </nav>

        {/* About Us Section */}
        <section id="about" className="mb-32">
          <div className="relative flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/2">
              <img
                src={about}
                alt="Team collaborating"
                className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 lg:absolute lg:right-0 lg:top-12 lg:w-[60%] w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Tecvinson is a dynamic and innovative for-profit organization based in Sweden,
                committed to delivering exceptional IT Training, Solutions and Product
                Development, IT Consultancy, and Staff Augmentation services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At Tecvinson AB, we foster a culture of togetherness, playfulness, and simplicity.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="mb-32">
          <div className="relative flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/2 lg:ml-auto">
              <img
                src={vision}
                alt="Person with VR headset"
                className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 lg:absolute lg:left-0 lg:top-12 lg:w-[60%] w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to be a global leader in the IT industry, recognized for excellence,
                sustainability, and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="mb-32">
          <div className="relative flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/2">
              <img
                src={mission}
                alt="Team collaborating"
                className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 lg:absolute lg:right-0 lg:top-12 lg:w-[60%] w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Mission</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is to empower individuals, businesses, and governments with cutting-edge IT solutions and services.
              </p>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="mb-32">
          <div className="relative flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/2 lg:ml-auto">
              <img
                src={strategy}
                alt="Person with VR headset"
                className="rounded-lg object-cover w-full h-[400px] lg:h-[500px]"
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 lg:absolute lg:left-0 lg:top-12 lg:w-[60%] w-[95%] -mt-16 mx-auto lg:mt-0 lg:mx-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Strategy</h2>
              <p className="text-gray-600 leading-relaxed">
                Tecvinson’s strategy is to leverage our expertise in IT to become a trusted partner for clients worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
      <BodyContainer />
      <Footer />
    </>
  );
};

export default AboutUs;
