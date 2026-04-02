import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* Left Section */}
        <div>
          <img onClick={() => { navigate('/'); scrollTo(0,0) }} className='mb-5 w-40 cursor-pointer' src={assets.logo} alt="MediApo Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            MediApo is your trusted healthcare companion, designed to seamlessly connect patients with top-tier medical professionals. We prioritize your well-being by offering easy appointment scheduling, secure health records, and reliable support.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-900'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li onClick={() => { navigate('/'); scrollTo(0,0) }} className='cursor-pointer hover:text-black transition-colors'>Home</li>
            <li onClick={() => { navigate('/about'); scrollTo(0,0) }} className='cursor-pointer hover:text-black transition-colors'>About us</li>
            <li onClick={() => { navigate('/contact'); scrollTo(0,0) }} className='cursor-pointer hover:text-black transition-colors'>Contact us</li>
            <li className='cursor-pointer hover:text-black transition-colors'>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5 text-gray-900'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1 (415) 555-0132</li>
            <li>support@mediappo.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright Section */}
      <div>
        <hr className='border-gray-200' />
        <p className='py-5 text-sm text-center text-gray-600'>
          Copyright © {new Date().getFullYear()} MediApo - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
