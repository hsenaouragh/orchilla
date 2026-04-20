import { useState } from 'react'
import OfferCard from '../ui/offerCard'

// ─── Offer data ───────────────────────────────────────────────────────────────
const OFFERS = [
  {
    id: 1,
    tag: 'Bundle Deal',
    badge: '🔥 Most Popular',
    icon: '🌍',
    title: 'Two Languages for the Price of One',
    subtitle: 'Master any two languages simultaneously with our expert-paired curriculum and shared scheduling.',
    originalPrice: '$198 / month',
    finalPrice: '$99 / month',
    savings: '50%',
    expiresIn: '3 days',
    color: '#6366F1',
    gradient: 'linear-gradient(140deg, #4F46E5 0%, #7C3AED 60%, #9333EA 100%)',
    languages: ['🇬🇧 English', '🇫🇷 French', '🇮🇹 Italian', '🇰🇷 Korean'],
    benefits: [
      { icon: '📚', label: 'Access to 2 full language courses', detail: 'All levels A1–C2 included for both languages' },
      { icon: '🎯', label: 'Personalized dual-language study plan', detail: 'Our AI pairs languages based on your learning style' },
      { icon: '👩‍🏫', label: '4 live sessions per week', detail: '2 sessions per language, 45 min each with a native teacher' },
      { icon: '📝', label: 'Shared grammar checkpoint tests', detail: 'Bilingual exercises that reinforce both languages together' },
      { icon: '💬', label: 'Priority community access', detail: 'Direct messaging with teachers + peer groups for each language' },
    ],
  },
  {
    id: 2,
    tag: 'Intensive Program',
    badge: '⚡ Limited Spots',
    icon: '🚀',
    title: 'Accelerated Grammar Mastery Class',
    subtitle: 'Go from shaky foundations to C1-level grammar confidence in just 6 weeks of intensive, focused training.',
    originalPrice: '$149',
    finalPrice: '$89',
    savings: '$60',
    expiresIn: '5 days',
    color: '#0EA5E9',
    gradient: 'linear-gradient(140deg, #0369A1 0%, #0EA5E9 55%, #38BDF8 100%)',
    languages: ['🇬🇧 English', '🇫🇷 French'],
    benefits: [
      { icon: '⚙️', label: '6-week intensive grammar sprint', detail: 'Daily micro-lessons of 20 min + 1 weekly deep-dive session' },
      { icon: '🧠', label: 'Spaced-repetition grammar drills', detail: 'Clinically-proven method to lock in grammar rules for good' },
      { icon: '📖', label: '200+ structured exercises', detail: 'From fill-in-the-blank to advanced sentence transformation' },
      { icon: '🏅', label: 'Certificate of Grammar Proficiency', detail: 'Shareable digital certificate upon 80%+ final test score' },
      { icon: '🔄', label: 'Lifetime replay access', detail: 'All session recordings accessible even after the program ends' },
    ],
  },
  {
    id: 3,
    tag: 'VIP Upgrade',
    badge: '👑 Premium',
    icon: '✨',
    title: 'Full Immersion VIP Package',
    subtitle: 'Complete language immersion experience combining 1-on-1 coaching, cultural deep-dives, and exam preparation.',
    originalPrice: '$320 / month',
    finalPrice: '$199 / month',
    savings: '38%',
    expiresIn: '1 week',
    color: '#F59E0B',
    gradient: 'linear-gradient(140deg, #B45309 0%, #D97706 50%, #F59E0B 100%)',
    languages: ['🇬🇧 English', '🇮🇹 Italian', '🇰🇷 Korean'],
    benefits: [
      { icon: '👤', label: '8 x 1-on-1 sessions per month', detail: 'Private 60-min lessons with a certified native-speaker tutor' },
      { icon: '🌐', label: 'Cultural immersion modules', detail: 'Weekly lessons on history, customs, cinema, and cuisine of the target country' },
      { icon: '🎓', label: 'Official exam preparation', detail: 'Prep for IELTS, DELF, CELI, or TOPIK depending on your language' },
      { icon: '📱', label: 'Unlimited app access & offline mode', detail: 'Full mobile access including downloadable lessons for offline study' },
      { icon: '🧑‍💼', label: 'Dedicated language coach', detail: 'One assigned coach tracks your progress and adjusts your plan weekly' },
    ],
  },
  {
    id: 4,
    tag: 'Family Plan',
    badge: '👨‍👩‍👧 Best for Families',
    icon: '🏠',
    title: 'Family Language Pack — Up to 4 Members',
    subtitle: 'Learn together, grow together. One subscription unlocks access for the whole family across any language and level.',
    originalPrice: '$240 / month',
    finalPrice: '$129 / month',
    savings: '46%',
    expiresIn: '2 weeks',
    color: '#10B981',
    gradient: 'linear-gradient(140deg, #065F46 0%, #059669 55%, #10B981 100%)',
    languages: ['🇬🇧 English', '🇫🇷 French', '🇮🇹 Italian', '🇰🇷 Korean'],
    benefits: [
      { icon: '👨‍👩‍👧', label: 'Up to 4 individual profiles', detail: 'Each member gets their own level, language, and progress tracking' },
      { icon: '📊', label: 'Shared family dashboard', detail: 'Parents can view all learners\' progress from one admin account' },
      { icon: '🎮', label: 'Kids\' gamified learning mode', detail: 'Fun, age-appropriate lessons with badges and streaks for younger learners' },
      { icon: '🤝', label: '2 family group conversation classes/month', detail: 'Live sessions where the whole family practices together with a teacher' },
      { icon: '🔒', label: 'Parental content controls', detail: 'Set time limits and content filters from the parent dashboard' },
    ],
  },
  {
    id: 5,
    tag: 'Flash Sale',
    badge: '⏰ 24h Only',
    icon: '⚡',
    title: 'Conversation Bootcamp — 3-Week Sprint',
    subtitle: 'Stop studying theory. Start speaking. This bootcamp is built exclusively around real, live conversation from day one.',
    originalPrice: '$119',
    finalPrice: '$49',
    savings: '$70',
    expiresIn: '18 hours',
    color: '#EF4444',
    gradient: 'linear-gradient(140deg, #991B1B 0%, #DC2626 55%, #EF4444 100%)',
    languages: ['🇬🇧 English', '🇫🇷 French', '🇰🇷 Korean'],
    benefits: [
      { icon: '🗣️', label: '21-day speaking challenge', detail: 'A new real-world conversation scenario every single day' },
      { icon: '🎙️', label: 'AI pronunciation coach', detail: 'Record yourself and get instant feedback on accent, rhythm & fluency' },
      { icon: '🧑‍🤝‍🧑', label: 'Conversation partner matching', detail: 'Matched with a language exchange partner at your exact level' },
      { icon: '📹', label: '6 live group conversation calls', detail: '45-min Zoom sessions with a native facilitator, 2 per week' },
      { icon: '📋', label: 'Confidence tracking scorecard', detail: 'Weekly self-assessment reports with teacher notes and goals' },
    ],
  },
  {
    id: 6,
    tag: 'Annual Plan',
    badge: '💎 Best Value',
    icon: '📅',
    title: 'Year of Languages — Full Access Annual',
    subtitle: 'Commit to a year, unlock everything. The most complete, lowest cost-per-day way to master a language.',
    originalPrice: '$99/mo × 12 = $1,188',
    finalPrice: '$599 / year',
    savings: '$589',
    expiresIn: null,
    color: '#8B5CF6',
    gradient: 'linear-gradient(140deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)',
    languages: ['🇬🇧 English', '🇫🇷 French', '🇮🇹 Italian', '🇰🇷 Korean'],
    benefits: [
      { icon: '♾️', label: 'Unlimited access to all courses & levels', detail: 'Every language, every level, every session type — no restrictions' },
      { icon: '🎁', label: '2 free months included', detail: 'Pay for 10 months, get 12. No coupon needed.' },
      { icon: '🌟', label: 'Annual learner priority status', detail: 'First access to new courses, beta features, and teacher slots' },
      { icon: '📞', label: '24 x 1-on-1 sessions included', detail: 'Two private sessions per month, bookable any time with any teacher' },
      { icon: '🏆', label: 'End-of-year proficiency certificate', detail: 'Official certificate after your year-end CEFR level evaluation' },
    ],
  },
]

// ─── Mini countdown for the section header ───────────────────────────────────
const SectionPill = ({ text, color }) => (
  <span
    className='text-xs font-bold px-3 py-1 rounded-full'
    style={{ background: `${color}15`, color }}
  >{text}</span>
)

// ─── OfferList ────────────────────────────────────────────────────────────────
const OfferList = ({ limit, showHeading = true }) => {
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Bundle Deal', 'Intensive Program', 'VIP Upgrade', 'Family Plan', 'Flash Sale', 'Annual Plan']

  const visible = OFFERS.filter(o => activeFilter === 'All' || o.tag === activeFilter)
  const displayed = limit ? visible.slice(0, limit) : visible

  // featured = first in list
  const [featured, ...rest] = displayed

  return (
    <div>
      {showHeading && (
        <div className='mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-2'>
            <p className='text-xs uppercase tracking-widest font-semibold text-[#704032]'>Limited Time</p>
            <SectionPill text='🔥 Hot deals' color='#EF4444' />
            <SectionPill text='⏰ Expiring soon' color='#F59E0B' />
          </div>
          <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>Special Offers</h2>
          <p className='text-gray-400 text-sm max-w-lg'>
            Exclusive bundles, intensives, and packs designed to accelerate your progress. Each offer combines multiple benefits for maximum value.
          </p>
        </div>
      )}

      {/* filter pills */}
      {showHeading && (
        <div className='flex flex-wrap gap-2 mb-8'>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className='px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200'
              style={{
                background:   activeFilter === f ? '#1D9E75' : 'transparent',
                color:        activeFilter === f ? '#fff' : '#6B7280',
                borderColor:  activeFilter === f ? '#1D9E75' : '#E5E7EB',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* featured offer — full width */}
      {featured && (
        <div className='mb-6'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            {/* featured card spans 3 cols */}
            <div className='lg:col-span-3'>
              <OfferCard offer={featured} index={0} featured />
            </div>
            {/* second offer if exists */}
            {rest[0] && (
              <div className='lg:col-span-2'>
                <OfferCard offer={rest[0]} index={1} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* remaining offers 3-col grid */}
      {rest.length > 1 && (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {rest.slice(1).map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i + 2} />
          ))}
        </div>
      )}

      {/* empty state */}
      {displayed.length === 0 && (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <span className='text-5xl mb-4'>🎁</span>
          <p className='text-gray-600 font-medium'>No offers in this category right now</p>
          <p className='text-gray-400 text-sm mt-1'>Check back soon — new deals drop every week</p>
        </div>
      )}
    </div>
  )
}

export default OfferList