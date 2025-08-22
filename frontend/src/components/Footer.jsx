import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-white px-5 md:px-20 lg:px-32">
      {/* Main footer content */}
      <div className="grid gap-14 sm:grid-cols-1 md:grid-cols-3 my-10 mt-40 text-sm text-gray-700">
        
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="md:w-4/5 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-semibold mb-4 text-black">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-4 text-black">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black cursor-pointer">+91 72283467</li>
            <li className="hover:text-black cursor-pointer">contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t pt-5 text-center text-gray-500 text-sm">
        © 2025 ForeverYou — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
