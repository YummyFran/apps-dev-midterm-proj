import React from 'react'
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";


const Nav = () => {
  return (
    <div className='flex justify-between items-center px-[2rem] lg:px-[10rem] py-3 gap-2 lg:gap-12 sticky top-0 h-15 bg-white z-10'>
        <div className='font-bold text-xl'>Shi</div>
        <div className="flex-1 border border-gray-500 rounded flex items-center pl-2 gap-2 bg-gray-50">
            <IoSearchOutline className='text-gray-500'/>
            <input className='py-2 pr-4 outline-0 w-full text-md' type="text" name="search" id="search" placeholder='What are you looking for?'/>
        </div>
        <div className='cart text-2xl'>
            <IoCartOutline />
        </div>
    </div>
  )
}

export default Nav