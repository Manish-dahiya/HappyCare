import React, { useContext, useState } from 'react'
import { adminContext } from '../contexts/AdminContextProvider'

function Login() {
    const init={
        email:"",
        password:"",
        role:"admin"
    }
    const [formData,setFormData]=useState(init)
    const {loginAdmin}=useContext(adminContext)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleLogin=()=>{
        if(formData.email.length!=0 && formData.password.length!=0){
            loginAdmin(formData)
        }   
        else{
            //set message
        }
    }


  return (
    <div className='flex justify-center items-center h-full w-full bg-[#e5e5e5]'>
        <div className='text-center'>
        <h1 className='text-4xl font-bold text-red-500'>Happy<span className='text-[#3942d8]'>Care</span> +++</h1>
            <h1 className='text-2xl mt-4'>Welcome to <span className='text-3xl font-bold text-red-500'>Happy<span className='text-[#3942d8]'>Care</span> +++</span></h1>
            <p>Only admins are allowed to access these resources !</p>

            <div id='fields' className='mt-6'>
                <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='eg.abc@gmail.com' className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '/>
                <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='password' className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '/>
                <button className='bg-[#3942d8] text-white px-4 font-semibold py-2 rounded-lg hover:bg-[#373db5]' onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login
