import React from 'react';
import Default from '@/assets/Default.png';
import ava2 from '@/assets/Avatar2.png';
import ava3 from '@/assets/Avatar3.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const Testimonial = () => {

  const sliderRef = React.useRef(null);

  // Custom handler for the arrows to control the slider
  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  // Slider settings with custom dots and shared arrow container
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,    
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: '-50px',
          width: '100%',
        }}
      >
        {/* Dots on the left */}
        <div
          style={{
            display: 'flex',
            gap: '0px',
            backgroundColor: '#ffffff',
            padding: '5px 0',
            borderRadius: '10px',
          }}
        >
          {dots}
        </div>
        {/* Arrows on the right */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={handlePrevClick}
            className="text-gray-700 hover:text-gray-900 bg-white p-4 rounded-full shadow-md "
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={handleNextClick}
            className="text-gray-700 hover:text-gray-900 bg-white p-4 rounded-full shadow-md"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          display: 'inline-block',
          backgroundColor: i === sliderRef?.current?.innerSlider?.state?.currentSlide ? '#007bff' : '#c4c4c4',
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1366, // iPad Pro and similar large tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Mobile and smaller tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  };
  

  return (
    <div className='w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>
        <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
              TESTIMONIALS
            </h3>
            <h1 className='text-[40px] font-semibold'>
                Our clients’ success stories
            </h1>            

            <div className='w-full py-[10px] relative'>
            <Slider ref={sliderRef} {...settings} className="w-full">
            <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-base italic leading-relaxed text-[#5E5E5E] mb-4">
                    "In the financial services sector, precision and reliability are non-negotiable. Tecvinson AB has provided Core Credit Investment with unparalleled IT consultancy and product development services, enabling us to serve our customers with cutting-edge technology solutions. Their attention to detail and innovative spirit set them apart."
                    </p>
                    <div className="flex items-center mt-4">
                      <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold text-base">Femi Shadamoro</p>
                        <p className="text-sm text-gray-500">CEO Core Credit Investment Company Limited Nigeria</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "Tecvinson AB has been a vital partner in our mission to empower African professionals and enhance digital financial solutions. Their custom-tailored IT solutions have not only strengthened AfriProEdu’s educational platform but also optimized the operational capabilities of AfriPay. They understand the nuances of our vision and bring it to life with exceptional expertise."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">John Samuel</p>
                        <p className="text-sm text-gray-500">CEO/Founder AfriProEdu and AfriPay Finland</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "At Redi-School of Integration, technology bridges the gap between communities, and Tecvinson AB has been our go-to partner for innovative IT solutions. Their ability to create impactful, user-friendly platforms has significantly enhanced our outreach and integration programs. Their team is dedicated, responsive, and a pleasure to work with."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Felix Onogwu</p>
                        <p className="text-sm text-gray-500">CEO Redi-School of Integration Malmö</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl  w-full h-[500px]       // Default height for desktop
            md:h-[450px]    // Taller height for tablets
            sm:h-[350px]    // Slightly reduced height for smaller tablets
            xs:h-[300px]    // Even smaller height for mobile
            overflow-hidden  border-2 border-solid border-[#E3E3E3]">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "Working with Tecvinson AB has been a game-changer for Nordic Bridge Partner AB. Their deep understanding of integration platforms and seamless data solutions has enabled us to streamline our operations and enhance client satisfaction. Their innovative approach and commitment to excellence make them an invaluable partner in our digital transformation journey."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Francis Otuoba</p>
                        <p className="text-sm text-gray-500">Managing Partner at Nordic Bridge Partner AB Sweden</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl  w-full h-[500px]       // Default height for desktop
            md:h-[450px]    // Taller height for tablets
            sm:h-[350px]    // Slightly reduced height for smaller tablets
            xs:h-[300px]    // Even smaller height for mobile
            overflow-hidden  border-2 border-solid border-[#E3E3E3]">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "Tecvinson AB's expertise across IT consultancy and managed services has been pivotal for our multiple ventures. Whether supporting our complex integration needs at Nordic Bridge Partner AB or providing scalable solutions for FAStrust AB and Preskriber AB, their dedication to innovation and customer-centric strategies stands out. Tecvinson AB is more than a service provider; they are true partners in our growth."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Saliu Amedu</p>
                        <p className="text-sm text-gray-500">Managing Partner at Nordic Bridge Partner AB Sweden, CEO FAStrsust AB, CEO Preskriber AB</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "At Nordic Bridge Sweden, our mission to connect businesses globally relies on robust and reliable IT systems. Tecvinson AB has consistently delivered cutting-edge solutions that align with our strategic goals. Their professionalism and technical know-how have helped us scale with confidence."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Awa Karlsson</p>
                        <p className="text-sm text-gray-500">Partner at Nordic Bridge Sweden</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "BisCom TDigits thrives on delivering top-tier IT products, and Tecvinson AB has been instrumental in ensuring our backend processes are optimized and future-ready. Their collaborative approach and ability to tackle complex challenges head-on have made them a key partner in our success."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Celestine Bamisaye</p>
                        <p className="text-sm text-gray-500">CEO, BisCom TDigits</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="bg-white p-6 rounded-2xl border border-gray-300 max-h-[400px] lg:max-h-[420px] md:max-h-[380px] sm:max-h-[350px] xs:max-h-[320px] h-auto overflow-hidden">
                    <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
                    "Tecvinson AB has been a cornerstone of Gyzer Technologies' success. Their expertise in product development and IT consultancy has empowered us to deliver state-of-the-art solutions to our clients. Tecvinson AB’s commitment to quality and their ability to innovate consistently make them our preferred IT partner."
                    </p>
                    <div className="flex items-center mt-4">
                    <img src={Default} alt="Client" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <p className="font-semibold">Michael Alude</p>
                        <p className="text-sm text-gray-500">CEO Gyzer Technologies Limited</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
        </div>
    </div>
  );
}

export default Testimonial;
