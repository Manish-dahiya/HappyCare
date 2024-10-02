import React from 'react'
import Hero from "../public/hero.png"

function Home() {
    return (
        <div className='px-20 '>
            
           <div className='py-20 flex  justify-center md:flex-row md:justify-around flex-col'>
           <div id='left' className='w-full md:w-[40vw] order-2 md:order-1'>
                <h1 className='text-4xl font-bold mb-10 '>
                    Welcome to HappyCare Medical Institute | Your trusted HealCare provider
                </h1>

                <p className='text-xl  '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In dicta vel ab iusto. Est, neque modi ipsum eius soluta vero sapiente illum asperiores iure esse ratione deleniti architecto fuga quaerat reiciendis reprehenderit veritatis cupiditate! Ea maiores doloribus numquam voluptatibus delectus, aut amet repellendus fugiat eligendi, vitae quibusdam aperiam nisi hic!
                </p>
            </div>
            <div id='right' className='mt-10 md:mt-0 flex justify-center items-center order-1 md:order-2'>
                <img src={Hero} alt=""  className='animate-img h-96' />
            </div>
           </div>
        </div>
    )
}

export default Home
