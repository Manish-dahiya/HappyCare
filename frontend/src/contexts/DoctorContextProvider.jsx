import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';
export const doctorContext=createContext()

function DoctorContextProvider({children}) {
    const [allDoctors,setAllDoctors]=useState([])
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
                // setErrorMessage(data.message)
                toast.success(data.message)
            }
            else {
                const data=await response.json()
                toast.error(data.message)
                
            }
        } catch (error) {
            console.log("error",error)
            toast.error("some internal error occured")
        }
    }

    const cancelUserAppointment=async(appointmentId,setHasBookedAppointment)=>{
        try {
           const response= await fetch(`http://localhost:4000/user/cancelAppointment/${appointmentId}`) 
           if(response.status==200){
            toast.success("appointment canceled successfully")
            localStorage.removeItem("appointment")
            setHasBookedAppointment(false)
           }
           else{
            toast.error("error in canceling appointment")
           }
        } catch (error) {
            toast.error("some internal error occured")
        }
    }


  return (
    <doctorContext.Provider  value={{
        fetchAllDoctors,
        allDoctors,
        bookAppointment,
        cancelUserAppointment,
        appointmentInfo

    }}>
        {children}
    </doctorContext.Provider>
  )


}

export default DoctorContextProvider
