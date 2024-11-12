import React from 'react';
import { Link } from 'react-scroll';
import heroImage from '../assets/heroSect.png'

const HeroSect = () => {
  return (
        <div className=''>
            <div className='bg-black w-full lg:h-[600px] h-fit m-auto pt-[60px] pb-12 lg:pt-[0px] lg:px-[150px] px-[20px] flex justify-between items-center lg:flex-row flex-col lg:gap-5 gap-[50px] bg-cover bg-center' style={{backgroundImage: `url(${heroImage})`}}>

                <div className='lg:w-[60%] w-full flex flex-col justify-center items-start lg:gap-8 gap-4 text-white'>
                <div className="">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Driving Innovation with Simplicity and Togetherness
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">
                        At Tecvinson, we believe that the best technology solutions are born from simplicity and collaboration. By combining innovative thinking with seamless teamwork.
                    </p>
                    <a
                        href="/contact-us"
                        className="inline-block bg-white text-black px-6 py-3 rounded-[10px] font-semibold hover:bg-blue-400 hover:text-white transition-colors duration-300"
                    >
                        Contact Us
                    </a>
                    </div>
                </div>

            </div>
        </div>    
    );
};

export default HeroSect;