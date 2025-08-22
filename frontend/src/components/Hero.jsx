import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import p_img48 from '../images/p_img48.png';
import p_img51 from '../images/p_img51.png';
import p_img49 from '../images/p_img49.png'


const Hero = () => {
  const slides = [
    {
      title: "Latest Arrivals",
      subtitle: "OUR BESTSELLERS",
      cta: "SHOP NOW",
      image:p_img48, 
    },
    {
      title: "Summer Collection",
      subtitle: "HOT PICKS",
      cta: "EXPLORE",
      image:p_img51,
    },
     {
      title: "Top Picks",
      subtitle: "Users Choice",
      cta: "EXPLORE",
      image:p_img49,
    },
  ];
  return (
  
    <Swiper
    
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
     
         
        >
    {slides.map((slide, index) => (
       <SwiperSlide key={index}>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* hero left side */}

      <div className='w-full sm:w-180 flex items-center justify-center py-6 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>{slide.subtitle}</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>{slide.title}</h1>
            <div className='flex items-center gap-2'>
             <p className='font-semibold text-sm md:text-base'>{slide.cta}</p>
             <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
          </div>
      </div>
      {/* hero right side */}
       <img className='w-1/2 sm:w-100 h-auto object-contain' src={slide.image} />
    </div>
    </SwiperSlide>
    ))}      
     </Swiper> 
  )
}

export default Hero
