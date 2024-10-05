import React, { useContext, useState } from 'react'
import { adminContext } from '../contexts/AdminContextProvider'

function AddAdmin() {
    const init={
        username:"",
        email:"",
        password:"",
        role:"admin"
    }
    const [formData,setFormData]=useState(init)
    const {addAdmin}=useContext(adminContext)

    const handleChange=(e)=>{
        const{name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleRegister=()=>{
        if(formData.username.length==0 || formData.email.length==0 || formData.password.length==0){
            //show message
        }
        else{
            addAdmin(formData);
        }
    }

  return (
    <div className='h-full w-full bg-[#e5e5e5] rounded-l-3xl flex flex-col justify-center items-center'>
                        <h1 className='text-3xl font-bold text-red-500'>Happy<span className='text-[#3942d8]'>Care</span> +++</h1>
            <h1 className='font-semibold text-xl'>Add New Admin</h1>
            <div id='fields' className='mt-3'>
                <input type="text" name='username' placeholder='name' value={formData.username} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '/>
                <input type="email" name='email' placeholder='email' value={formData.email} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '/>
                <input type="password" name='password' placeholder='password' value={formData.password} onChange={handleChange} className='h-10 p-2 w-full border border-slate-600 rounded-lg mb-4 '/>
            </div>
            <button className='bg-blue-400 hover:bg-blue-500 px-2 py-3 rounded-lg' onClick={handleRegister}>Add Admin</button>
    </div>
  )
}

export default AddAdmin
