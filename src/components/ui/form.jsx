import { useState } from 'react'
import { createPortal } from 'react-dom'

const Form = ({ course, onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!name || !email) return
    setSubmitted(true)
  }

  // ── success screen ─────────────────────────────────────────
  const successContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4'
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className='bg-white rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center max-w-sm w-full'
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className='w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4'
          style={{ background: `${course.color}15` }}
        >
          🎉
        </div>

        <h3 className='text-xl font-bold text-gray-900 mb-1'>
          You're enrolled!
        </h3>

        <p className='text-gray-400 text-sm mb-1'>
          Welcome to <strong className='text-gray-700'>{course.title}</strong>
        </p>

        <p className='text-gray-400 text-sm mb-6'>
          We'll send confirmation to{' '}
          <strong className='text-gray-700'>{email}</strong>
        </p>

        <button
          onClick={onClose}
          className='w-full py-3 rounded-2xl text-white font-semibold text-sm transition-all duration-200'
          style={{ background: course.color }}
        >
          Done
        </button>
      </div>
    </div>
  )

  // ── form screen ────────────────────────────────────────────
  const formContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4'
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose} 
    >
      <div
        className='bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto  scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.18)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── header ── */}
        <div
          className='px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 relative'
          style={{ background: `${course.color}10` }}
        >
          <button
            onClick={onClose}
            className='absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 text-lg'
          >
            ×
          </button>

          <img
            src={course.flag}
            alt={course.lang}
            className='w-12 h-12 sm:w-16 sm:h-16 object-contain mb-2'
          />

          <h2 className='text-lg sm:text-xl font-bold text-gray-900 mt-2 mb-1'>
            {course.title}
          </h2>

          <div className='flex items-center gap-2 flex-wrap'>
            <span
              className='text-xs font-semibold px-2.5 py-0.5 rounded-full'
              style={{ background: `${course.color}20`, color: course.color }}
            >
              {course.lang}
            </span>

            <span className='text-xs text-gray-400'>
              {course.level} · {course.duration}
            </span>

            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                course.price === 'Free'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {course.price === 'Free' ? 'Free' : course.price_amount}
            </span>
          </div>
        </div>

        {/* ── form body ── */}
        <div className='px-5 sm:px-8 py-5 sm:py-6 space-y-4'>
          <p className='text-xs uppercase tracking-widest font-semibold text-gray-400'>
            Your details
          </p>

          {/* name */}
          <div>
            <label className='block text-xs font-medium text-gray-500 mb-1.5'>
              Full name <span className='text-red-400'>*</span>
            </label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='e.g. Sarah Johnson'
              className='w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-200'
              style={{
                borderColor: name ? course.color : '#E5E7EB',
                boxShadow: name ? `0 0 0 3px ${course.color}15` : 'none',
              }}
            />
          </div>

          {/* email */}
          <div>
            <label className='block text-xs font-medium text-gray-500 mb-1.5'>
              Email address <span className='text-red-400'>*</span>
            </label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='email@example.com'
              className='w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-200'
              style={{
                borderColor: email ? course.color : '#E5E7EB',
                boxShadow: email ? `0 0 0 3px ${course.color}15` : 'none',
              }}
            />
          </div>

          {/* phone */}
          <div>
            <label className='block text-xs font-medium text-gray-500 mb-1.5'>
              Phone number{' '}
              <span className='text-gray-300 font-normal'>(optional)</span>
            </label>
            <input
              type='tel'
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder='055 000 0000'
              className='w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 placeholder-gray-300 focus:outline-none transition-all duration-200'
              style={{
                borderColor: phone ? course.color : '#E5E7EB',
                boxShadow: phone ? `0 0 0 3px ${course.color}15` : 'none',
              }}
            />
          </div>

          {(!name || !email) && (
            <p className='text-xs text-gray-300'>
              * Name and email are required
            </p>
          )}
        </div>

        {/* ── footer ── */}
        <div className='px-5 sm:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-3 rounded-2xl border border-gray-200 text-gray-400 text-sm font-semibold hover:border-gray-300 hover:text-gray-600 transition-all duration-200'
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!name || !email}
            className='flex-1 py-3 rounded-2xl text-white text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'
            style={{
              background: course.color,
              boxShadow:
                name && email ? `0 4px 16px ${course.color}44` : 'none',
            }}
          >
            Confirm Enrollment →
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(
    submitted ? successContent : formContent,
    document.body
  )
}

export default Form