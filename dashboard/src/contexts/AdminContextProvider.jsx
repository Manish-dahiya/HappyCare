import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom';

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
                console.log(data.message)
                localStorage.setItem("adminToken",data.token);
                navigate("/home")
            }
            else{
                //message
                const data=await response.json()
                console.log(data.message)
            }
        } catch (error) {
            console.log("some error occured")
        }
    }

    const logoutAdmin=()=>{
       if(localStorage.getItem("adminToken")){
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
                console.log("registered successfully")
            }
            else{
                console.log("error in registering")
            }
        } catch (error) {
            console.log("error occured")
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
