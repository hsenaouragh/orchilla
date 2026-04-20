import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import CourseCard from '../components/ui/CourseCard'
import PlacementTestButton from '../components/ui/button'

// ── female student image (put your actual import here) ──────────────────────
import FemaleStudent from '../assets/online-test.png'
import MaleStudent   from '../assets/online-test-male.png'

// ── language metadata ────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: 'english',  label: 'English',  flag: '🇬🇧', color: '#2563EB', accent: '#DBEAFE' },
  { id: 'french',   label: 'French',   flag: '🇫🇷', color: '#DC2626', accent: '#FEE2E2' },
  { id: 'italian',  label: 'Italian',  flag: '🇮🇹', color: '#16A34A', accent: '#DCFCE7' },
  { id: 'korean',   label: 'Korean',   flag: '🇰🇷', color: '#9333EA', accent: '#F3E8FF' },
]

// ── sample courses shown after language is chosen ────────────────────────────
const SAMPLE_COURSES = {
  english: [
    { title: 'English for Beginners', lang: 'English', flag: '🇬🇧', type: 'Group courses', duration: '3 mo', level: 'A1', students: 1240, price: 'Free',    price_amount: 'Free',   color: '#2563EB' },
    { title: 'Conversational English', lang: 'English', flag: '🇬🇧', type: 'VIP courses',   duration: '2 mo', level: 'B2', students: 620,  price: 'Paid',    price_amount: '$49/mo', color: '#2563EB' },
    { title: 'Business English',       lang: 'English', flag: '🇬🇧', type: 'Group courses', duration: '4 mo', level: 'C1', students: 430,  price: 'Paid',    price_amount: '$39/mo', color: '#2563EB' },
  ],
  french: [
    { title: 'French Fundamentals',    lang: 'French',  flag: '🇫🇷', type: 'Group courses', duration: '3 mo', level: 'A1', students: 890,  price: 'Free',    price_amount: 'Free',   color: '#DC2626' },
    { title: 'French Conversation',    lang: 'French',  flag: '🇫🇷', type: 'VIP courses',   duration: '2 mo', level: 'B1', students: 310,  price: 'Paid',    price_amount: '$45/mo', color: '#DC2626' },
    { title: 'Advanced French',        lang: 'French',  flag: '🇫🇷', type: 'Group courses', duration: '5 mo', level: 'C2', students: 205,  price: 'Paid',    price_amount: '$55/mo', color: '#DC2626' },
  ],
  italian: [
    { title: 'Italian Starter',        lang: 'Italian', flag: '🇮🇹', type: 'Group courses', duration: '2 mo', level: 'A1', students: 560,  price: 'Free',    price_amount: 'Free',   color: '#16A34A' },
    { title: 'Italian Culture & Talk', lang: 'Italian', flag: '🇮🇹', type: 'VIP courses',   duration: '3 mo', level: 'B1', students: 280,  price: 'Paid',    price_amount: '$42/mo', color: '#16A34A' },
    { title: 'Italian Proficiency',    lang: 'Italian', flag: '🇮🇹', type: 'Group courses', duration: '4 mo', level: 'C1', students: 140,  price: 'Paid',    price_amount: '$50/mo', color: '#16A34A' },
  ],
  korean: [
    { title: 'Korean from Scratch',    lang: 'Korean',  flag: '🇰🇷', type: 'Group courses', duration: '3 mo', level: 'A1', students: 720,  price: 'Free',    price_amount: 'Free',   color: '#9333EA' },
    { title: 'K-Drama Korean',         lang: 'Korean',  flag: '🇰🇷', type: 'VIP courses',   duration: '2 mo', level: 'A2', students: 510,  price: 'Paid',    price_amount: '$40/mo', color: '#9333EA' },
    { title: 'Fluent Korean',          lang: 'Korean',  flag: '🇰🇷', type: 'Group courses', duration: '5 mo', level: 'B2', students: 195,  price: 'Paid',    price_amount: '$52/mo', color: '#9333EA' },
  ],
}

// ── tiny animated stat pill ──────────────────────────────────────────────────
const StatPill = ({ icon, label }) => (
  <div className='flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-white text-xs font-medium'>
    <span>{icon}</span>
    <span>{label}</span>
  </div>
)

// ── language selector card ───────────────────────────────────────────────────
const LangCard = ({ lang, selected, onSelect }) => (
  <button
    onClick={() => onSelect(lang.id)}
    className='relative flex flex-col items-center gap-2 px-6 py-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer focus:outline-none'
    style={{
      borderColor: selected ? lang.color : '#E5E7EB',
      background:  selected ? lang.accent : '#fff',
      boxShadow:   selected ? `0 4px 20px ${lang.color}30` : '0 1px 4px rgba(0,0,0,0.04)',
      transform:   selected ? 'scale(1.04)' : 'scale(1)',
    }}
  >
    {selected && (
      <span
        className='absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold'
        style={{ background: lang.color }}
      >✓</span>
    )}
    <span className='text-3xl'>{lang.flag}</span>
    <span className='text-sm font-semibold text-gray-700'>{lang.label}</span>
  </button>
)

// ── main page ────────────────────────────────────────────────────────────────
const PlacementTest = () => {
  const [selectedLang, setSelectedLang] = useState(null)
  const coursesRef = useRef(null)

  const activeLang = LANGUAGES.find(l => l.id === selectedLang)
  const courses    = selectedLang ? SAMPLE_COURSES[selectedLang] : []

  const navigate = useNavigate()

  return (
    <>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className='relative overflow-hidden'
        style={{
          background: 'linear-gradient(135deg, #3B5BDB 0%, #4C6EF5 40%, #7048E8 100%)',
          minHeight: 520,
        }}
      >
        {/* decorative blobs */}
        <div className='absolute top-0 left-0 w-72 h-72 rounded-full opacity-20'
          style={{ background: '#fff', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
        <div className='absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10'
          style={{ background: '#a78bfa', filter: 'blur(100px)', transform: 'translate(20%, 30%)' }} />

        {/* wavy bottom divider */}
        <svg className='absolute bottom-0 left-0 w-full' viewBox='0 0 1440 80' preserveAspectRatio='none' style={{ height: 60 }}>
          <path d='M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z' fill='#F9FAFB' />
        </svg>

        <div className='relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center pt-16 pb-16 gap-10'>

          {/* ── left copy ── */}
          <div className='flex-1 max-w-lg pb-4 md:pb-0'>
            {/* pill badge */}
            <span className='inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5'>
              <span>⚡</span> Free · Takes only 10 minutes
            </span>

            <h1 className='text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4'>
              Test Your<br />
              <span style={{ color: '#A5F3FC' }}>Language Level</span>
            </h1>
            <p className='text-white/70 text-sm leading-relaxed mb-8 max-w-sm'>
              Our adaptive placement test pinpoints your exact level — A1 to C2 — so you enroll in the course that's actually right for you.
            </p>

            <div className='flex flex-wrap gap-3 mb-8'>
              <StatPill icon='🎯' label='Adaptive questions' />
              <StatPill icon='📊' label='Instant results' />
              <StatPill icon='🏆' label='A1 – C2 coverage' />
            </div>

            {/* CTA */}
            <div className='flex flex-wrap gap-3'>
              <PlacementTestButton size='lg' color='#fff'
                style={{ color: '#3B5BDB', fontWeight: 700 }}
                onClick={() => document.getElementById('lang-picker')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start the test →
              </PlacementTestButton>
              
                <PlacementTestButton variant='outline' size='lg' color='#fff'>
                  Browse courses
                </PlacementTestButton>
            
            </div>
          </div>

          {/* ── hero images (the two students, in colour) ── */}
          <div className='flex gap-4'> 

  {/* Left image */}
  <div className='w-80 h-60 bg-gray-400 rounded-r-full border-4 border-amber-600 overflow-hidden'>
    <img 
      src={MaleStudent} 
      alt="male-reading"
      className='w-full h-full object-cover object-bottom'
    />
  </div>

  {/* Right image */}
  <div className='w-80 h-60 bg-gray-400 rounded-l-full overflow-hidden'>
    <img 
      src={FemaleStudent} 
      alt="female-reading"
      className='w-full h-full object-cover object-bottom'
    />
  </div>

</div>

        </div>
      </section>

      {/* ── LANGUAGE PICKER ──────────────────────────────────────────────── */}
      <section id='lang-picker' className='max-w-6xl mx-auto px-4 pt-16 pb-10'>
        <p className='text-center text-[#704032] uppercase font-semibold text-xs tracking-widest mb-3'>Step 1</p>
        <h2 className='text-center text-2xl font-bold text-gray-900 mb-2'>Choose your language</h2>
        <p className='text-center text-gray-400 text-sm mb-10'>Select the language you want to be tested in</p>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto'>
          {LANGUAGES.map(lang => (
            <LangCard
              key={lang.id}
              lang={lang}
              selected={selectedLang === lang.id}
              onSelect={setSelectedLang}
            />
          ))}
        </div>

        {/* start button — appears after picking */}
        {selectedLang && (
          <div className='flex justify-center mt-8'>
            <PlacementTestButton size='lg' color={activeLang?.color} onClick={() => navigate(`/test?lang=${selectedLang}`)}>
                Start {activeLang?.label} test →
            </PlacementTestButton>
          </div>
        )}
      </section>

      {/* ── RECOMMENDED COURSES ──────────────────────────────────────────── */}
      {selectedLang && (
        <section ref={coursesRef} className='max-w-6xl mx-auto px-4 py-12'>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-2xl'>{activeLang?.flag}</span>
            <p className='text-[#704032] uppercase font-semibold text-xs tracking-widest'>Step 2</p>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-1'>
            {activeLang?.label} courses you might like
          </h2>
          <p className='text-gray-400 text-sm mb-8'>
            After your test, we'll recommend the perfect one — browse ahead to see what's available.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {courses.map((c, i) => (
              <CourseCard key={c.title} c={c} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS (static info strip) ────────────────────────────── */}
      <section className='max-w-6xl mx-auto px-4 py-12'>
        <div className='rounded-3xl p-10' style={{ background: '#F0FDF4' }}>
          <p className='text-center text-[#704032] uppercase font-semibold text-xs tracking-widest mb-8'>How the test works</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            {[
              { icon: '🧩', title: 'Adaptive questions', desc: 'The test adjusts to your answers, getting harder or easier in real time.' },
              { icon: '⏱️', title: '~10 minutes',        desc: 'Short, focused, and designed so you can take it anytime, anywhere.' },
              { icon: '📋', title: 'Instant results',    desc: 'Get your CEFR level (A1–C2) the moment you finish.' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className='text-4xl mb-3'>{icon}</div>
                <h3 className='font-semibold text-gray-900 mb-2'>{title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default PlacementTest