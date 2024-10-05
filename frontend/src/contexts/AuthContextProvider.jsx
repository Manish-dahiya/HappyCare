import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../helper';
// import { decodeToken } from '../helpers/helper';


export const authContext = createContext()


function AuthContextProvider({children}) {
    const navigate = useNavigate()
    const [responseMessage, setResponseMessage] = useState("")
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
                setResponseMessage(data.message)

                localStorage.setItem("userToken", data.token)
                setIsLoggedIn(true)
                navigate("/")
            }
            else {
                const data = await response.json()
                setResponseMessage(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const registerUser = async (formData,setIsLoggedIn) => {
        try {
            const response = await fetch("http://localhost:5000/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...formData,role:"user"})
            })


            if (response.status == 200) {
                const data = await response.json()
                setResponseMessage(data.message)

                localStorage.setItem("userToken", data.token)
                setIsLoggedIn(true)
                navigate("/")
            }
            else {
                const data = await response.json()
                console.log(data)
                setResponseMessage(data.message)
            }
        } catch (error) {
            console.log(error)
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
        responseMessage,
        setResponseMessage,
        userId
    }}>
        {children}
      
    </authContext.Provider>
  )
}

export default AuthContextProvider;
