import { ToastContainer, toast } from 'react-toastify'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext'
import { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddDoc from './pages/admin/AddDoc'
import DocList from './pages/admin/DocList'
import DashBoard from './pages/admin/DashBoard'
import AllAppointment from './pages/admin/AllAppointment'

const App = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext)

  useEffect(() => {
    if (adminToken) {
      try {
        // Decode the token payload to check for expiration
        const payload = JSON.parse(atob(adminToken.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        
        if (isExpired) {
          localStorage.removeItem('adminToken');
          setAdminToken(null);
          toast.info("Session expired. Please log in again.");
        }
      } catch (error) {
        // Fallback if the token format is invalid
        localStorage.removeItem('adminToken');
        setAdminToken(null);
      }
    }
  }, [adminToken, setAdminToken])

  return adminToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer
        position="top-right"
        autoClose={3000}     // disappears after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Navbar />
      <div className="flex items-start  ">
        <Sidebar />
      <Routes>
        <Route path='/' element={<></> } />
        <Route path='/admin_dashboard' element={<DashBoard />} />
        <Route path='/all-appointment' element={<AllAppointment />} />
        <Route path='/add_doctor' element={<AddDoc />} />
        <Route path='/doc_list' element={<DocList />} />
      </Routes>
      </div>



    </div> 
    ) : (
    <>
    <Login />
      <ToastContainer
        position="top-right"
        autoClose={3000}     // disappears after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
    )
  
}

export default App