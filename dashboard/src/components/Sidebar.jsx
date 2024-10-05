import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faHouse } from '@fortawesome/free-solid-svg-icons'; // solid style
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'; // solid style
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'; // For fa-solid fa-square-plus
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';   // For fa-solid fa-user-plus
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // For fa-solid fa-arrow-right-from-bracket
import { Link } from 'react-router-dom'
import Popup from './Popup';




function Sidebar() {
    const [isPopup,setIsPopup]=useState(false)

    return (
       <>
        <div className='w-[70px] h-[100vh] py-32 '>
            <div className='flex flex-col gap-7 justify-center items-center'>
             <Link to={"/home"} > <FontAwesomeIcon icon={faHouse} className='text-3xl text-white hover:text-slate-400' ></FontAwesomeIcon></Link>  
              <Link to="/doctors">  <FontAwesomeIcon icon={faUserDoctor} className='text-3xl text-white hover:text-slate-400'></FontAwesomeIcon></Link>
             <Link to="/addDoctor"> <FontAwesomeIcon icon={faSquarePlus} className='text-3xl text-white hover:text-slate-400'/></Link>   
               <Link to="/addAdmin" > <FontAwesomeIcon icon={faUserPlus} className='text-3xl text-white hover:text-slate-400'/></Link>
              <button onClick={()=>setIsPopup(!isPopup)}><FontAwesomeIcon icon={faArrowRightFromBracket} className='text-3xl text-white hover:text-slate-400'/></button>  
            </div>
            
        </div>
        {isPopup && <Popup  isPopup={isPopup} setIsPopup={setIsPopup} />}
       </>
    )
}

export default Sidebar
