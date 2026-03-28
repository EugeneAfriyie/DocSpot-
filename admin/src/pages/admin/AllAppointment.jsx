import React from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const AllAppointment = () => {
 
 


  const { calculateAge,slotDateFormat,currencySymbol } = useContext(AppContext)
  const { getAllAppointments,
        appointments,
        setAppointments,
        adminToken,backendUrl} = useContext(AdminContext)

 const cancelAppointment = async(appointmentId) =>{
    console.log(appointmentId)
    try {
      const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers: {adminToken}})
      if(data.success){
        toast.success(data.message)
        getAllAppointments()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



        useEffect(() => {
          if (adminToken) {
            getAllAppointments();
            // console.log(doctors)
          }
        }, [adminToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className=" bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">

        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>fee</p>
          <p>Action</p>

        </div>
          {appointments.map((item,index) => (
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b text-gray-500 hover:bg-gray-50">
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className="flex items-center gap-2">
                <img className='w-8 rounded-full' src={item.userdata.image} alt="" />
                <p>{item.userdata.name}</p>
              </div>

              <p>{calculateAge(item.userdata.DOB)}</p>
              {/* <p>{new Date(item.date).toLocaleString()}</p> */}
              <p>{ slotDateFormat(item.slotdate)},{item.slotTime}</p>
              <div className="flex items-center gap-2">
                <img className='w-8 rounded-ful bg-gray-200l' src={item.doctorData.image} alt="" />
                <p>{item.doctorData.name}</p>
              </div>
              <p>{currencySymbol}{item.doctorData.fee.toFixed(2)}</p>
              {item.cancelled ?
              <p className='text-red-400 text-sm font-medium'>Cancelled</p>
              : 
              <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
            </div>
          ) )}
      </div>
    </div>
  )
}

export default AllAppointment