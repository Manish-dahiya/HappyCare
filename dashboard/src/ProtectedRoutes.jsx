import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({children,setCurrentPath}) {

    const navigate=useNavigate();
    const [isLoggedIn,setIsLoggedIn]=useState(
       false
    )

    const verifyToken=async(token)=>{
        try {
            const response= await fetch("http://localhost:4000/admin/verifyToken",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({token:token})
            })
            if(response.status==200){
                setIsLoggedIn(true);
                setCurrentPath("/home")
            }
            else{
                setIsLoggedIn(false);
                console.log("token mismatch error")
                localStorage.removeItem("adminToken")
            }
        } catch (error) {
            console.log("error occured")
            setIsLoggedIn(false)
        }
    }

   
    useEffect(()=>{
        let localUser=localStorage.getItem("adminToken");
        if(localUser){
            verifyToken(localUser);
        }
        else{
            navigate("/")
        }
    },[])


  return (
    isLoggedIn?children:null
  )
}

export default ProtectedRoutes
