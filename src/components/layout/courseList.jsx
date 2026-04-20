import { useState, useMemo } from 'react'
import CourseCard from '../ui/courseCard'

const ALL_COURSES = [
  { id: 1, title: 'English Fundamentals',  lang: 'English', type: 'Group courses',              price: 'Free',  level: 'Beginner',     duration: '8 weeks',  students: 1240, color: '#378ADD', price_amount: null,   flag: '🇬🇧' },
  { id: 2, title: 'French Immersion VIP',  lang: 'French',  type: 'VIP courses',                price: 'Paid',  level: 'Intermediate', duration: '12 weeks', students: 84,   color: '#E85D26', price_amount: '$89',  flag: '🇫🇷' },
  { id: 3, title: 'Korean Conversation',   lang: 'Korean',  type: 'Conversation class',         price: 'Paid',  level: 'Intermediate', duration: '6 weeks',  students: 320,  color: '#1D9E75', price_amount: '$49',  flag: '🇰🇷' },
  { id: 4, title: 'Italian Practice Lab',  lang: 'Italian', type: 'Language practice sessions', price: 'Free',  level: 'Advanced',     duration: '4 weeks',  students: 560,  color: '#D4537E', price_amount: null,   flag: '🇮🇹' },
  { id: 5, title: 'English VIP Coaching',  lang: 'English', type: 'VIP courses',                price: 'Paid',  level: 'Advanced',     duration: '10 weeks', students: 45,   color: '#378ADD', price_amount: '$129', flag: '🇬🇧' },
  { id: 6, title: 'French Group Class',    lang: 'French',  type: 'Group courses',              price: 'Free',  level: 'Beginner',     duration: '8 weeks',  students: 980,  color: '#E85D26', price_amount: null,   flag: '🇫🇷' },
  { id: 7, title: 'Korean Practice',       lang: 'Korean',  type: 'Language practice sessions', price: 'Free',  level: 'Beginner',     duration: '4 weeks',  students: 430,  color: '#1D9E75', price_amount: null,   flag: '🇰🇷' },
  { id: 8, title: 'Italian Conversation',  lang: 'Italian', type: 'Conversation class',         price: 'Paid',  level: 'Intermediate', duration: '6 weeks',  students: 210,  color: '#D4537E', price_amount: '$55',  flag: '🇮🇹' },
  { id: 9, title: 'French Conversation',   lang: 'French',  type: 'Conversation class',         price: 'Paid',  level: 'Advanced',     duration: '5 weeks',  students: 175,  color: '#E85D26', price_amount: '$59',  flag: '🇫🇷' },
]

const PER_PAGE = 8

const SkeletonCard = () => (
  <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse'>
    <div className='h-28 bg-gray-100' />
    <div className='px-5 pt-4 pb-5 space-y-3'>
      <div className='h-3 bg-gray-100 rounded w-1/3' />
      <div className='h-12 bg-gray-50 rounded-xl' />
      <div className='flex justify-between'>
        <div className='h-6 bg-gray-100 rounded-full w-16' />
        <div className='h-6 bg-gray-100 rounded-full w-20' />
      </div>
    </div>
  </div>
)

const CourseList = ({ filters = {} }) => {

  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let list = ALL_COURSES.filter(c =>
      (!filters.price    || c.price === filters.price) &&
      (!filters.language || c.lang  === filters.language) &&
      (!filters.type     || c.type  === filters.type)
    )

    return list
  }, [filters])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSort = (val) => { setSort(val); setPage(1) }
  const handlePage = (p) => {
    setLoading(true)
    setTimeout(() => { setPage(p); setLoading(false) }, 400)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Toolbar */}
      <div className='flex items-center justify-between mt-8 mb-4'>
        <p className='text-sm text-gray-400'>
          Showing <span className='font-medium text-gray-600'>{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {Array(PER_PAGE).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {paginated.map((c, i) => <CourseCard key={c.id} c={c} index={i} />)}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <p className='text-5xl mb-4'>🔍</p>
          <p className='text-gray-700 font-medium mb-1'>No courses found</p>
          <p className='text-gray-400 text-sm'>Try adjusting or clearing your filters</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className='flex items-center justify-center gap-2 mt-10'>
          <button
            onClick={() => handlePage(page - 1)}
            disabled={page === 1}
            className='px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-400 hover:border-[#1D9E75] hover:text-[#1D9E75] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200'
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => handlePage(p)}
              className={`w-9 h-9 text-sm rounded-xl border transition-all duration-200 ${
                page === p
                  ? 'bg-[#1D9E75] text-white border-[#1D9E75]'
                  : 'border-gray-200 text-gray-400 hover:border-[#1D9E75] hover:text-[#1D9E75]'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
            className='px-4 py-2 text-sm rounded-xl border border-gray-200 text-gray-400 hover:border-[#1D9E75] hover:text-[#1D9E75] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200'
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}

export default CourseList