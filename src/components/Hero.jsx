import React from 'react'

const Hero = () => {
  return (
    <div className='px-[2rem] py-4 lg:px-[10rem] h-[calc(100vh_-_60px)]'>
        <div className="h-[90%] rounded-lg overflow-hidden relative shadow-lg">
            <img src="/assets/hero.jpg" alt="hero" />

            <div className="absolute text-white text-[5rem] font-mono top-[50%] right-20 translate-y-[-50%]">Simple is More</div>
        </div>
    </div>
  )
}

export default Hero