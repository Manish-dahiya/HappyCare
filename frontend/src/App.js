import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import blueCircle from "./public/blue.png"
import Login from './pages/Login.jsx';
import AuthContextProvider from './contexts/AuthContextProvider.jsx';
import { useEffect, useState } from 'react';
import About from './pages/About.jsx';

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("token")?true:false); //for the purpose of login/logout button
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setIsLoggedIn(true)
    }
  },[localStorage.getItem("token")]) //if the user deletes the token


  return (
    <div className='bg-[#e5e5e5] min-h-screen relative'>
      {/* <img src={blueCircle} alt="" className='h-96 w-96 absolute top-0  right-0 ' /> */}
    <BrowserRouter>
    <AuthContextProvider>
   
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>

     <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <Route path="/about" element={<About/>} ></Route>
    </Routes>    
    </AuthContextProvider>
  </BrowserRouter>
  </div>
  );
}

export default App;
