import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-20 lg:px-32 py-12 bg-white text-gray-700">
  {/* About Us Header */}
  <div className="text-center border-t pt-10">
    <Title text1={"ABOUT"} text2={"US"} />
  </div>

  {/* About Content */}
  <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
    <img
      src={assets.about_img}
      alt="About Us"
      className="w-full md:max-w-md rounded-lg shadow-lg"
    />
    <div className="flex flex-col gap-4 text-base leading-relaxed">
      <p>
        Forever was born out of a passion for innovation and a desire to revolutionize
        the way people shop online. Our journey began with a simple idea: to provide a
        platform where customers can easily discover, explore, and purchase a wide
        range of products from the comfort of their homes.
      </p>
      <p>
        Since our inception, we've worked tirelessly to curate a diverse selection of
        high-quality products that cater to every taste and preference. From fashion and
        beauty to electronics and home essentials, we offer an extensive collection
        sourced from trusted brands and suppliers.
      </p>
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-2">Our Mission</h3>
        <p>
          Our mission at Forever is to empower customers with choice, convenience, and
          confidence. We're dedicated to providing a seamless shopping experience that
          exceeds expectations — from browsing and ordering to delivery and beyond.
        </p>
      </div>
    </div>
  </div>

  {/* Why Choose Us Section */}
  <div className=" mt-20">
    <Title text1={'WHY'} text2={'CHOOSE US'} />
  </div>

  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
    <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <h4 className="font-bold mb-2 text-gray-900">Quality Assurance</h4>
      <p>
        We meticulously select and vet each product to ensure it meets our stringent
        quality standards.
      </p>
    </div>
    <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <h4 className="font-bold mb-2 text-gray-900">Convenience</h4>
      <p>
        With our user-friendly interface and hassle-free ordering process, shopping has
        never been easier.
      </p>
    </div>
    <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <h4 className="font-bold mb-2 text-gray-900">Exceptional Customer Service</h4>
      <p>
        Our team of dedicated professionals is here to assist you every step of the way,
        ensuring your satisfaction is our top priority.
      </p>
    </div>
  </div>
</div>

  )
}

export default About
