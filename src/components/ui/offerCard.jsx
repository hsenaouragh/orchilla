import { useState } from 'react'

/**
 * OfferCard — displays a single rich special offer.
 *
 * Offer shape:
 * {
 *   id, tag, title, subtitle, description,
 *   originalPrice, finalPrice, savings,
 *   expiresIn,          // e.g. "3 days"
 *   color,              // accent hex
 *   gradient,           // CSS gradient string
 *   icon,               // emoji or symbol
 *   benefits: [{ icon, label, detail }],
 *   badge,              // e.g. "🔥 Most Popular"
 *   languages,          // e.g. ["🇬🇧 English", "🇫🇷 French"]
 * }
 */
const OfferCard = ({ offer, index = 0, featured = false }) => {
  const [hovered, setHovered] = useState(false)
  const [claimed, setClaimed] = useState(false)

  return (
    <div
      className='relative rounded-3xl overflow-hidden flex flex-col cursor-pointer select-none'
      style={{
        background: offer.gradient,
        boxShadow: hovered
          ? `0 24px 64px ${offer.color}40, 0 4px 16px rgba(0,0,0,0.12)`
          : `0 4px 24px ${offer.color}20, 0 1px 4px rgba(0,0,0,0.06)`,
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        transition: 'all .35s cubic-bezier(.22,1,.36,1)',
        opacity: 0,
        animation: `fadeSlideUp .5s cubic-bezier(.22,1,.36,1) ${index * 100}ms forwards`,
        minHeight: featured ? 480 : 400,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      {/* ── decorative blobs ── */}
      <div className='absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 pointer-events-none'
        style={{ background: '#fff', filter: 'blur(32px)' }} />
      <div className='absolute -bottom-12 -left-8 w-56 h-56 rounded-full opacity-10 pointer-events-none'
        style={{ background: offer.color, filter: 'blur(48px)' }} />

      {/* ── grid texture overlay ── */}
      <div className='absolute inset-0 opacity-[0.04] pointer-events-none'
        style={{
          backgroundImage: `linear-gradient(${offer.color} 1px, transparent 1px), linear-gradient(90deg, ${offer.color} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

      {/* ── top row: badge + expires ── */}
      <div className='relative flex items-start justify-between px-6 pt-6'>
        {offer.badge ? (
          <span className='text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white tracking-wide'>
            {offer.badge}
          </span>
        ) : <div />}

        {offer.expiresIn && (
          <div className='flex items-center gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'
                style={{ animation: 'pulse-ring 1.2s ease-out infinite' }} />
              <span className='relative inline-flex rounded-full h-2 w-2 bg-red-400' />
            </span>
            <span className='text-white text-[10px] font-semibold'>Ends in {offer.expiresIn}</span>
          </div>
        )}
      </div>

      {/* ── main content ── */}
      <div className='relative flex-1 flex flex-col px-6 pt-4 pb-6'>

        {/* icon + tag */}
        <div className='flex items-center gap-2 mb-3'>
          <span className='text-3xl'>{offer.icon}</span>
          <span className='text-xs font-bold uppercase tracking-widest text-white/60'>{offer.tag}</span>
        </div>

        {/* title */}
        <h3 className='text-white font-extrabold leading-tight mb-1'
          style={{ fontSize: featured ? '1.5rem' : '1.15rem' }}>
          {offer.title}
        </h3>
        <p className='text-white/70 text-xs leading-relaxed mb-4'>{offer.subtitle}</p>

        {/* languages */}
        {offer.languages?.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mb-4'>
            {offer.languages.map(l => (
              <span key={l} className='text-xs bg-white/15 text-white px-2.5 py-0.5 rounded-full font-medium'>
                {l}
              </span>
            ))}
          </div>
        )}

        {/* benefits list */}
        <div className='space-y-2 mb-5'>
          {offer.benefits.map((b, i) => (
            <div key={i} className='flex items-start gap-2.5'>
              <span className='flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs bg-white/20 mt-0.5'>
                {b.icon}
              </span>
              <div>
                <p className='text-white text-xs font-semibold leading-tight'>{b.label}</p>
                {b.detail && <p className='text-white/55 text-[11px] leading-tight mt-0.5'>{b.detail}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* divider */}
        <div className='border-t border-white/15 mb-4' />

        {/* pricing + CTA */}
        <div className='flex items-end justify-between gap-3'>
          <div>
            {offer.originalPrice && (
              <p className='text-white/40 text-xs line-through mb-0.5'>{offer.originalPrice}</p>
            )}
            <div className='flex items-baseline gap-2'>
              <p className='text-white font-black text-2xl'>{offer.finalPrice}</p>
              {offer.savings && (
                <span className='text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white'>
                  Save {offer.savings}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setClaimed(true)}
            className='flex-shrink-0 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300'
            style={{
              background: claimed ? 'rgba(255,255,255,0.15)' : '#fff',
              color: claimed ? '#fff' : offer.color,
              boxShadow: claimed ? 'none' : '0 4px 16px rgba(0,0,0,0.15)',
              transform: hovered && !claimed ? 'scale(1.04)' : 'scale(1)',
            }}
          >
            {claimed ? '✓ Claimed' : 'Claim Offer'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OfferCard