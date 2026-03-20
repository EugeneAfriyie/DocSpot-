import React from 'react'
import { assets } from '../../assets/assets_admin/assets'

const AddDoc = () => {
  return (
   <form className='m-5 w-full' action="">
    <p className='mb-3 text-lg font-medium'>ADD DOCTOR</p>

    <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
      <div className="">
        <label htmlFor="doc-img">
          <img src={assets.upload_area} alt="" />

          <input type="file" id='doc-img' hidden />
          <p>Upload Doctor <br /> Picture</p>
        </label>
      </div>

      <div className="">
        <div className="">
          <div className="">
            <p>Name</p>
            <input type="text" placeholder='Enter Doctor Name' className='' />
          </div>
          <div className="">
            <p>Doctor Email</p>
            <input type="text" placeholder='Enter Doctor Email' className='' />
          </div>
          <div className="">
            <p>Doctor Password</p>
            <input type="password" placeholder='Enter Doctor Password' className='' />
          </div>

          <div className="">
            <p>Experience</p>
            <select name="" id="">
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
            </select>
          </div>

          <div className="">
            <p>Fees</p>
            <input type="number" placeholder='Enter Doc Fees' />
          </div>


        </div>
        <div className="">
          <div className="">
            <p>Speciality</p>

            <select name="" id="">
              <option value="General Physician">eneral Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>

              <div className="">
                <p>Education</p>
                <input type="number" placeholder='Enter Doc Fees' />
              </div>

              <div className="">
                <p>Address</p>
                <input type="text" placeholder='Address 1' name="" id="" required />
                <input type="text" placeholder='Address 2' name="" id="" required />
                <input type="text" placeholder='Address 3' name="" id="" required />
              </div>


          </div>
        </div>

        <div className="">
                <p>About</p>
                <textarea  placeholder='Write Doc About' required rows={5}/>
              </div>

      </div>

      <button>Add Doctor</button>



    </div>


   </form>
  )
}

export default AddDoc