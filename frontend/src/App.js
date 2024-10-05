import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import blueCircle from "./public/blue.png"
import Login from './pages/Login.jsx';
import AuthContextProvider from './contexts/AuthContextProvider.jsx';
import { useEffect, useState } from 'react';
import About from './pages/About.jsx';
import Appiontment from './pages/Appiontment.jsx';
import DoctorContextProvider from './contexts/DoctorContextProvider.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("userToken")?true:false); //for the purpose of login/logout button
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setIsLoggedIn(true)
    }
  },[localStorage.getItem("userToken")]) //if the user deletes the token


  return (
    <div className='bg-[#e5e5e5] min-h-screen relative'>
      {/* <img src={blueCircle} alt="" className='h-96 w-96 absolute top-0  right-0 ' /> */}
    <BrowserRouter>
    <AuthContextProvider>
      <DoctorContextProvider> {/*for the appointment page*/}
   
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>

     <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/about" element={<About/>} ></Route>
      <Route path='/appointament' element={<Appiontment/>}></Route> {/*protected*/}
    </Routes>

    <Footer/>    
    </DoctorContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  </div>
  );
}

export default App;
