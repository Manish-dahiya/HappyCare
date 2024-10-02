import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';

function Navbar({isLoggedIn,setIsLoggedIn}) {
  const [isSideBar,setIsSideBar]=useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
     setIsLoggedIn(true);
    }
 },[localStorage.getItem("token")])
 


  return (
    <div className='flex  justify-between w-full px-6 py-3 bg-transparent'>
        <div id='title' className='text-lg font-bold'>HappyCare</div>

        <div id='middle' className='md:flex gap-5 hidden '>
            <Link to="/"   className='hover:text-blue-500'>HOME</Link>
            <Link to="/appointment" className='hover:text-blue-500'>APPOINTMENT</Link>
            <Link to="/about" className='hover:text-blue-500'>ABOUT US</Link>
        </div>

        <div id='last' className='hidden md:block'>
            {
              !isLoggedIn?<Link to="/login" className='bg-black rounded-lg text-white px-4 py-2 hover:bg-slate-900 z-2'>login</Link>
              :<button className='bg-black rounded-lg text-white px-4 py-2 hover:bg-slate-900 z-2'>logout</button>
            }
        </div>

        <div className='text-2xl md:hidden' onClick={()=>{setIsSideBar(true)}}>&#9776;</div>
        {isSideBar && <Sidebar isLoggedIn={isLoggedIn}  setIsSideBar={setIsSideBar}/>}

    </div>
  )
}

export default Navbar
