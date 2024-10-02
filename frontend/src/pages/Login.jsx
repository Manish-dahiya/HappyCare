import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../contexts/AuthContextProvider'


function Login({setIsLoggedIn}) {
    const [isRegister, setIsRegister] = useState()
    const init={
        username:"",
        email:"",
        password:""
    }

  
    const [formData,setFormData]=useState(init)
    const {loginUser,registerUser,responseMessage,setResponseMessage}=useContext(authContext)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleLogin=()=>{
        if(formData.email.length>0 && formData.password.length >0){
            loginUser({email:formData.email ,password:formData.password},setIsLoggedIn); //setIsLoggedIn for the purpose of updating
        }
        else{
            setResponseMessage("fill the fields first")
        }
    }
    const handleRegister=()=>{
        if(formData.email.length>0 && formData.password.length >0 && formData.username.length >0){
            registerUser(formData,setIsLoggedIn);
        }
        else {
            setResponseMessage("fill the fields first")
        }
    }
    
    useEffect(()=>{
        setTimeout(()=>{
            setResponseMessage("");
        },3000)
    },[responseMessage])

   
    return (
        <div className='flex justify-center  h-full w-full'>
            <div className='text-center mt-32'>
                <h1 className='font-bold text-xl mb-4'>Sign in</h1>
                <p className='mb-3 text-lg text-slate-700'>Please login to continue</p>
                <p className='mb-3 text-lg text-slate-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit.</p>

                {isRegister &&
                    <div>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='username' className=' w-full mb-5 h-10 rounded-lg px-1 font-xl border border-slate-700' />
                    </div>}
                <div>
                    <input type="email" name='email' value={formData.value} onChange={handleChange} placeholder='eg. abc@gmail.com' className=' w-full mb-5 h-10 rounded-lg px-1 font-xl border border-slate-700' />

                </div>
                <div>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='password' className=' w-full mb-5 h-10 rounded-lg px-1 font-xl border border-slate-700' />
                </div>



                <p> <span className='hover:text-blue-400 cursor-pointer' onClick={()=>setIsRegister(!isRegister)}>{!isRegister?"Register Now ?" :"Already have an account ?"}</span></p>

                {
                    !isRegister ? <button className='bg-blue-500 rounded-lg px-3 py-1 font-bold text-white mt-4 hover:bg-blue-400' onClick={handleLogin}>Login</button>
                    :  <button className='bg-blue-500 rounded-lg px-3 py-1 font-bold text-white mt-4 hover:bg-blue-400' onClick={handleRegister}>Register</button>
                }

                <p className='text-red-400'>{responseMessage}</p>
            </div>

        </div>
    )
}

export default Login
