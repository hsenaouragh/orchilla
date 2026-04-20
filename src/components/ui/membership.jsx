import { useState, useEffect } from 'react'
import FaceId from '../../assets/face-id.png'

const cards = [
  { bg: '#1D9E75', accent: '#0F6E56', label: 'Premium Member', name: 'Sarah Johnson', id: 'LG-2024-0391', level: 'Advanced · English', title: 'Learn at your own pace', body: 'Our adaptive curriculum adjusts to your level and schedule. Whether you have 10 minutes or 2 hours, every session is designed to move you forward efficiently.' },
  { bg: '#534AB7', accent: '#3C3489', label: 'Pro Member', name: 'Ahmed Benali', id: 'LG-2024-0512', level: 'Intermediate · French', title: 'Real conversation practice', body: 'Go beyond grammar drills. Practice with AI tutors and native speakers through live scenarios that build confidence for real-world situations.' },
]



const Card = ({ c, style }) => (
  <div className="absolute inset-0 rounded-2xl p-4 flex flex-col justify-between" style={{ background: c.bg, ...style }}>
    <div className="flex justify-between">
      <div>
        <p className="text-white/50 text-[9px] uppercase tracking-widest">LinguaLearn</p>
        <p className="text-white text-[10px] font-medium mt-0.5">{c.label}</p>
      </div>
      <img src={FaceId} className='w-10'/>
    </div>
    <div className="flex justify-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ background: c.accent }}>
        {c.name.split(' ').map(n => n[0]).join('')}
      </div>
    </div>
    <div>
      <p className="text-white text-xs font-medium">{c.name}</p>
      <p className="text-white/50 text-[9px] mt-0.5">{c.level}</p>
      <p className="text-white/30 text-[8px] tracking-widest mt-1">{c.id}</p>
    </div>
  </div>
)

export default function FeatureCard() {
  const [i, setI] = useState(0)
  const [jumping, setJumping] = useState(false)

  const advance = () => {
    if (jumping) return
    setJumping(true)
    setTimeout(() => { setI(p => (p + 1) % cards.length); setJumping(false) }, 500)
  }

  useEffect(() => { const t = setInterval(advance, 3500); return () => clearInterval(t) }, [jumping])

  const curr = cards[i], next = cards[(i + 1) % cards.length]

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 flex flex-col md:flex-row gap-10 items-center">

        <div className="relative shrink-0 w-36 h-52">
          <Card c={curr} style={{ transform: 'rotate(3deg) translateX(8px)', zIndex: 1, transition: jumping ? 'transform .5s ease-in, opacity .5s ease-in' : 'none', ...(jumping && { transform: 'rotate(-6deg) translateX(-8px)', opacity: 0.7 }) }} />
          <Card c={next} style={{ transform: jumping ? 'rotate(3deg) translateX(8px)' : 'rotate(-6deg) translateX(-8px)', zIndex: jumping ? 2 : 0, opacity: jumping ? 1 : 0.7, transition: jumping ? 'transform .5s cubic-bezier(.34,1.56,.64,1)' : 'none' }} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div key={i} className="animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{curr.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{curr.body}</p>
          </div>
          <div className="flex gap-2 justify-center md:justify-start">
            {cards.map((_, j) => (
              <button key={j} onClick={advance} className={`h-1.5 rounded-full transition-all duration-300 ${i === j ? 'w-6 bg-[#1D9E75]' : 'w-1.5 bg-gray-200'}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}