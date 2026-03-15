import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'

const App = () => {
  return (
    <div className=' '>
      <ToastContainer
        position="top-right"
        autoClose={3000}     // disappears after 3s
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Login />
    </div>
  )
}

export default App