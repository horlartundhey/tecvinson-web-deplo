import React from 'react'
import ava1 from '@/assets/avatar.png';
import ava2 from '@/assets/avatar2.png';
import ava3 from '@/assets/avatar3.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



const Testimonial = () => {


    // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Number of cards shown on the screen at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>

        <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
            <h3 className='font-semibold text-[20px]'>
              TESTIMONIALS
            </h3>
            <h1 className='text-[40px] font-semibold'>
                Our clients’ success stories
            </h1>            

            <div className='bg-[#05385D] w-full m-auto py-[50px] flex flex-col justify-start items-start gap-[30px] lg:px-[40px] px-[20px] rounded-xl'>
            {/* Slider Section */}
            <Slider {...settings} className="w-full">
                <div className='p-6 '>
                    <div className='bg-[#F7F8FA] p-6 rounded-md shadow-md w-full h-[240px]'>
                        <p className='text-sm'>"Working with Tecvinson transformed our business. Their expertise in cloud migration was exceptional, and the entire process was seamless. They not only met our needs but anticipated future challenges, delivering solutions ahead of time. We're now more efficient and scalable than ever."</p>
                        <div className='flex items-center mt-4'>
                        <img src={ava1} alt="Client" className='w-12 h-12 rounded-full mr-4'/>
                        <div>
                            <p className='font-semibold'>Sarah M., CTO</p>
                            <p className='text-sm text-gray-500'>Tech Innovators Inc.</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='p-6'>
                    <div className='bg-[#F7F8FA] p-6 rounded-md shadow-md w-full h-[240px]'>
                        <p className='text-sm'>"The team at [IT Consultancy Name] provided invaluable support during our digital transformation. Their knowledge of data analytics and system integration helped us streamline operations, saving us both time and resources. Their professionalism and commitment are unparalleled."</p>
                        <div className='flex items-center mt-4'>
                        <img src={ava2} alt="Client" className='w-12 h-12 rounded-full mr-4'/>
                        <div>
                            <p className='font-semibold'>David L., CEO</p>
                            <p className='text-sm text-gray-500'>Global Solutions Group</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='p-6'>
                    <div className='bg-[#F7F8FA] p-6 rounded-md shadow-md w-full h-[240px]'>
                        <p className='text-sm'>"We were struggling with cybersecurity vulnerabilities until we partnered with [IT Consultancy Name]. Their expert team identified our weak points and implemented a comprehensive security strategy. We now feel confident that our data is secure, and we can focus on growth."</p>
                        <div className='flex items-center mt-4'>
                        <img src={ava3} alt="Client" className='w-12 h-12 rounded-full mr-4'/>
                        <div>
                            <p className='font-semibold'>Emily W., Head of IT</p>
                            <p className='text-sm text-gray-500'>Secure Solutions</p>
                        </div>
                        </div>
                    </div>
                </div>
                {/* Add more slides as needed */}
            </Slider>
        </div>
        
        </div>
       
    
    </div>

  )
}

export default Testimonial