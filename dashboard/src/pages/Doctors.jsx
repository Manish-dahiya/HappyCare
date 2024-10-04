import React, { useContext, useEffect } from 'react'
import DoctorCard from '../components/DoctorCard';
import { doctorContext } from '../contexts/DoctorContextProvider';

function Doctors() {

    const {getAllDoctors,allDoctors}=useContext(doctorContext)

    useEffect(()=>{
        getAllDoctors()
        
    },[])
   

  return (
    <div className=' #e5e5e5 h-full w-full bg-[#e5e5e5] rounded-l-3xl p-10 text-center'>
        <h1>Our Doctors</h1>
        <div className='flex flex-wrap justify-center items-center gap-6 w-full'>
            {
                allDoctors?.map((item,index)=>(
                    <DoctorCard doc={item}/>
                ))
            }
        </div>

    </div>
  )
}

export default Doctors
