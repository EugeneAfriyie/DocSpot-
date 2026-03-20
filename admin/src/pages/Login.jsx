import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify' // Recommended for user feedback
import axios from 'axios'

const Login = () => {
    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { setAdminToken, backendUrl } = useContext(AdminContext)

   const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const url = state === "Admin"
        ? `${backendUrl}/api/admin/login`
        : `${backendUrl}/api/doctor/login`

    try {
        const { data } = await axios.post(url, { email, password })

        if (data.success) {
            localStorage.setItem('adminToken', data.token)
            setAdminToken(data.token)
            toast.success(`${state} Login Successful`)
        } else {
            toast.error(data.message || "Invalid email or password")
        }

    } catch (error) {
        console.error('Login failed:', error)
        if (error.response && error.response.data) {
            toast.error(error.response.data.message || "Invalid email or password")
        } else {
            toast.error("Server Error. Please try again later.")
        }
    } finally {
        setIsLoading(false)
    }
}

    return (
        <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login
                </p>

                <div className="w-full">
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary' 
                        type="email" 
                        placeholder='Enter your email' 
                        required 
                    />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-primary' 
                        type="password" 
                        placeholder='Enter your password' 
                        required
                    />
                </div>
                
                <button 
                    disabled={isLoading}
                    className='bg-primary text-white w-full py-2 rounded-md text-base mt-2 hover:bg-opacity-90 transition-all'
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <p className='text-center w-full mt-2'>
                    {state === "Admin" ? (
                        <>Login as a doctor? <span onClick={() => setState("Doctor")} className='text-primary underline cursor-pointer'>Click here</span></>
                    ) : (
                        <>Login as an admin? <span onClick={() => setState("Admin")} className='text-primary underline cursor-pointer'>Click here</span></>
                    )}
                </p>
            </div>
        </form>
    )
}

export default Login