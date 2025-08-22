import React from 'react'
import Title from '../components/Title';
import {assets} from '../assets/assets.js'
const Contact = () => {
  return (
    <div>
    <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT US'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Shop</p>
          <p className='text-gray-500'>233 Navi Peth near V.v Library <br />Maharashtra India</p>
          <p className='text-gray-500'>Tel: (+91) 9172283467 <br />Email: foreverask@.com</p>
          <p className='font-semibold text-gray-500'>Careeres of Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text:sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
        </div>
    </div>
  
    
  )
}

export default Contact;
