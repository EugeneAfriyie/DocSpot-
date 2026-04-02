import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[360px] rounded-lg' src={assets.contact_image} alt="Contact MediApo" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Clinic</p>
          <p className='text-gray-500'>
            54709 Healthway Station <br /> 
            Suite 350, Washington, USA
          </p>
          <p className='text-gray-500'>
            Tel: (415) 555-0132 <br /> 
            Email: support@mediappo.com
          </p>
          
          <p className='font-semibold text-lg text-gray-600 mt-4'>Careers at MEDIAPPO</p>
          <p className='text-gray-500'>Learn more about our medical teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded-md'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
