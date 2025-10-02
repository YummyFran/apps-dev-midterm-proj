import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='px-[2rem] py-4 lg:px-[10rem] h-[calc(100vh_-_60px)]'>
        <div className="h-[90%] rounded-lg overflow-hidden relative shadow-lg">
            <img src="/assets/hero.jpg" alt="hero" />

            <div className="absolute text-white top-[50%] right-20 translate-y-[-50%] flex flex-col">
                <div className='text-[5rem] font-mono'>Simple is More</div>
                <Link to={'/browse'} className='hover:underline self-end flex gap-2 items-center'>Browse products <FaArrowRightLong /></Link>
            </div>
        </div>
    </div>
  )
}

export default Hero