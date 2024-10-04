import React from 'react'
import docSkeleton from "../public/docSkeleton.jpg"
function DoctorCard({doc}) {
    return (
        <div className='rounded-lg bg-white w-[250px] flex flex-col p-4 justify-center items-center'>
            <div>
                <img src={`http://localhost:4000/docImages/${doc.avatar}`  ||docSkeleton } alt="" className='h-44 rounded-full' />
                <h1 className='font-semibold text-xl '>{doc.name}</h1>
            </div>
            <div className='mt-2 text-start'>
              <p><span className='font-semibold'>Email : </span><span>{doc.email}</span> </p>  
               <p><span className='font-semibold'>Phone : </span><span>{doc.phNumber}</span> </p> 
               <p><span className='font-semibold'>Department : </span><span>{doc.dept}</span> </p> 
               <p> <span className='font-semibold'>Gender : </span><span>{doc.gender}</span> </p>
            </div>
        </div>
    )
}

export default DoctorCard
