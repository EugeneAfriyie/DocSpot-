import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const adminPrefix = import.meta.env.VITE_ADMIN_PREFIX || ''
const doctorPrefix = import.meta.env.VITE_DOCTOR_PREFIX || '/doctor'

const withPrefix = (prefix, path = '') => `${prefix}${path}`

const Navbar = () => {
  const { adminToken, setAdminToken, adminProfile, getAdminProfile } = useContext(AdminContext)
  const { doctorToken, setDoctorToken, doctorProfile } = useContext(DoctorContext)

  const navigate = useNavigate()
  const location = useLocation()
  const isDoctorPortal = doctorToken || location.pathname.startsWith(doctorPrefix)

  useEffect(() => {
    if (adminToken && !adminProfile) {
      getAdminProfile()
    }
  }, [adminToken, adminProfile])

  const logOut = () => {
    if (adminToken) {
      setAdminToken(null)
      localStorage.removeItem('adminToken')
    }

    if (doctorToken) {
      setDoctorToken(null)
      localStorage.removeItem('doctorToken')
    }

    navigate(isDoctorPortal ? withPrefix(doctorPrefix, '/login') : withPrefix(adminPrefix, '/login'))
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white/95 backdrop-blur'>
      <div className='flex text-xs items-center gap-4 sm:gap-6'>
        <h1 className='text-2xl sm:text-3xl font-extrabold text-primary cursor-pointer tracking-tight'>
          MediApo <span className='hidden sm:inline-block text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1'>Dashboard</span>
        </h1>
        <div className='flex flex-col gap-1'>
          <p className='w-fit rounded-full border border-gray-500 px-2.5 py-0.5 text-gray-600'>
            {adminToken ? 'Admin' : 'Doctor'}
          </p>
          {doctorToken && doctorProfile && (
            <p className='hidden sm:block text-sm text-gray-500'>
              {doctorProfile.name} | {doctorProfile.speciality}
            </p>
          )}
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {doctorToken && doctorProfile && (
          <img
            className='h-10 w-10 rounded-full border border-cyan-100 bg-cyan-50 object-cover'
            src={doctorProfile.image || assets.upload_area}
            alt='Doctor avatar'
          />
        )}
        {adminToken && (
          <img
            className='h-10 w-10 rounded-full border border-slate-200 bg-slate-100 object-cover'
            src={adminProfile?.image || assets.upload_area}
            alt='Admin avatar'
          />
        )}
        <button onClick={logOut} className='rounded-full bg-primary px-6 py-2 text-sm text-white sm:px-10'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
