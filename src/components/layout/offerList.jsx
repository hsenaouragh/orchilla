import OfferCard from '../ui/offerCard'

const OFFERS = [
  {
    id: 1,
    tag: 'Bundle Deal',
    badge: 'Most Popular',
    title: 'Two Languages for the Price of One',
    subtitle: 'Master any two languages with one subscription.',
    originalPrice: '$198 / month',
    finalPrice: '$99 / month',
    savings: '50%',
    expiresIn: '3 days',
    color: '#6366F1',
    languages: ['English', 'French', 'Italian', 'Korean'],
    benefits: [
      { label: 'Access to 2 full language courses' },
      { label: 'Personalized study plan' },
      { label: '4 live sessions per week' },
      { label: 'Grammar checkpoint tests' },
      { label: 'Priority community access' },
    ],
  },
  {
    id: 2,
    tag: 'Intensive',
    badge: 'Limited Spots',
    title: 'Accelerated Grammar Mastery',
    subtitle: 'Reach C1 grammar in 6 weeks.',
    originalPrice: '$149',
    finalPrice: '$89',
    savings: '$60',
    expiresIn: '5 days',
    color: '#0EA5E9',
    languages: ['English', 'French'],
    benefits: [
      { label: '6-week intensive program' },
      { label: 'Daily grammar drills' },
      { label: '200+ exercises' },
      { label: 'Certificate included' },
      { label: 'Lifetime access' },
    ],
  },
  {
    id: 3,
    tag: 'VIP',
    badge: 'Premium',
    title: 'Full Immersion VIP Package',
    subtitle: '1-on-1 coaching + cultural immersion.',
    originalPrice: '$320 / month',
    finalPrice: '$199 / month',
    savings: '38%',
    expiresIn: '1 week',
    color: '#F59E0B',
    languages: ['English', 'Italian', 'Korean'],
    benefits: [
      { label: '8 private sessions monthly' },
      { label: 'Cultural immersion lessons' },
      { label: 'Exam preparation' },
      { label: 'Unlimited app access' },
      { label: 'Dedicated coach' },
    ],
  },
  {
    id: 4,
    tag: 'Family',
    badge: 'Best for Families',
    title: 'Family Language Pack',
    subtitle: 'Up to 4 members on one plan.',
    originalPrice: '$240 / month',
    finalPrice: '$129 / month',
    savings: '46%',
    expiresIn: '2 weeks',
    color: '#10B981',
    languages: ['English', 'French', 'Italian', 'Korean'],
    benefits: [
      { label: 'Up to 4 profiles' },
      { label: 'Shared dashboard' },
      { label: 'Kids learning mode' },
      { label: 'Group conversation classes' },
      { label: 'Parental controls' },
    ],
  },
  {
    id: 5,
    tag: 'Flash Sale',
    badge: '24h Only',
    title: 'Conversation Bootcamp',
    subtitle: 'Speak from day one.',
    originalPrice: '$119',
    finalPrice: '$49',
    savings: '$70',
    expiresIn: '18 hours',
    color: '#EF4444',
    languages: ['English', 'French', 'Korean'],
    benefits: [
      { label: '21-day speaking challenge' },
      { label: 'AI pronunciation coach' },
      { label: 'Partner matching' },
      { label: 'Live conversation calls' },
      { label: 'Progress tracking' },
    ],
  },
  {
    id: 6,
    tag: 'Annual',
    badge: 'Best Value',
    title: 'Year of Languages',
    subtitle: 'Full access for 1 year.',
    originalPrice: '$1,188',
    finalPrice: '$599 / year',
    savings: '$589',
    expiresIn: null,
    color: '#8B5CF6',
    languages: ['English', 'French', 'Italian', 'Korean'],
    benefits: [
      { label: 'Unlimited course access' },
      { label: '2 free months included' },
      { label: 'Priority access' },
      { label: '24 private sessions' },
      { label: 'Final certificate' },
    ],
  },
]

const SectionPill = ({ text, color }) => (
  <span
    className='text-xs font-bold px-3 py-1 rounded-full'
    style={{ background: `${color}15`, color }}
  >
    {text}
  </span>
)

const OfferList = ({ limit, showHeading = true }) => {
  const displayed = limit ? OFFERS.slice(0, limit) : OFFERS
  const [featured, ...rest] = displayed

  return (
    <div id="offers">
      {showHeading && (
        <div className='mb-10'>
          <div className='flex flex-wrap items-center gap-3 mb-2'>
            <p className='text-xs uppercase tracking-widest font-semibold text-[#704032]'>
              Limited Time
            </p>
            <SectionPill text='🔥 Hot deals' color='#EF4444' />
            <SectionPill text='⏰ Expiring soon' color='#F59E0B' />
          </div>

          <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>
            Special Offers
          </h2>

          <p className='text-gray-400 text-sm max-w-lg'>
            Exclusive bundles, intensives, and packs designed to accelerate your progress.
          </p>
        </div>
      )}

      {/* featured */}
      {featured && (
        <div className='mb-6'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
            <div className='lg:col-span-3'>
              <OfferCard offer={featured} featured />
            </div>

            {rest[0] && (
              <div className='lg:col-span-2'>
                <OfferCard offer={rest[0]} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* remaining */}
      {rest.length > 1 && (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {rest.slice(1).map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OfferList