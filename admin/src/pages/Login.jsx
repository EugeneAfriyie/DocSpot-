import React from 'react'

const Login = () => {
    const[state, setState] = React.useState("Admin")
  return (
   <form action="" className='min-h-[80vh] flex items-center' >
        <div className=" flex flex-col gap-3 m-auto items-start p-8 max-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
            <p className='text-2xl font-semibold m-auto'>
                <span className='text-primary'>{state} </span>
                Login
            </p>

            <div className="w-full">
                <p>Email</p>
                <input className=' border border-[#DADADA] rounded w-full p-2 mt-1 ' type="email" placeholder='Enter your email' required />
            </div>
            <div className="w-full">
                <p>Password</p>
                <input className=' border border-[#DADADA] rounded w-full p-2 mt-1 ' type="password" placeholder='Enter your password'  required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base ' >Login</button>

            {state === "Admin" ? <p className='text-center text-sm'>Don't have an account? <span onClick={()=>setState("Doctor")} className='text-primary cursor-pointer'>Login as Doctor</span></p> : <p className='text-center text-sm'>Don't have an account? <span onClick={()=>setState("Admin")} className='text-primary cursor-pointer'>Login as Admin</span></p>}
        </div>
   </form>
  )
}

export default Login