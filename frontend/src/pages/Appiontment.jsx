import React, { useContext, useEffect, useState } from 'react'
import appointment from "../public/appointment.png"
import { doctorContext } from '../contexts/DoctorContextProvider';
import { authContext } from '../contexts/AuthContextProvider';
import { toast } from 'react-toastify';
import { decodeToken } from '../helper';
import { Link } from 'react-router-dom';
function Appiontment() {
    const init={
        firstName:"",
        lastName:"",
        email:"",
        phNumber:"",
        date:"",
        gender:"",
        dept:"general",
        doctor:"",
        // doctorId:"",
        address:""
    }

    const {userId}=useContext(authContext)
    const {fetchAllDoctors,allDoctors,bookAppointment,appointmentInfo,cancelUserAppointment}=useContext(doctorContext)
    const [depts,setAllDepts]=useState(null)
    const [doctors,setDoctors]=useState(null) //acc to the dept
    const [formData,setFormData]= useState(init);
    const [hasBookedAppointment,setHasBookedAppointment]=useState(localStorage.getItem("appointment")?true:false);
    const [cancelWarning,setCancelWarning]=useState(false)
    
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        fetchAllDoctors();

    },[])

   useEffect(()=>{
    const alldepts= allDoctors?.map((item)=>item.dept)

    setAllDepts(alldepts);

   },[allDoctors])

   useEffect(()=>{
        const docsAccToDept=allDoctors?.filter((item)=>item.dept==formData.dept);
        setDoctors(docsAccToDept)
   },[formData.dept])

   const handleAppointment=()=>{
    if(
        !formData.firstName.length==0,
        !formData.lastName.length==0,
        !formData.lastName.length==0,
        !formData.email.length==0,
        !formData.phNumber.length==0,
        !formData.date.length==0,
        !formData.gender.length==0,
        formData.dept.length==0,
        !formData.doctor.length==0,
        !formData.address.length==0
    ){
        const obj= {
            ...formData,
            patientId:userId,
        }
        bookAppointment(obj,setHasBookedAppointment);
    }
    else{
       toast.error("fill the fields first")
    }
   }

  const handleCancelAppointment=()=>{
    setCancelWarning((prev)=>!prev)
    toast.warning("Are you sure ? Press  confirm ")

  }

  const cancelAppointment=()=>{
    const appointmentString = localStorage.getItem("appointment");
    
    // Check if the appointment exists in localStorage
    if (appointmentString) {
        const appointment = JSON.parse(appointmentString);
        const appointmentId = appointment._id; // Access _id after parsing
        if (appointmentId) {
            cancelUserAppointment(appointmentId,setHasBookedAppointment); // Call the cancellation function
        } else {
            toast.error("No appointment ID found."); // More specific error message
        }
    } else {
        toast.error("No appointment found."); // User-friendly message
    }
  }

    return (
        <div className='px-20'>
            <div className='flex flex-col items-center justify-center md:flex-row md:justify-around mt-20'>
                <div id='left' className='w-[40vw] text-center md:text-start'>
                    <h1 className='font-bold text-xl md:3xl'>Schedule Your Appointment | HappCare Medical Institut</h1>
                    <p className='mt-7 text-xl'>
                        ZeeCare Medical Institute is a state-of-the-art facility dedicated
                        to providing comprehensive healthcare services with compassion and
                        expertise. Our team of skilled professionals is committed to
                        delivering personalized care tailored to each patient's needs. At
                        ZeeCare, we prioritize your well-being, ensuring a harmonious
                        journey towards optimal health and wellness.
                    </p>
                </div>
                <div id='right'>
                    <img src={appointment} alt="" className='h-96 animate-img' />
                </div>
            </div>

            {/* the form */}
            <div>
           {!hasBookedAppointment? 
           <>
           <div className='mt-20'>
                <h1 className='font-bold text-2xl'>Appointment</h1>
                <p className='text-xl text-slate-600 my-2'>Book your appointment Now !</p>

                <div id='fields' className='flex flex-col md:flex-row gap-3 '>
                    <div id='left' className='w-[45vw] '>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' id="" className='border border-slate-400 p-3  h-12 mb-3 w-full rounded-lg text-xl'/>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' id="" className='border border-slate-400 p-3 h-12 mb-3 w-full rounded-lg text-xl' />
                        <input type="email" name="email" placeholder='Email ' id="" value={formData.email} onChange={handleChange} className='border border-slate-400 p-3  h-12 mb-3 w-full rounded-lg text-xl'/>
                        <input type="text " name="phNumber" placeholder='Phone Number ' value={formData.phNumber} onChange={handleChange} id="" className='border p-3 border-slate-400  h-12 mb-3 w-full rounded-lg text-xl'/>
                    </div>

                    <div id='right' className=' w-[45vw]'>
                        <input type="datetime-local" name="date" placeholder='Date of Appointment ' value={formData.dob} onChange={handleChange} id="" className='border border-slate-400 p-3  h-12 mb-3 w-full rounded-lg text-xl'/>
                        <select name="gender" id="" value={formData.gender} onChange={handleChange} className='border border-slate-400   h-12 mb-3 w-full rounded-lg text-xl'>
                            <option value="" hidden >Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Others</option>
                        </select>
                        {/* department */}
                        <select name="dept" id="" value={formData.dept} onChange={handleChange} className='border border-slate-400   h-12 mb-3 w-full rounded-lg text-xl'>
                            <option value="" hidden>Select department</option>
                           {
                           depts?.map((item,index)=>(
                             <option value={item} key={index}>{item}</option> 
                           ))
                        }
                        </select>
                        {/*doctors according to the dept selection */}
                        <select name="doctor" id="" value={formData.doctor} onChange={handleChange} className='border border-slate-400   h-12 mb-3 w-full rounded-lg text-xl'>
                            <option value="" hidden>Select Doctor</option>
                            {
                                doctors?.map((item,index)=>(
                                    <option value={item._id} key={index}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <textarea name="address" row="30" id="" value={formData.address} onChange={handleChange} placeholder='Address'  className='border p-3 border-slate-400 h-52   mb-3 w-full rounded-lg text-xl'></textarea>
            </div>

                <button className='bg-blue-400 px-1 py-2 rounded-lg font-semibold hover:bg-blue-500' onClick={handleAppointment}>Appointment</button>
                       
                        </>:

                        <div id='booked-Appointment' className='ms-8 w-full'>
                            <div>
                            <h1 className='font-bold text-3xl '>Your Apointment</h1>
                          <p className='font-semibold text-xl mt-5'>User name : <span className='text-blue-500 font-semibold'>{appointmentInfo?.firstName + appointmentInfo?.lastName}</span></p>
                          <p className='font-semibold text-xl my-1'>department: <span className='text-blue-500 font-semibold'>{appointmentInfo?.dept}</span></p>
                          <p className='font-semibold text-xl my-1'>gender: <span className='text-blue-500 font-semibold'>{appointmentInfo?.gender}</span></p>
                          <p className='font-semibold text-xl my-1'>Appointment date: <span className='text-blue-500 font-semibold'>{appointmentInfo?.date}</span></p>
                          <p className='font-semibold text-xl my-1'>Appointment status: <span className={`${appointmentInfo?.request=="success"?"text-green-400" :  "text-red-400"} font-semibol`}>{appointmentInfo?.request}</span></p>
                          <p className='font-semibold text-xl my-1'>Your address: <span className='text-blue-500 font-semibold'>{appointmentInfo?.address}</span></p>
                            </div>
                        </div>
                        
                        
                        }
                        </div>

                        {
                            cancelWarning? 
                                <div className='flex '>
                                    <button className=' mt-3 ml-5 bg-blue-400 px-2 py-1 rounded-lg' onClick={cancelAppointment}>Confirm </button>
                                    <button className=' mt-3 ml-5 bg-red-400 px-2 py-1 rounded-lg' onClick={()=>setCancelWarning(false)}>Cancel </button>
                                </div>
                            :
                            <button className=' mt-3  bg-red-400 px-2 py-2 rounded-lg font-semibold' onClick={handleCancelAppointment}>Cancel Appointment</button>
                        }
                        
                    <div className='mt-10'>
                        <Link to="/payment" className=' bg-blue-400 px-6 hover:bg-blue-500 py-1 rounded-lg '>Pay</Link>
                    </div>
                        
            <footer className='text-center py-20'>
                <h1 className='font-bold text-slate-700'>Designed By Mansih Kumar </h1>
            </footer>
        </div>
    )
}

export default Appiontment
