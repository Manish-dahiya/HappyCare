import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

export const doctorContext= createContext()

function DoctorContextProvider({children}) {
    const [allAppointments,setAllAppointments]=useState(null)
    const [allDoctors,setAllDoctors]=useState(null);
    //get all appointments
    const getAllAppointments=async()=>{
        try {
            const response= await fetch("http://localhost:4000/admin/getAllAppointments");
            if(response.status==200){
                const data= await response.json();
                setAllAppointments(data.data);
            }
            else{
                toast.error("error in fetching appointments") 
            }
        } catch (error) {
            toast.error("some internal error occured")
        }
    }

    //update the appointment request status
    const updateAppointmentStatus=async(status,id)=>{
        try {
            const response= await fetch("http://localhost:4000/admin/updateAppointmentStatus",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({status,id})
            })
            if(response.status==200){
                const data=response.json()
                toast.success("updated appointment status")
            }
            else{
              toast.error("error in updating appointment status")
            }
        } catch (error) {
               
        }
    }

    //add a new doc
    const addDoctor=async(formData)=>{
        try {
            const response= await fetch("http://localhost:4000/admin/addDoctor",{ //formData contains json and file.
                method:"POST",
                body:formData
            })
            if(response.status==200){
                toast.success("doctor added succesfully")
            }
            else{
               toast.error("error in adding doctor")
            }
        } catch (error) {
            //show message
        }
    }

    const getAllDoctors=async()=>{
        try {
            const response= await fetch('http://localhost:4000/admin/getAllDoctors');
            if(response.status==200){
                const data=await response.json();
                setAllDoctors(data);
            }
            else{
                toast.error("error in fetching doctors info.")
            }
        } catch (error) {
            //show message.
        }
    }




  return (
    <doctorContext.Provider value={{
        getAllAppointments,
        allAppointments,
        updateAppointmentStatus,
        addDoctor,
        getAllDoctors,
        allDoctors
    }}>
        {children}
    </doctorContext.Provider>
  )
}

export default DoctorContextProvider


