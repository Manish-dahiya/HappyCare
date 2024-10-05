import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const adminContext= createContext()
function AdminContextProvider({children}) {

    const navigate=useNavigate();
    const loginAdmin=async(formData)=>{
        try {
            const response =await fetch("http://localhost:4000/admin/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)//includes role
            })
            if(response.status==200){
                //succesfull login message
                const data=await response.json()
                localStorage.setItem("adminToken",data.token);
                toast.success("login successfull")
                navigate("/home")
            }
            else{
                //message
                const data=await response.json()
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("some internal error occured")
        }
    }

    const logoutAdmin=()=>{
       if(localStorage.getItem("adminToken")){
        toast.success("logout successfully")
        localStorage.removeItem("adminToken");
       }
    }

    const addAdmin=async(formData)=>{
        try {       
            const response= await fetch("http://localhost:4000/admin/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            if(response.status==200){
                toast.success("registerd Successfully")
            }
            else{
                toast.error("error in registering")
            }
        } catch (error) {
           toast.error("some internal error occured")
        }
    }

  return (
    <adminContext.Provider value={{
        loginAdmin,
        logoutAdmin,
        addAdmin
    }}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminContextProvider
