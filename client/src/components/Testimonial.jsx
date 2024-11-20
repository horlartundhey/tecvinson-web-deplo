import React from 'react';
import ava1 from '@/assets/Avatar.png';
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
          padding: '0 40px',          
        }}
      >
        {/* Dots on the left */}
        <div style={{ display: 'flex', gap: '5px', backgroundColor: '#ffffff', padding:'5px 0', borderRadius: '10px' }}>
          {dots}
        </div>
        {/* Arrows on the right */}
        <div style={{ display: 'flex', gap: '10px' }}>
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
    customPaging: i => (
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#c4c4c4',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[100px] px-[20px]'>
        <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
              TESTIMONIALS
            </h3>
            <h1 className='text-[40px] font-semibold'>
                Our clients’ success stories
            </h1>            

            <div className='w-full py-[50px] relative'>
            <Slider ref={sliderRef} {...settings} className="w-full">
      <div className="p-4">
        <div className="bg-white p-6 rounded-2xl  w-full h-auto sm:h-auto overflow-hidden border-2 border-solid border-[#E3E3E3]">
          <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
            "Working with Tecvinson transformed our business. Their expertise in
            cloud migration was exceptional, and the entire process was
            seamless. They not only met our needs but anticipated future
            challenges, delivering solutions ahead of time. We're now more
            efficient and scalable than ever."
          </p>
          <div className="flex items-center mt-4">
            <img src={ava1} alt="Client" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">Sarah M., CTO</p>
              <p className="text-sm text-gray-500">Tech Innovators Inc.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white p-6 rounded-2xl  w-full h-auto sm:h-auto overflow-hidden border-2 border-solid border-[#E3E3E3]">
          <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
            "The team at [IT Consultancy Name] provided invaluable support
            during our digital transformation. Their knowledge of data
            analytics and system integration helped us streamline operations,
            saving us both time and resources. Their professionalism and
            commitment are unparalleled."
          </p>
          <div className="flex items-center mt-4">
            <img src={ava2} alt="Client" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">David L., CEO</p>
              <p className="text-sm text-gray-500">Global Solutions Group</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white p-6 rounded-2xl  w-full h-auto sm:h-auto overflow-hidden border-2 border-solid border-[#E3E3E3]">
          <p className="text-[16px] italic leading-[24px] text-[#5E5E5E] ">
            "We were struggling with cybersecurity vulnerabilities until we
            partnered with [IT Consultancy Name]. Their expert team identified
            our weak points and implemented a comprehensive security strategy.
            We now feel confident that our data is secure, and we can focus on
            growth."
          </p>
          <div className="flex items-center mt-4">
            <img src={ava3} alt="Client" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">Emily W., Head of IT</p>
              <p className="text-sm text-gray-500">Secure Solutions</p>
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
