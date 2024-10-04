import React, { createContext, useState } from 'react'

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
                //show message
               console.log("error in fetching all appointments")
            }
        } catch (error) {
            //show message
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
                //set message
            }
            else{
                console.log("error in updating the status")
            }
        } catch (error) {
                //message
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
                //show success message
            }
            else{
                console.log("error in adding doc")
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
                //show message
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


