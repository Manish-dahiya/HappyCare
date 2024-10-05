import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../helper';
// import { decodeToken } from '../helpers/helper';
import { toast } from 'react-toastify';


export const authContext = createContext()


function AuthContextProvider({children}) {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null)

    const loginUser = async (formData,setIsLoggedIn) => {
        try {
            const response = await fetch("http://localhost:4000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...formData,role:"user"})
            })

            if (response.status == 200) {
                const data = await response.json()
                
                toast.success(data.message)

                localStorage.setItem("userToken", data.token)
                setIsLoggedIn(true)
                navigate("/")
            }
            else {
                const data = await response.json()
                toast.error(data.message)
                
            }
        } catch (error) {
            toast.error("some internal error occured");
        }
    }
    const registerUser = async (formData, setIsLoggedIn) => {
        try {
            const response = await fetch("http://localhost:4000/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, role: "user" })
            });
    
            const data = await response.json(); // Retrieve data once
    
            if (response.status === 200) {
                toast.success(data.message);
                localStorage.setItem("userToken", data.token);
                setIsLoggedIn(true);
                navigate("/"); // Ensure navigate is correctly used
            } else {
                console.log(data);
                toast.error(data.message); // Display error message from server
            }
        } catch (error) {
            toast.error("Some internal error occurred."); // Use a generic error message
            console.error("Error occurred:", error); // Log the actual error for debugging
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("userToken")
        const decodedTokenId = decodeToken(token)
        if (decodedTokenId) {
            setUserId(decodedTokenId)
        }
    }, [localStorage.getItem("userToken")])



  return (
    <authContext.Provider  value={{
        loginUser,
        registerUser,

        userId
    }}>
        {children}
      
    </authContext.Provider>
  )
}

export default AuthContextProvider;
