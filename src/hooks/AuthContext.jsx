import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  Person, Lock, Eye, EyeSlash, ArrowRightFromSquare, Xmark,
  EnvelopeOpen, Check,
} from '@gravity-ui/icons'

// ─── Brand palette ────────────────────────────────────────────────────────────
const C = {
  orange:      '#F5A623',
  orangeDark:  '#E09510',
  orangeFaint: '#FEF3DC',
  maroon:      '#7C1D1D',
  maroonHov:   '#6B1515',
  green:       '#1D9E75',
  greenFaint:  '#E8F8F2',
  brown:       '#704032',
  white:       '#FFFFFF',
  border:      '#EDE0CC',
  text:        '#1A1209',
  textBody:    '#4A3728',
  textMuted:   '#8C7660',
  textFaint:   '#C4B49E',
  wrongBg:     '#FEF2F2',
  wrong:       '#DC2626',
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

/**
 * useProtectedAction — wraps any callback so it only fires when logged in.
 * If the user is not logged in, opens the auth modal instead.
 *
 * Usage:
 *   const protect = useProtectedAction()
 *   <button onClick={protect(() => enrollCourse(id))}>Enroll</button>
 */
export const useProtectedAction = () => {
  const { user, openAuth } = useAuth()
  return useCallback(
    (fn) => (...args) => {
      if (user) fn(...args)
      else openAuth()
    },
    [user, openAuth]
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Input = ({ icon: Icon, type = 'text', placeholder, value, onChange, rightSlot, error }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 14px', borderRadius: 12,
      border: `1.5px solid ${error ? C.wrong : value ? C.orange : C.border}`,
      background: error ? C.wrongBg : C.white,
      transition: 'border-color 0.2s ease',
    }}>
      {Icon && <Icon style={{ width: 15, height: 15, color: error ? C.wrong : C.textMuted, flexShrink: 0 }} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 13.5, color: C.text, fontFamily: 'inherit',
        }}
      />
      {rightSlot}
    </div>
    {error && <p style={{ fontSize: 11, color: C.wrong, margin: 0, paddingLeft: 4 }}>{error}</p>}
  </div>
)

// ─── Auth Modal ───────────────────────────────────────────────────────────────
const AuthModal = ({ onClose, onSuccess }) => {
  const [tab, setTab]           = useState('login')   // login | signup
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (tab === 'signup' && !form.name.trim())
      e.name = 'Name is required'
    if (!form.email.includes('@'))
      e.email = 'Enter a valid email'
    if (form.password.length < 6)
      e.password = 'At least 6 characters'
    if (tab === 'signup' && form.password !== form.confirm)
      e.confirm = 'Passwords do not match'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    // Simulate API call — replace with real fetch
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      onSuccess({
        name:   tab === 'signup' ? form.name : form.email.split('@')[0],
        email:  form.email,
        avatar: (tab === 'signup' ? form.name : form.email).slice(0, 2).toUpperCase(),
        plan:   'Free',
        level:  'A1',
      })
    }, 1000)
  }

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // inject keyframes once
  useEffect(() => {
    if (document.getElementById('auth-anim')) return
    const s = document.createElement('style')
    s.id = 'auth-anim'
    s.textContent = `
      @keyframes authFadeIn { from{opacity:0} to{opacity:1} }
      @keyframes authSlideUp { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes spin { to{transform:rotate(360deg)} }
    `
    document.head.appendChild(s)
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(26,18,9,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'authFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 420, borderRadius: 24,
          background: C.white, overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
          animation: 'authSlideUp 0.3s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* ── Orange header strip ── */}
        <div style={{
          background: C.orange, padding: '28px 28px 24px',
          position: 'relative',
        }}>
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 30, height: 30, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: C.white,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
          >
            <Xmark style={{ width: 14, height: 14 }} />
          </button>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: C.white, margin: '0 0 4px' }}>
            {success ? 'Welcome!' : tab === 'login' ? 'Welcome back' : 'Join OrchillaLand'}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
            {success
              ? 'You\'re all set. Let\'s start learning.'
              : tab === 'login'
                ? 'Log in to access your courses and progress.'
                : 'Create a free account and start learning today.'}
          </p>
        </div>

        {/* ── Success state ── */}
        {success ? (
          <div style={{ padding: '40px 28px', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
              background: C.greenFaint, border: `2px solid ${C.green}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Check style={{ width: 28, height: 28, color: C.green }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>
              {tab === 'login' ? 'Logged in successfully!' : 'Account created!'}
            </p>
            <p style={{ fontSize: 13, color: C.textMuted, margin: 0 }}>Redirecting you now…</p>
          </div>
        ) : (
          <div style={{ padding: '24px 28px 28px' }}>

            {/* ── Tab toggle ── */}
            <div style={{
              display: 'flex', gap: 6, marginBottom: 24,
              background: C.orangeFaint, borderRadius: 12, padding: 4,
            }}>
              {['login', 'signup'].map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setErrors({}) }}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
                    cursor: 'pointer', fontSize: 13, fontWeight: 700,
                    background: tab === t ? C.white : 'transparent',
                    color: tab === t ? C.maroon : C.textMuted,
                    boxShadow: tab === t ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t === 'login' ? 'Log in' : 'Sign up'}
                </button>
              ))}
            </div>

            {/* ── Form fields ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {tab === 'signup' && (
                <Input
                  icon={Person} placeholder="Full name"
                  value={form.name} onChange={set('name')} error={errors.name}
                />
              )}
              <Input
                icon={EnvelopeOpen} type="email" placeholder="Email address"
                value={form.email} onChange={set('email')} error={errors.email}
              />
              <Input
                icon={Lock} type={showPass ? 'text' : 'password'} placeholder="Password"
                value={form.password} onChange={set('password')} error={errors.password}
                rightSlot={
                  <button
                    type="button" onClick={() => setShowPass(p => !p)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.textMuted }}
                  >
                    {showPass
                      ? <EyeSlash style={{ width: 15, height: 15 }} />
                      : <Eye style={{ width: 15, height: 15 }} />}
                  </button>
                }
              />
              {tab === 'signup' && (
                <Input
                  icon={Lock} type={showConf ? 'text' : 'password'} placeholder="Confirm password"
                  value={form.confirm} onChange={set('confirm')} error={errors.confirm}
                  rightSlot={
                    <button
                      type="button" onClick={() => setShowConf(p => !p)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: C.textMuted }}
                    >
                      {showConf
                        ? <EyeSlash style={{ width: 15, height: 15 }} />
                        : <Eye style={{ width: 15, height: 15 }} />}
                    </button>
                  }
                />
              )}
            </div>

            {/* Forgot password */}
            {tab === 'login' && (
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12, color: C.textMuted, padding: 0 }}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={submit}
              disabled={loading}
              style={{
                width: '100%', marginTop: 20, padding: '14px 0', borderRadius: 50,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 800, fontSize: 14, color: C.white,
                background: loading ? C.maroon + 'AA' : C.maroon,
                boxShadow: loading ? 'none' : `0 4px 18px ${C.maroon}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = C.maroonHov }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.maroon }}
            >
              {loading
                ? <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: C.white, display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                : tab === 'login' ? 'Log in' : 'Create account'
              }
            </button>

            {/* Divider + social hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 0' }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 11, color: C.textFaint }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {['Google', 'Facebook'].map(provider => (
                <button
                  key={provider}
                  style={{
                    flex: 1, padding: '10px 0', borderRadius: 12,
                    border: `1.5px solid ${C.border}`, background: C.white,
                    fontSize: 13, fontWeight: 600, color: C.textBody,
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.background = C.orangeFaint }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white }}
                >
                  {provider}
                </button>
              ))}
            </div>

            {/* Switch tab hint */}
            <p style={{ textAlign: 'center', fontSize: 12.5, color: C.textMuted, margin: '16px 0 0' }}>
              {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setErrors({}) }}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 700, color: C.maroon, padding: 0 }}
              >
                {tab === 'login' ? 'Sign up free' : 'Log in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  // Persist user in localStorage so refreshes don't log out
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('orchilla_user')) || null }
    catch { return null }
  })
  const [modalOpen, setModalOpen] = useState(false)
  // Callback to fire after successful login (e.g. re-trigger enrollment)
  const pendingRef = React.useRef(null)

  const openAuth  = useCallback((onSuccessCb) => {
    if (onSuccessCb) pendingRef.current = onSuccessCb
    setModalOpen(true)
  }, [])
  const closeAuth = useCallback(() => setModalOpen(false), [])

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('orchilla_user', JSON.stringify(userData))
    setModalOpen(false)
    if (pendingRef.current) {
      // Small delay so the modal closing animation finishes
      setTimeout(() => { pendingRef.current?.(); pendingRef.current = null }, 300)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('orchilla_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, openAuth, closeAuth, login, logout, isLoggedIn: !!user }}>
      {children}
      {modalOpen && (
        <AuthModal onClose={closeAuth} onSuccess={login} />
      )}
    </AuthContext.Provider>
  )
}

export default AuthContext