import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faHouse } from '@fortawesome/free-solid-svg-icons'; // solid style
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons'; // solid style
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'; // For fa-solid fa-square-plus
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';   // For fa-solid fa-user-plus
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'; // For fa-solid fa-arrow-right-from-bracket
import { Link } from 'react-router-dom'




function Sidebar() {
    return (
        <div className='w-[70px] h-[100vh] py-32 '>
            <div className='flex flex-col gap-7 justify-center items-center'>
             <Link to={"/"} > <FontAwesomeIcon icon={faHouse} className='text-3xl text-white hover:text-slate-400' ></FontAwesomeIcon></Link>  
              <Link to="/doctors">  <FontAwesomeIcon icon={faUserDoctor} className='text-3xl text-white hover:text-slate-400'></FontAwesomeIcon></Link>
             <Link to="/addDoctor"> <FontAwesomeIcon icon={faSquarePlus} className='text-3xl text-white hover:text-slate-400'/></Link>   
                <FontAwesomeIcon icon={faUserPlus} className='text-3xl text-white hover:text-slate-400'/>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-3xl text-white hover:text-slate-400'/>
            </div>
        </div>
    )
}

export default Sidebar
