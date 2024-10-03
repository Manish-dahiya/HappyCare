import React, { createContext, useState } from 'react'

export const doctorContext=createContext()

function DoctorContextProvider({children}) {
    const [allDoctors,setAllDoctors]=useState([])
    const [errorMessage,setErrorMessage]=useState("");
    const [appointmentInfo, setAppointmentInfo] = useState(() => {   //it handle the page refrsh as well
        // Retrieve appointment from localStorage and parse it
        const savedAppointment = localStorage.getItem("appointment");
        return savedAppointment ? JSON.parse(savedAppointment) : null;
    });

    const fetchAllDoctors=async ()=>{
        const response=    await fetch("http://localhost:4000/admin/getAllDoctors")
        if(response.status==200){
            const data=await response.json();
            setAllDoctors(data);
            
        }
        else{
            console.log("something went wrong in fetching info!!")
        }
    }

    const bookAppointment=async(formData,setHasBookedAppointment)=>{
        try {
            const response= await fetch("http://localhost:4000/user/bookAppointment",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            if(response.status==200){
                const data=await response.json()
                setAppointmentInfo(data.data)
              
                localStorage.setItem("appointment", JSON.stringify(data.data));
                setHasBookedAppointment(true);
                setErrorMessage(data.message)
            }
            else {
                const data=await response.json()
                setErrorMessage(data.message)
            }
        } catch (error) {
            console.log("error",error)
           
            setErrorMessage("some internal error occured .Please try again after some time.")
        }
    }


  return (
    <doctorContext.Provider  value={{
        fetchAllDoctors,
        allDoctors,
        bookAppointment,
        errorMessage,
        setErrorMessage,
        appointmentInfo

    }}>
        {children}
    </doctorContext.Provider>
  )


}

export default DoctorContextProvider
