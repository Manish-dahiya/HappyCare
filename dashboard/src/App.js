import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import DoctorContextProvider from './contexts/DoctorContextProvider';
import AddDoctor from './pages/AddDoctor';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import AdminContextProvider from './contexts/AdminContextProvider';
import { useEffect, useState } from 'react';
import AddAdmin from './pages/AddAdmin';
import ProtectedRoutes from './ProtectedRoutes';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentPath, setCurrentPath] = useState();

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  })

  const hideSidebar = ["/"]
  return (
    <div className="flex bg-[#3942d8] h-[100vh] w-[100vw]">
      <BrowserRouter>
        <AdminContextProvider>
          <DoctorContextProvider>
            {!hideSidebar.includes(currentPath) && <Sidebar />}
            <Routes>
              <Route path="/" element={<Login />} ></Route>
              <Route path='/home' element={<ProtectedRoutes setCurrentPath={setCurrentPath}> <Home /></ProtectedRoutes>}></Route>
              <Route path='/addDoctor' element={<ProtectedRoutes ><AddDoctor /></ProtectedRoutes>}></Route>
              <Route path='/doctors' element={<ProtectedRoutes><Doctors /></ProtectedRoutes>}></Route>
              <Route path='/addAdmin' element={<ProtectedRoutes><AddAdmin /></ProtectedRoutes>}></Route>
            </Routes>
          </DoctorContextProvider>
        </AdminContextProvider>
      </BrowserRouter>
      <ToastContainer
             position="top-center"
             autoClose={3000}
             hideProgressBar
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover={false}  // Disable hover to test auto-close
             theme="light"
             transition={Flip} 
      />
    </div>
  );
}

export default App;
