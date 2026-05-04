import { useState } from 'react'
import Filter from '../components/ui/filter'
import CourseList from '../components/layout/courseList'
import OfferList from '../components/layout/offerList'
import Form from '../components/ui/form'

const Courses = () => {
  const [filters, setFilters] = useState({})

  return (
    <>
      <div className='max-w-6xl mx-auto px-4 py-16'>

        {/* Page header */}
        <div className='mb-10'>
          <p className='text-xs uppercase tracking-widest text-[#1D9E75] font-semibold mb-2'>All courses</p>
          <h1 className='text-3xl font-bold text-gray-900'>Browse & find your course</h1>
          <p className='text-gray-400 text-sm mt-2'>Filter by language, price, or session type to find what fits you.</p>
        </div>

        <Filter onChange={setFilters} />
        <CourseList filters={filters} />

        {/* Special Offers */}
        <div className='mt-20 pt-12 border-t border-gray-100'>
          <OfferList />
        </div>
        
      </div>

    </>
  )
}

export default Courses