import React from 'react'
import { Link } from 'react-router-dom'   
import Membership from '../components/ui/membership'
import Reviews from '../components/ui/reviews'
import OfferList from '../components/layout/offerList'


import HeroImage from '../assets/hero-image.png'


const Home = () => (
  <>
    {/* Hero */}
    <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center min-h-[650px]'>
      <div className='flex flex-col justify-center py-14 md:pr-16 xl:pr-40'>
        <div className='text-center md:text-left space-y-6'>

          <p className='text-[#704032] uppercase font-semibold'>Your favorite Learning destination</p>
          <h1 className='text-2xl font-bold lg:text-4xl leading-tight!'>Learn languages. Speak with confidence.</h1>
          <p>Interactive online courses, real conversation practice, and personalized support to help you improve faster.</p>

          <div className='flex justify-center items-center gap-8 md:justify-start mt-8!'>
            <Link to='/courses'>
              <button className='bg-white text-amber-950 px-4 py-2 rounded-4xl'>Browse Courses</button>
            </Link>
            <Link to='/placement-test'>  {/* ← was '/placement-tests' (with an s), didn't match the route */}
              <button className='bg-green-700 text-white px-4 py-2 rounded-4xl'>Test your level</button>
            </Link>
          </div>
          
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <img src={HeroImage} className='w-80 md:w-2xl' />
      </div>
    </div>

    {/* Browse Languages */}
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <p className='text-center text-[#704032] uppercase font-semibold mb-6'>Available Languages</p>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {[{ name: 'English', flag: 'ENG' }, { name: 'French', flag: 'FR' }, { name: 'Italian', flag: 'IT' }, { name: 'Korean', flag: 'KR' }].map(({ name, flag }) => (
          <div key={name} className='flex flex-col items-center gap-2 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer'>
            <span className='text-xl'>{flag}</span>
            <p className='font-medium text-gray-700'>{name}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Membership */}
    <div className='max-w-6xl mx-auto px-4'>
      <Membership />
    </div>

    {/* Placement Test */}
    <div className='max-w-6xl mx-auto px-4 my-12'>
      <div className='bg-[#1D9E75] rounded-3xl px-10 py-12 flex flex-wrap gap-10 items-center justify-between'>
        <div className='max-w-sm'>
          <span className='text-[#9FE1CB] text-xs bg-white/10 px-3 py-1 rounded-full'>Free · 10 minutes</span>
          <h2 className='text-white text-3xl font-semibold mt-4 mb-3 leading-snug'>Not sure where to start?</h2>
          <p className='text-white/60 text-sm leading-relaxed mb-6'>Our placement test figures out your exact level in minutes — so you skip what you already know and jump straight into learning that actually challenges you.</p>
          <Link to='/placement-test'>

            <button className='inline-block bg-white text-[#0F6E56] font-medium px-7 py-3 rounded-full text-sm hover:bg-[#E1F5EE] transition'>Test your level →</button>
          </Link>
        </div>
        <div className='flex flex-col gap-4'>
          {[['10 min', 'Quick & focused'], ['A1 – C2', 'Full range coverage'], ['Instant', 'Results right away']].map(([stat, label]) => (
            <div key={stat} className='flex items-center gap-4'>
              <span className='text-white text-xl font-semibold w-24'>{stat}</span>
              <span className='text-white/50 text-sm'>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className='max-w-6xl mx-auto px-4 py-12'>
      <OfferList limit={3} showHeading={true} />
    </div>


    {/* Reviews */}
    <div className='max-w-6xl mx-auto px-4'>
      <Reviews />
    </div>

  </>
)

export default Home