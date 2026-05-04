import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import {ShoppingCart , Person} from '@gravity-ui/icons';

const Header = () => {
  return (
    <div className='text-xl flex justify-between items-center gap-2 m-4 bg-white p-4 rounded-full'>
      
      {/* Logo */}
      <Link to='/'>
        <h1>
          orchilla<span className='text-[#BA9D7F]'>Land</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
        
        <li>
          <Link to='/courses'>courses</Link>
        </li>

        <li>
          <a href='#offers' className='scroll-smooth'>offers</a>
        </li>

        <li>
          <Link to='/placement-test'>placement Tests</Link>
        </li>

      </ul>

      {/* Search */}
      <div className='relative hidden md:flex items-center justify-center gap-3'>
        <CiSearch className='absolute left-3 text-xl'/>
        <input
          type="text"
          placeholder='search...'
          className='py-2 pl-10 rounded-xl border-2 border-[#704032] text-base'
        />
      </div>

      {/* Profile */}
      <div className='flex items-center gap-4'>
        <button>
          <ShoppingCart className='text-amber-600 size-6'/>
        </button>

        <button>
          <Person className='text-amber-600 size-6'/>
        </button>
      </div>

    </div>
  )
}

export default Header