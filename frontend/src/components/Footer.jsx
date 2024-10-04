import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const hours = [
        {
            id: 1,
            day: "Monday",
            time: "9:00 AM - 11:00 PM",
        },
        {
            id: 2,
            day: "Tuesday",
            time: "12:00 PM - 12:00 AM",
        },
        {
            id: 3,
            day: "Wednesday",
            time: "10:00 AM - 10:00 PM",
        },
        {
            id: 4,
            day: "Thursday",
            time: "9:00 AM - 9:00 PM",
        },
        {
            id: 5,
            day: "Monday",
            time: "3:00 PM - 9:00 PM",
        },
        {
            id: 6,
            day: "Saturday",
            time: "9:00 AM - 3:00 PM",
        },
    ];

    return (
        <div className='px-20 pb-20 pt-4 mt-40 a shadow-effect  flex gap-3  flex-col md:flex-row md:justify-between border-t border-slate-700'>
    
                <div id='quick-links' className=' mb-5'>
                    <h1 className='text-3xl font-bold'>HappyCare</h1>
                    <p className='text-2xl mt-2'>Quick links</p>
                    <ul className=' leading-7'>
                        <li> <Link to="/" className='hover:text-blue-500'>HOME</Link></li>
                        <li><Link to="/appointment" className='hover:text-blue-500'>APPOINTMENT</Link></li>
                        <li> <Link to="/about" className='hover:text-blue-500'>ABOUT US</Link></li>
                    </ul>
                </div>
          

            <div id='timings'>
                <h1 className='text-2xl font-semibold'>Hours</h1>
                <ul className='leading-7'>
                    {hours.map((item, index) => (
                        <li key={index}> {item.day} :  {item.time} </li>
                    ))}
                </ul>
            </div>

            <div id='contacts'>
                    <h1 className='font-semibold text-2xl'>Contact</h1>
                    <ul className='leading-7'>
                        <li>999-999-999</li>
                        <li>happyCare@gmail.com</li>
                        <li>delhi,India</li>
                    </ul>
            </div>
        </div>
    )
}

export default Footer
