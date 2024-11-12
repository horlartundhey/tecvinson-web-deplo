import React from 'react';
import aboutImage from '../assets/image.png';
import { FaArrowRight } from 'react-icons/fa6';

const Aboutcomp = () => {
  return (
    <div className='bg-brandbackground w-full m-auto py-[60px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[150px] px-[20px]'>

      <div className='lg:w-full w-full flex flex-col justify-center items-start gap-6'>
        <h3 className='font-semibold text-[20px]'>
          ABOUT US
        </h3>
        <h1 className='text-[40px] font-semibold'>
          Tecvinson at a Glance
        </h1>

        {/* Main White Box Container */}
        <div className='bg-white w-full m-auto py-[50px] flex lg:flex-row flex-col justify-between items-start gap-[50px] lg:px-[40px] px-[20px] rounded-xl'>
      
            {/* Image Section */}
            <div className='lg:w-[50%] w-full'>
                <img src={aboutImage} alt="About Us" className='w-full h-auto object-cover rounded-lg shadow-lg' />
            </div>

            {/* Text and Button Section */}
            <div className='lg:w-[50%] w-full flex flex-col justify-start items-start gap-6'>
                
                <p className='text-lg leading-relaxed mb-4 text-justify'>
                Tecvinson is a dynamic and innovative for-profit organization based in Sweden, committed to delivering exceptional IT Training, Solutions and Product Development, IT Consultancy, and Staff Augmentation services. We serve a diverse clientele, including private individuals, companies, and government entities. Our commitment to excellence, sustainability, and the well-being of our planet, customers, and co-workers is at the heart of everything we do.
                </p>

                {/* Button with Icon */}
                <a
                href="/about-us"
                className='inline-flex items-center border border-brandprimary text-brandprimary px-6 py-3 rounded-[10px] font-semibold hover:bg-brandprimary hover:text-white transition-colors duration-300'
                >
                Continue reading <FaArrowRight className='ml-3' />
                </a>
            </div>
      
        </div>
      </div>

    </div>
  );
};

export default Aboutcomp;