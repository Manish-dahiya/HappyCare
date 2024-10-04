import React, { useContext, useEffect, useState } from 'react'
import doc from "../public/doc.png"
import { doctorContext } from '../contexts/DoctorContextProvider'
function Home() {

    const {getAllAppointments,allAppointments,updateAppointmentStatus}=useContext(doctorContext )
    const [requestStatus,setRequestStatus]=useState()

    const handleRequestStatus=(e,id)=>{
        updateAppointmentStatus(e.target.value,id)
    }

    useEffect(()=>{
        getAllAppointments()
           },[])

  return (
    <div className='border #e5e5e5 h-full w-full bg-[#e5e5e5] rounded-l-3xl p-2 md:p-10'>
        <div id='top' className='flex flex-col  md:grid  md:grid-cols-[2fr_1fr_1fr] gap-4'>
            <div id='intro' className=' rounded-xl  h-48 flex items-center bg-[#b3b6fe]'>
                <img src={doc} alt="" className='h-52'/>
                <p className='text-sm md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque consectetur laborum tempora praesentium sapiente sint dicta nostrum cupiditate atque animi!</p>
            </div>
            <div id='total-appointments' className='h-48 text-3xl font-semibold rounded-lg flex justify-center items-center bg-[#3942d8]'>
                1300 Apointments
            </div>
            <div id='total-docs' className='h-48 text-3xl font-semibold bg-white rounded-lg  border flex justify-center items-center'>
                100 doctors
            </div>
        </div>

        <div id='appointments' className='bg-white mt-9 md:p-5 rounded-lg h-96 overflow-y-scroll'>
            <h1 className='font-semibold text-2xl'>Appointments</h1>
            <table className='table-auto w-full text-center mt-5' >
                <tbody>
                <tr className='' >
                    <th className='h-1/5'>Patient </th>
                    <th className='1/5'>Date</th>
                    <th className='h-1/5'>Doctor</th>
                    <th className='h-1/5'>Department</th>
                    <th className='h-1/5'>Status</th>
                </tr>
                {
                    allAppointments?.map((item,index)=>(
                        <tr key={index} className='h-7 font-semibold text-slate-600'>
                            <td>{item.firstName + " " + item.lastName}</td>
                            <td>{item.date}</td>
                            <td>{item.doctorId?.name}</td>
                            <td>{item.dept}</td>
                            <td>
                                <select name="request" id="" onChange={(e)=>handleRequestStatus(e,item._id)}>
                                    <option value="" hidden>{item.request}</option>
                                    <option value="success">success</option>
                                    <option value="reject">reject</option> 
                                    <option value="pending">pending</option> 
                                </select>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default Home
