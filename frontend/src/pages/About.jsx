import React from 'react'
import about from "../public/about.png"
import about2 from "../public/about2.png"
function About() {
    return (
        <div className='px-20'>
            <div id='top' className='mt-10 w-full flex justify-center items-center  flex-col md:flex-row md:justify-around'>
                <div className='w-[40vw]  '>
                    <div className='text-center md:text-start'>
                        <h1 className='font-bold text-3xl'>Learn More About Us!</h1>
                        <h1 className='font-bold text-3xl'>HappyCare Medical Institue</h1>

                        <p className='mt-7 text-xl'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores id incidunt ipsum non, eveniet minus est mollitia minima qui corporis!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, debitis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, in!
                        </p>
                    </div>


                </div>
                <div id='right'>  <img src={about} alt="" className='animate-img h-96' /></div>
            </div>


            <div id='bottom' className='mt-10 w-full flex flex-col justify-center items-center   md:flex-row md:justify-around'>
                <div id='right ' className='order-2 md:order-1'>  <img src={about2} alt="" className='animate-img h-96 '  /></div>
                <div className='w-[40vw]  order-1 md:order-2  '>
                    <div className='text-center md:text-start'>
                        <h1 className='font-bold text-3xl'>Biography</h1>
                        <h1 className='font-bold text-3xl'>who we are ?</h1>

                        <p className='mt-7 text-xl'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores id incidunt ipsum non, eveniet minus est mollitia minima qui corporis!
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, debitis! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, in!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
