import React, { useState } from 'react'
import { IoSearchOutline, IoCartOutline  } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';


const Nav = ({ value }) => {
    const [search, setSearch] = useState(value)
    const nav = useNavigate()

    const handleSearch = e => {
        e.preventDefault()

        nav('/browse?q=' + search)
    }
  return (
    <div className='flex justify-between items-center px-[2rem] lg:px-[10rem] py-3 gap-2 lg:gap-12 sticky top-0 h-15 bg-white z-10'>
        <div className='font-bold text-xl'>Shi</div>
        <div className="flex-1 border border-gray-500 rounded flex items-center pl-2 gap-2 bg-gray-50">
            <IoSearchOutline className='text-gray-500'/>
            <form action={"/browse"} className='w-full' onSubmit={handleSearch}>
                <input className='py-2 pr-4 outline-0 w-full text-md' value={search || ""} onChange={e => setSearch(e.target.value)} type="text" name="q" id="search" placeholder='What are you looking for?'/>
            </form>
        </div>
        <div className='cart text-2xl'>
            <IoCartOutline />
        </div>
    </div>
  )
}

export default Nav