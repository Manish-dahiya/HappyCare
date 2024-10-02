import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar({isLoggedIn,setIsSideBar}) {//isloggedin,closing
  return (
    <div className='bg-[#181818bd] h-full w-[50vw] fixed top-0 right-0 px-2 text-white animate-sidebar z-10'>
        <div id='heading' className='flex justify-between border-b border-slate-400 mt-10'>
        <h1 className='text-2xl font-bold '>HappyCare</h1>
        <span className='text-2xl bold' onClick={()=>{setIsSideBar(false)}}>X</span>
        </div>

        <div id='main' className='flex flex-col mt-10 border-b border-slate-400'>

                     <Link to="/"   className='hover:text-blue-500'>HOME</Link><br />
            <Link to="/appointment" className='hover:text-blue-500'>APPOINTMENT</Link><br />
            <Link to="/about" className='hover:text-blue-500'>ABOUT US</Link><br />
        </div>

        <div id='footer' className='mt-10'>
            {
              !isLoggedIn?<Link to="/login" className='bg-black rounded-lg text-white px-4 py-2 hover:bg-slate-900 z-2'>login</Link>
              :<button className='bg-black rounded-lg text-white px-4 py-2 hover:bg-slate-900 z-2'>logout</button>
            }
        </div>
    </div>
  )
}

export default Sidebar
