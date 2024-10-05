import React, { useContext } from 'react'
import { adminContext } from '../contexts/AdminContextProvider'

function Popup({isPopup,setIsPopup}) {
    const {logoutAdmin}=useContext(adminContext)
  return (
    <div className='h-full fixed w-full bg-[#1908085e] flex justify-center items-center'>
            <div className='w-[30%] h-[20%] bg-white rounded-lg text-center p-4'>
                <p className='font-semibold text-2xl mb-7'>Are you sure ! You want to logout ?</p>
                <button className='bg-red-400 px-2 py-2 mx-2 rounded-lg font-semibold' onClick={()=>logoutAdmin()}>Logout</button>
                <button className='bg-blue-400 px-2 py-2 rounded-lg font-semibold' onClick={()=>setIsPopup(false)}>cancel</button>
            </div>
    </div>
  )
}

export default Popup
