import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const navigate= useNavigate()

    useEffect(() => {
        let localUser= localStorage.getItem("userToken")
        if(localUser){
            setIsLoggedIn(true)
        }
        else {
            navigate("/login")
            setIsLoggedIn(false)
        }
    }, [])
    


  return (
    isLoggedIn?children:null
  )
}

export default ProtectedRoutes
