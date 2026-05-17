import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightFromSquare, Pencil, Lock, Bell,
  Star, BookOpen, CircleQuestion, TrashBin, ChartMixed,
} from '@gravity-ui/icons'
import { useAuth } from '../hooks/AuthContext'

// ─── Brand palette ────────────────────────────────────────────────────────────
const C = {
  orange:      '#F5A623',
  orangeFaint: '#FEF3DC',
  maroon:      '#7C1D1D',
  green:       '#1D9E75',
  brown:       '#704032',
  white:       '#FFFFFF',
  border:      '#EDE0CC',
  text:        '#1A1209',
  textMuted:   '#8C7660',
  textFaint:   '#C4B49E',
  wrongBg:     '#FEF2F2',
  wrong:       '#DC2626',
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
const Profile = ({ onClose }) => {
  const navigate   = useNavigate()
  const { user, logout } = useAuth()

  const go = (path) => { onClose(); navigate(path) }

  const handleLogout = () => {
    onClose()
    logout()
  }

  const handleDelete = () => {
    onClose()
    if (window.confirm('Delete your account? This cannot be undone.')) {
      logout() // replace with real delete API call
    }
  }

  const ACTIONS = [
    {
      group: 'Account',
      items: [
        { Icon: ChartMixed,  label: 'My Progress',   sub: `${user?.level || 'A1'} · in progress`, action: () => go('/cart') },
        { Icon: BookOpen,    label: 'My Courses',     sub: 'View enrollments',                      action: () => go('/cart') },
        { Icon: Bell,        label: 'Notifications',  sub: '3 unread',                              action: () => go('/notifications') },
        { Icon: Star,        label: 'My Plan',        sub: `${user?.plan || 'Free'} · Active`,      action: () => go('/cart') },
      ],
    },
    {
      group: 'Settings',
      items: [
        { Icon: Pencil,         label: 'Edit Profile',    sub: 'Name, photo, bio',   action: () => go('/profile/edit') },
        { Icon: Lock,           label: 'Change Password', sub: 'Update credentials', action: () => go('/profile/password') },
        { Icon: CircleQuestion, label: 'Help & Support',  sub: 'FAQ, contact us',    action: () => go('/support') },
      ],
    },
  ]

  // Derive display values from live auth user
  const displayName   = user?.name   || 'Guest'
  const displayEmail  = user?.email  || ''
  const displayAvatar = user?.avatar || displayName.slice(0, 2).toUpperCase()
  const displayPlan   = user?.plan   || 'Free'
  const displayLevel  = user?.level  || 'A1'

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.08)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'absolute', top: 'calc(100% + 10px)', right: 0,
        width: 290, borderRadius: 20, zIndex: 50,
        background: C.white, border: `1.5px solid ${C.border}`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
        overflow: 'hidden',
        animation: 'dropIn 0.22s cubic-bezier(.22,1,.36,1)',
      }}>

        {/* ── User card ── */}
        <div style={{
          padding: '18px 18px 14px',
          background: `linear-gradient(135deg, ${C.orange}22, ${C.orangeFaint})`,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${C.maroon}, ${C.maroon}CC)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 800, color: C.white,
            boxShadow: `0 3px 10px ${C.maroon}40`,
          }}>
            {displayAvatar}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: C.text, margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {displayName}
            </p>
            <p style={{ fontSize: 11, color: C.textMuted, margin: '0 0 5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {displayEmail}
            </p>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
              background: C.green + '18', color: C.green, border: `1px solid ${C.green}35`,
            }}>
              {displayPlan} · {displayLevel}
            </span>
          </div>
        </div>

        {/* ── Action groups ── */}
        <div style={{ padding: '8px 0' }}>
          {ACTIONS.map((group, gi) => (
            <div key={gi}>
              <p style={{
                fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.12em', color: C.textFaint,
                margin: 0, padding: '8px 16px 4px',
              }}>
                {group.group}
              </p>

              {group.items.map(({ Icon, label, sub, action }, i) => (
                <button
                  key={i} onClick={action}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                    padding: '9px 16px', border: 'none', background: 'transparent',
                    cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.orangeFaint}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: C.orangeFaint, border: `1px solid ${C.border}`,
                  }}>
                    <Icon style={{ width: 14, height: 14, color: C.brown }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{label}</p>
                    <p style={{ fontSize: 10.5, color: C.textMuted, margin: 0 }}>{sub}</p>
                  </div>
                </button>
              ))}

              {gi < ACTIONS.length - 1 && (
                <div style={{ height: 1, background: C.border, margin: '6px 16px' }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Danger zone ── */}
        <div style={{ borderTop: `1px solid ${C.border}`, padding: '8px 0 4px' }}>
          {[
            { Icon: ArrowRightFromSquare, label: 'Log out',        sub: 'End your session',             action: handleLogout },
            { Icon: TrashBin,             label: 'Delete account', sub: 'Permanent · cannot be undone', action: handleDelete },
          ].map(({ Icon, label, sub, action }, i) => (
            <button
              key={i} onClick={action}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                padding: '9px 16px', border: 'none', background: 'transparent',
                cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.wrongBg}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: C.wrongBg, border: `1px solid ${C.wrong}25`,
              }}>
                <Icon style={{ width: 14, height: 14, color: C.wrong }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.wrong, margin: 0 }}>{label}</p>
                <p style={{ fontSize: 10.5, color: '#EF9191', margin: 0 }}>{sub}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </>
  )
}

export default Profile