import { useState, useEffect, useRef } from 'react'

const data = [
  { lang: 'French', color: '#E85D26', reviews: [
    { name: 'Camille R.', text: 'I went from zero to holding full conversations in 4 months. The structure is incredible.' },
    { name: 'Marcus T.', text: 'The tutors actually care. My accent improved faster than I expected.' },
    { name: 'Sofia L.', text: 'Best investment I made this year. French was always a dream and now it\'s real.' },
  ]},
  { lang: 'English', color: '#378ADD', reviews: [
    { name: 'Yuna K.', text: 'My confidence speaking English at work has completely changed. I got a promotion.' },
    { name: 'Omar B.', text: 'The placement test put me in exactly the right level. No wasted time.' },
    { name: 'Priya M.', text: 'I passed my IELTS on the first try after 3 months here. Couldn\'t believe it.' },
  ]},
  { lang: 'Italian', color: '#D4537E', reviews: [
    { name: 'James W.', text: 'I moved to Milan and could actually talk to my neighbors by week 6. Magical.' },
    { name: 'Aisha D.', text: 'The courses are so well paced. I never felt overwhelmed or bored.' },
    { name: 'Léa F.', text: 'Italian grammar finally clicked. The explanations here are just better.' },
  ]},
  { lang: 'Korean', color: '#1D9E75', reviews: [
    { name: 'Tom H.', text: 'I can read Hangul and watch K-dramas without subtitles now. Worth every minute.' },
    { name: 'Nina S.', text: 'The spaced repetition system is smart. Vocab stuck in ways Duolingo never achieved.' },
    { name: 'Carlos M.', text: 'Korean seemed impossible. Three months later I\'m having real conversations online.' },
  ]},
]

const Reviews = () => {
  const [cur, setCur] = useState(0)
  const [key, setKey] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) {
        setCur(p => (p + 1) % data.length)
        setKey(k => k + 1)
      }
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const go = (i) => { setCur(i); setKey(k => k + 1) }
  const { lang, color, reviews } = data[cur]

  return (
    <div className='py-16 px-4 text-center bg-white rounded-3xl mx-auto '>
        <div className='py-16 px-4 text-center'>
        <p className='text-xs uppercase tracking-widest text-gray-400 mb-2'>What our students say</p>
        <h2 className='text-2xl font-semibold text-gray-900 mb-10'>Real results, real people</h2>

        <p className='text-xs uppercase tracking-widest font-medium mb-4 transition-colors duration-300'
            style={{ color }}>
            {lang}
        </p>

        <div
            key={key}
            className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto'
            onMouseEnter={() => paused.current = true}
            onMouseLeave={() => paused.current = false}
        >
            {reviews.map((r, i) => (
            <div
                key={i}
                className='rounded-xl p-5 text-left animate-fade-up'
                style={{
                border: `1.5px solid ${color}30`,
                backgroundColor: `${color}18`,
                animationDelay: `${i * 120}ms`,
                animationFillMode: 'both',
                }}
            >
                <p className='text-xs mb-2' style={{ color }}>★★★★★</p>
                <p className='text-sm text-gray-500 leading-relaxed'>"{r.text}"</p>
                <p className='text-sm font-medium text-gray-700 mt-3'>— {r.name}</p>
            </div>
            ))}
        </div>

        <div className='flex justify-center gap-2 mt-6'>
            {data.map((d, i) => (
            <button
                key={i}
                onClick={() => go(i)}
                className='h-1.5 rounded-full transition-all duration-300'
                style={{ width: cur === i ? '16px' : '6px', background: cur === i ? d.color : '#D1D5DB' }}
            />
            ))}
        </div>

        </div>
    </div>
  )
}

export default Reviews