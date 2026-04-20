import React from 'react'
import { CiSearch } from 'react-icons/ci'

const Header = () => {
  return (
    <>
     <div className='text-xl flex justify-between items-center gap-2 m-4'>
       
        <a href="#">
          <h1 className=''>
            orchilla<span className='text-[#BA9D7F]'>Land</span>
          </h1>
        </a>

        <div >
          <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
            <li className='semi-bold '><a href="#courses"> courses </a></li>
            <li className='semi-bold '><a href="offers"> offers </a></li>
            <li className='semi-bold '><a href="#placemnet tests"> placement Tests</a></li>
          </ul>
        </div>

        <div className='relative hidden md:flex items-center justify-center gap-3'>
          <CiSearch className='absolute left-3 text-xl'/>
          <input type="text" placeholder='search...' className='py-2 pl-10 rounded-xl border-2 border-[#704032] text-base'/>
        </div>
       
      </div>
    </>
  )
}

export default Header