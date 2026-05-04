import { useState } from 'react'
import { Check, Tag, Clock } from '@gravity-ui/icons'
import Button from './button'

const OfferCard = ({ offer, featured = false }) => {
  const [hovered, setHovered] = useState(false)
  const [claimed, setClaimed] = useState(false)

  return (
    <div
      className='rounded-2xl border bg-white p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer'
      style={{
        borderColor: hovered ? offer.color : '#E5E7EB',
        boxShadow: hovered
          ? `0 12px 32px ${offer.color}20`
          : '0 2px 10px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── top row ── */}
      <div className='flex items-start justify-between mb-4'>
        {offer.badge && (
          <span
            className='text-xs font-semibold px-2.5 py-1 rounded-full'
            style={{ background: `${offer.color}10`, color: offer.color }}
          >
            {offer.badge}
          </span>
        )}

        {offer.expiresIn && (
          <div className='flex items-center gap-1 text-gray-400 text-xs'>
            <Clock size={14} />
            Ends in {offer.expiresIn}
          </div>
        )}
      </div>

      {/* ── title ── */}
      <div className='mb-3'>
        <h3 className='text-gray-900 font-semibold text-base mb-1'>
          {offer.title}
        </h3>
        <p className='text-gray-400 text-sm'>
          {offer.subtitle}
        </p>
      </div>

      {/* ── languages ── */}
      {offer.languages?.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {offer.languages.map(l => (
            <span
              key={l}
              className='text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'
            >
              {l}
            </span>
          ))}
        </div>
      )}

      {/* ── benefits ── */}
      <div className='space-y-2 mb-5'>
        {offer.benefits.map((b, i) => (
          <div key={i} className='flex items-start gap-2'>
            <Check size={16} className='text-green-500 mt-[2px]' />
            <p className='text-sm text-gray-600 leading-tight'>
              {b.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── pricing ── */}
      <div className='border-t pt-4 flex items-end justify-between'>
        <div>
          {offer.originalPrice && (
            <p className='text-gray-300 text-xs line-through'>
              {offer.originalPrice}
            </p>
          )}
          <div className='flex items-center gap-2'>
            <p className='text-lg font-bold text-gray-900'>
              {offer.finalPrice}
            </p>
            {offer.savings && (
              <span className='text-xs font-semibold text-green-600'>
                Save {offer.savings}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => setClaimed(true)}
          className='px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200'
          style={{
            background: claimed ? '#F3F4F6' : offer.color,
            color: claimed ? '#6B7280' : '#fff',
          }}
        >
          {claimed ? 'Claimed' : 'Claim'}
        </Button>
      </div>
    </div>
  )
}

export default OfferCard