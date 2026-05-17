import React, { useState, useRef, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ChevronDown, Person } from '@gravity-ui/icons'
import Profile from '../../pages/profile'
import { useAuth } from '../../hooks/AuthContext'

// ─── Brand palette ────────────────────────────────────────────────────────────
const C = {
  orange:      '#F5A623',
  maroon:      '#7C1D1D',
  maroonHov:   '#6B1515',
  brown:       '#704032',
  white:       '#FFFFFF',
  border:      '#EDE0CC',
  text:        '#1A1209',
  textMuted:   '#8C7660',
  orangeFaint: '#FEF3DC',
}

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn, openAuth } = useAuth()

  const [profileOpen, setProfileOpen] = useState(false)
  const [cartCount]  = useState(2)
  const profileRef   = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close profile dropdown whenever user logs out
  useEffect(() => {
    if (!isLoggedIn) setProfileOpen(false)
  }, [isLoggedIn])

  // Inject dropdown animation once
  useEffect(() => {
    if (document.getElementById('header-anim')) return
    const s = document.createElement('style')
    s.id = 'header-anim'
    s.textContent = `@keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`
    document.head.appendChild(s)
  }, [])

  // Derive display values from live user
  const displayName   = user?.name   || ''
  const displayAvatar = user?.avatar || displayName.slice(0, 2).toUpperCase()

  return (
    <div
      className='text-xl flex justify-between items-center gap-2 m-4 bg-white p-4 rounded-full'
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
    >

      {/* Logo */}
      <Link to='/'>
        <h1 style={{ margin: 0 }}>
          orchilla<span style={{ color: C.brown }}>Land</span>
        </h1>
      </Link>

      {/* Navigation */}
      <ul
        className='hidden xl:flex items-center gap-12 font-semibold text-base'
        style={{ margin: 0, padding: 0, listStyle: 'none' }}
      >
        <li><Link to='/courses'>courses</Link></li>
        <li><a href='/courses#offers' className='scroll-smooth'>offers</a></li>
        <li><Link to='/placement-test'>placement Tests</Link></li>
      </ul>


      {/* Right actions */}
      <div className='flex items-center gap-3'>

        {/* Cart — only shown when logged in */}
        {isLoggedIn && (
          <button
            onClick={() => navigate('/cart')}
            style={{
              position: 'relative', width: 40, height: 40, borderRadius: '50%',
              border: `1.5px solid ${C.border}`, background: C.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.orangeFaint; e.currentTarget.style.borderColor = C.orange }}
            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.borderColor = C.border }}
          >
            <ShoppingCart style={{ width: 18, height: 18, color: C.orange }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16, borderRadius: '50%',
                background: C.maroon, color: C.white,
                fontSize: 9, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${C.white}`,
              }}>
                {cartCount}
              </span>
            )}
          </button>
        )}

        {/* ── LOGGED IN: profile trigger + dropdown ── */}
        {isLoggedIn ? (
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px 6px 6px', borderRadius: 50,
                border: `1.5px solid ${profileOpen ? C.maroon : C.border}`,
                background: profileOpen ? C.maroon + '08' : C.white,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                if (!profileOpen) {
                  e.currentTarget.style.borderColor = C.orange
                  e.currentTarget.style.background = C.orangeFaint
                }
              }}
              onMouseLeave={e => {
                if (!profileOpen) {
                  e.currentTarget.style.borderColor = C.border
                  e.currentTarget.style.background = C.white
                }
              }}
            >
              {/* Avatar initials */}
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${C.maroon}, ${C.maroon}CC)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: C.white,
              }}>
                {displayAvatar}
              </div>

              {/* First name — large screens only */}
              <span
                className='hidden lg:block'
                style={{
                  fontSize: 13, fontWeight: 700, color: C.text,
                  maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}
              >
                {displayName.split(' ')[0]}
              </span>

              <ChevronDown style={{
                width: 14, height: 14, color: C.textMuted,
                transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }} />
            </button>

            {/* Profile dropdown — imported from profile.jsx */}
            {profileOpen && (
              <Profile onClose={() => setProfileOpen(false)} />
            )}
          </div>

        ) : (
          /* ── LOGGED OUT: Log in button ── */
          <button
            onClick={() => openAuth()}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 20px', borderRadius: 50, border: 'none',
              background: C.maroon, color: C.white,
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 3px 14px ${C.maroon}38`,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.maroonHov; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.maroon; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <Person style={{ width: 15, height: 15 }} />
            Log in
          </button>
        )}

      </div>
    </div>
  )
}

export default Header