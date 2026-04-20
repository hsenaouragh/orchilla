import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ─── Question Bank ────────────────────────────────────────────────────────────
const QUESTIONS = {
  english: {
    grammar: [
      {
        id: 'en_g1', type: 'mcq',
        question: 'Choose the correct sentence:',
        options: [
          'She don\'t like coffee in the morning.',
          'She doesn\'t likes coffee in the morning.',
          'She doesn\'t like coffee in the morning.',
          'She not like coffee in the morning.',
        ],
        answer: 2,
      },
      {
        id: 'en_g2', type: 'mcq',
        question: 'Which sentence uses the Past Perfect correctly?',
        options: [
          'By the time she arrived, I have already eaten.',
          'By the time she arrived, I had already eaten.',
          'By the time she arrived, I already ate.',
          'By the time she arrived, I was already eating.',
        ],
        answer: 1,
      },
      {
        id: 'en_g3', type: 'mcq',
        question: 'Select the correct passive voice form: "They build the bridge in 1990."',
        options: [
          'The bridge is built in 1990.',
          'The bridge was being built in 1990.',
          'The bridge was built in 1990.',
          'The bridge had been built in 1990.',
        ],
        answer: 2,
      },
    ],
    vocabulary: [
      {
        id: 'en_v1', type: 'mcq',
        question: 'What does "ephemeral" mean?',
        options: ['Permanent and lasting', 'Short-lived or transitory', 'Ancient or old', 'Bright and colorful'],
        answer: 1,
      },
      {
        id: 'en_v2', type: 'mcq',
        question: 'Choose the word closest in meaning to "benevolent":',
        options: ['Cruel', 'Indifferent', 'Kind and generous', 'Selfish'],
        answer: 2,
      },
      {
        id: 'en_v3', type: 'mcq',
        question: '"She was ______ by the complexity of the problem." — Choose the best word:',
        options: ['amused', 'daunted', 'pleased', 'relieved'],
        answer: 1,
      },
    ],
    reading: [
      {
        id: 'en_r1', type: 'passage',
        passage: 'The concept of "flow," introduced by psychologist Mihaly Csikszentmihalyi, describes a state of deep focus where a person is fully immersed in a challenging yet manageable activity. During flow, time seems to distort, and self-consciousness fades. Athletes call it "being in the zone." Researchers argue that cultivating flow leads to greater life satisfaction.',
        question: 'According to the passage, what happens to self-consciousness during flow?',
        options: [
          'It intensifies significantly.',
          'It remains unchanged.',
          'It fades away.',
          'It transforms into confidence.',
        ],
        answer: 2,
      },
      {
        id: 'en_r2', type: 'passage',
        passage: 'The concept of "flow," introduced by psychologist Mihaly Csikszentmihalyi, describes a state of deep focus where a person is fully immersed in a challenging yet manageable activity. During flow, time seems to distort, and self-consciousness fades. Athletes call it "being in the zone." Researchers argue that cultivating flow leads to greater life satisfaction.',
        question: 'What is the main purpose of this passage?',
        options: [
          'To criticize the concept of flow.',
          'To introduce and explain the concept of flow.',
          'To provide instructions for achieving flow.',
          'To compare athletes to researchers.',
        ],
        answer: 1,
      },
    ],
    writing: [
      {
        id: 'en_w1', type: 'writing',
        question: 'In 2–4 sentences, describe a time you learned something new and how it made you feel. Use at least one past tense and one present tense.',
        placeholder: 'Write your response here…',
      },
    ],
  },

  french: {
    grammar: [
      {
        id: 'fr_g1', type: 'mcq',
        question: 'Choisissez la forme correcte du verbe "aller" au présent :',
        options: ['Je vas à l\'école.', 'Je vais à l\'école.', 'Je aille à l\'école.', 'J\'allez à l\'école.'],
        answer: 1,
      },
      {
        id: 'fr_g2', type: 'mcq',
        question: 'Quelle phrase utilise correctement le subjonctif ?',
        options: [
          'Il faut que tu viens demain.',
          'Il faut que tu viens pas.',
          'Il faut que tu viennes demain.',
          'Il faut que tu venais demain.',
        ],
        answer: 2,
      },
      {
        id: 'fr_g3', type: 'mcq',
        question: 'Complétez : "Elle ______ son livre quand le téléphone a sonné."',
        options: ['lisait', 'lit', 'lira', 'lirait'],
        answer: 0,
      },
    ],
    vocabulary: [
      {
        id: 'fr_v1', type: 'mcq',
        question: 'Quel est le synonyme de "rapide" ?',
        options: ['Lent', 'Vif', 'Lourd', 'Calme'],
        answer: 1,
      },
      {
        id: 'fr_v2', type: 'mcq',
        question: 'Que signifie "quotidien" ?',
        options: ['Hebdomadaire', 'Mensuel', 'De chaque jour', 'Annuel'],
        answer: 2,
      },
      {
        id: 'fr_v3', type: 'mcq',
        question: '"Il est très ______ — il aide toujours les autres." Choisissez le bon mot :',
        options: ['avare', 'généreux', 'paresseux', 'timide'],
        answer: 1,
      },
    ],
    reading: [
      {
        id: 'fr_r1', type: 'passage',
        passage: 'La gastronomie française est reconnue mondialement. En 2010, l\'UNESCO a inscrit le repas gastronomique des Français au patrimoine culturel immatériel de l\'humanité. Ce repas se caractérise par le choix de bons produits, l\'accord entre les mets et les vins, et l\'art de la conversation à table. Pour les Français, manger est bien plus qu\'un simple besoin physiologique : c\'est un rituel social.',
        question: 'Pourquoi le repas gastronomique français a-t-il été inscrit au patrimoine de l\'UNESCO ?',
        options: [
          'Parce que la cuisine française est la plus ancienne du monde.',
          'Parce qu\'il représente une tradition culturelle et sociale importante.',
          'Parce que les restaurants français sont les meilleurs du monde.',
          'Parce que les Français mangent plus que les autres peuples.',
        ],
        answer: 1,
      },
      {
        id: 'fr_r2', type: 'passage',
        passage: 'La gastronomie française est reconnue mondialement. En 2010, l\'UNESCO a inscrit le repas gastronomique des Français au patrimoine culturel immatériel de l\'humanité. Ce repas se caractérise par le choix de bons produits, l\'accord entre les mets et les vins, et l\'art de la conversation à table. Pour les Français, manger est bien plus qu\'un simple besoin physiologique : c\'est un rituel social.',
        question: 'D\'après le texte, qu\'est-ce que manger représente pour les Français ?',
        options: [
          'Une obligation médicale.',
          'Un simple besoin biologique.',
          'Un rituel social et culturel.',
          'Une activité économique.',
        ],
        answer: 2,
      },
    ],
    writing: [
      {
        id: 'fr_w1', type: 'writing',
        question: 'En 2 à 4 phrases, décrivez votre plat préféré et expliquez pourquoi vous l\'aimez. Utilisez au moins un adjectif et un verbe au présent.',
        placeholder: 'Écrivez votre réponse ici…',
      },
    ],
  },

  italian: {
    grammar: [
      {
        id: 'it_g1', type: 'mcq',
        question: 'Scegli la forma corretta del verbo "essere" al presente:',
        options: ['Loro è studenti.', 'Loro sono studenti.', 'Loro sta studenti.', 'Loro siamo studenti.'],
        answer: 1,
      },
      {
        id: 'it_g2', type: 'mcq',
        question: 'Quale frase usa correttamente il passato prossimo?',
        options: [
          'Ieri ho mangiato una pizza.',
          'Ieri mangiavo una pizza.',
          'Ieri mangiai una pizza.',
          'Ieri mangio una pizza.',
        ],
        answer: 0,
      },
      {
        id: 'it_g3', type: 'mcq',
        question: 'Completa: "Quando ero piccolo, ______ spesso al parco."',
        options: ['andai', 'sono andato', 'andrò', 'andavo'],
        answer: 3,
      },
    ],
    vocabulary: [
      {
        id: 'it_v1', type: 'mcq',
        question: 'Qual è il sinonimo di "felice"?',
        options: ['Triste', 'Contento', 'Arrabbiato', 'Stanco'],
        answer: 1,
      },
      {
        id: 'it_v2', type: 'mcq',
        question: 'Cosa significa "affascinante"?',
        options: ['Noioso', 'Pericoloso', 'Che affascina, attraente', 'Veloce'],
        answer: 2,
      },
      {
        id: 'it_v3', type: 'mcq',
        question: '"Dopo la gara, il corridore era completamente ______." Scegli la parola migliore:',
        options: ['riposato', 'sorridente', 'esausto', 'nervoso'],
        answer: 2,
      },
    ],
    reading: [
      {
        id: 'it_r1', type: 'passage',
        passage: 'Il Rinascimento italiano, fiorito tra il XIV e il XVII secolo, segnò una svolta epocale nella storia della cultura europea. Nato a Firenze, questo movimento celebrava l\'uomo come centro dell\'universo, riscoprendo i valori dell\'antichità classica. Artisti come Leonardo da Vinci e Michelangelo incarnarono l\'ideale dell\'uomo universale, capace di eccellere in discipline diverse.',
        question: 'Dove nacque il Rinascimento italiano?',
        options: ['A Roma', 'A Venezia', 'A Firenze', 'A Milano'],
        answer: 2,
      },
      {
        id: 'it_r2', type: 'passage',
        passage: 'Il Rinascimento italiano, fiorito tra il XIV e il XVII secolo, segnò una svolta epocale nella storia della cultura europea. Nato a Firenze, questo movimento celebrava l\'uomo come centro dell\'universo, riscoprendo i valori dell\'antichità classica. Artisti come Leonardo da Vinci e Michelangelo incarnarono l\'ideale dell\'uomo universale, capace di eccellere in discipline diverse.',
        question: 'Cosa celebrava il Rinascimento?',
        options: [
          'La supremazia della religione sull\'uomo.',
          'L\'uomo come centro dell\'universo.',
          'La potenza militare italiana.',
          'Il dominio della natura sull\'uomo.',
        ],
        answer: 1,
      },
    ],
    writing: [
      {
        id: 'it_w1', type: 'writing',
        question: 'In 2–4 frasi, descrivi il tuo posto preferito in Italia o in un altro paese. Usa almeno un aggettivo e un verbo al presente.',
        placeholder: 'Scrivi la tua risposta qui…',
      },
    ],
  },

  korean: {
    grammar: [
      {
        id: 'ko_g1', type: 'mcq',
        question: 'Choose the correct particle to complete: "저는 학교___ 갑니다."',
        options: ['을', '에', '이', '는'],
        answer: 1,
      },
      {
        id: 'ko_g2', type: 'mcq',
        question: 'Which sentence is in the past tense?',
        options: [
          '저는 밥을 먹어요.',
          '저는 밥을 먹을 거예요.',
          '저는 밥을 먹었어요.',
          '저는 밥을 먹고 있어요.',
        ],
        answer: 2,
      },
      {
        id: 'ko_g3', type: 'mcq',
        question: 'Select the correct honorific form of "먹다" (to eat):',
        options: ['먹어요', '먹습니다', '드세요', '먹자'],
        answer: 2,
      },
    ],
    vocabulary: [
      {
        id: 'ko_v1', type: 'mcq',
        question: 'What does "행복하다" mean?',
        options: ['To be sad', 'To be angry', 'To be happy', 'To be tired'],
        answer: 2,
      },
      {
        id: 'ko_v2', type: 'mcq',
        question: 'Which word means "beautiful" in Korean?',
        options: ['무섭다', '아름답다', '빠르다', '어렵다'],
        answer: 1,
      },
      {
        id: 'ko_v3', type: 'mcq',
        question: '"그 영화는 정말 ______." Choose the best word for "boring":',
        options: ['재미있어요', '무서워요', '지루해요', '슬퍼요'],
        answer: 2,
      },
    ],
    reading: [
      {
        id: 'ko_r1', type: 'passage',
        passage: 'Hangul, the Korean writing system, was created in 1443 by King Sejong the Great during the Joseon Dynasty. Before its creation, Koreans used Classical Chinese characters, which were difficult for common people to learn. Sejong designed Hangul to be easy to learn so that all Koreans could read and write. Today, Hangul is celebrated on Hangul Day, a national holiday in South Korea observed on October 9th.',
        question: 'Why did King Sejong create Hangul?',
        options: [
          'To replace Chinese culture with Korean culture.',
          'To make reading and writing accessible to all Koreans.',
          'To create a secret code for the royal court.',
          'To simplify the Chinese writing system.',
        ],
        answer: 1,
      },
      {
        id: 'ko_r2', type: 'passage',
        passage: 'Hangul, the Korean writing system, was created in 1443 by King Sejong the Great during the Joseon Dynasty. Before its creation, Koreans used Classical Chinese characters, which were difficult for common people to learn. Sejong designed Hangul to be easy to learn so that all Koreans could read and write. Today, Hangul is celebrated on Hangul Day, a national holiday in South Korea observed on October 9th.',
        question: 'When is Hangul Day celebrated?',
        options: ['September 9th', 'November 9th', 'October 9th', 'October 19th'],
        answer: 2,
      },
    ],
    writing: [
      {
        id: 'ko_w1', type: 'writing',
        question: 'In 2–4 sentences (in English or Korean), describe something you enjoy about Korean culture — food, music, drama, or language. Why does it interest you?',
        placeholder: 'Write your response here… / 여기에 답을 쓰세요…',
      },
    ],
  },
}

const SECTIONS = [
  { id: 'grammar',   label: 'Grammar & Structure',    icon: '📐', color: '#6366F1', seconds: 150 },
  { id: 'vocabulary',label: 'Vocabulary',              icon: '📚', color: '#0EA5E9', seconds: 120 },
  { id: 'reading',   label: 'Reading Comprehension',  icon: '🔍', color: '#10B981', seconds: 180 },
  { id: 'writing',   label: 'Writing',                 icon: '✍️',  color: '#F59E0B', seconds: 150 },
]

const LANG_META = {
  english: { label: 'English',  flag: '🇬🇧', color: '#2563EB' },
  french:  { label: 'French',   flag: '🇫🇷', color: '#DC2626' },
  italian: { label: 'Italian',  flag: '🇮🇹', color: '#16A34A' },
  korean:  { label: 'Korean',   flag: '🇰🇷', color: '#9333EA' },
}

const TOTAL_SECONDS = 600

// ─── Utility ─────────────────────────────────────────────────────────────────
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

// ─── Components ──────────────────────────────────────────────────────────────

const CircleTimer = ({ seconds, total }) => {
  const r = 36
  const circ = 2 * Math.PI * r
  const pct = seconds / total
  const danger = seconds < 60
  const warn   = seconds < 120

  return (
    <div className='relative flex items-center justify-center' style={{ width: 96, height: 96 }}>
      <svg width='96' height='96' viewBox='0 0 96 96' style={{ transform: 'rotate(-90deg)' }}>
        <circle cx='48' cy='48' r={r} fill='none' stroke='#1E293B' strokeWidth='6' />
        <circle
          cx='48' cy='48' r={r} fill='none'
          stroke={danger ? '#EF4444' : warn ? '#F59E0B' : '#6366F1'}
          strokeWidth='6'
          strokeLinecap='round'
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke .5s' }}
        />
      </svg>
      <span
        className='absolute text-sm font-bold tabular-nums'
        style={{ color: danger ? '#EF4444' : warn ? '#F59E0B' : '#E2E8F0' }}
      >
        {fmt(seconds)}
      </span>
    </div>
  )
}

const ProgressBar = ({ current, total, color }) => (
  <div className='w-full h-1.5 rounded-full' style={{ background: '#1E293B' }}>
    <div
      className='h-1.5 rounded-full transition-all duration-500'
      style={{ width: `${(current / total) * 100}%`, background: color }}
    />
  </div>
)

const MCQOption = ({ text, index, selected, onClick, revealed, correct }) => {
  const letters = ['A', 'B', 'C', 'D']
  let bg = 'transparent', border = '#334155', labelBg = '#1E293B', labelColor = '#94A3B8'
  if (selected && !revealed) { bg = '#1E293B'; border = '#6366F1'; labelBg = '#6366F1'; labelColor = '#fff' }
  if (revealed && index === correct) { bg = '#052E16'; border = '#10B981'; labelBg = '#10B981'; labelColor = '#fff' }
  if (revealed && selected && index !== correct) { bg = '#2D0A0A'; border = '#EF4444'; labelBg = '#EF4444'; labelColor = '#fff' }

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200'
      style={{ background: bg, border: `1.5px solid ${border}` }}
    >
      <span
        className='flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200'
        style={{ background: labelBg, color: labelColor }}
      >
        {letters[index]}
      </span>
      <span className='text-sm' style={{ color: '#CBD5E1' }}>{text}</span>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TestPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // read language from query param: /test?lang=french
  const params = new URLSearchParams(location.search)
  const lang = params.get('lang') || 'english'
  const meta = LANG_META[lang] || LANG_META.english
  const qBank = QUESTIONS[lang] || QUESTIONS.english

  // build flat question list in section order
  const allQuestions = [
    ...qBank.grammar.map(q => ({ ...q, section: 'grammar' })),
    ...qBank.vocabulary.map(q => ({ ...q, section: 'vocabulary' })),
    ...qBank.reading.map(q => ({ ...q, section: 'reading' })),
    ...qBank.writing.map(q => ({ ...q, section: 'writing' })),
  ]

  const [phase, setPhase]           = useState('intro')   // intro | test | results
  const [qIndex, setQIndex]         = useState(0)
  const [answers, setAnswers]       = useState({})         // id → choice index or string
  const [revealed, setRevealed]     = useState({})         // id → bool
  const [timeLeft, setTimeLeft]     = useState(TOTAL_SECONDS)
  const [animated, setAnimated]     = useState(false)
  const [sectionAnim, setSectionAnim] = useState(false)
  const timerRef = useRef(null)

  const currentQ    = allQuestions[qIndex]
  const currentSec  = SECTIONS.find(s => s.id === currentQ?.section)
  const sectionQs   = allQuestions.filter(q => q.section === currentQ?.section)
  const sectionIdx  = sectionQs.indexOf(currentQ)

  // animate on question change
  useEffect(() => {
    setAnimated(false)
    const t = setTimeout(() => setAnimated(true), 30)
    return () => clearTimeout(t)
  }, [qIndex, phase])

  // timer
  useEffect(() => {
    if (phase !== 'test') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase('results'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  // section transition animation
  const prevSection = useRef(null)
  useEffect(() => {
    if (currentQ && prevSection.current !== currentQ.section) {
      setSectionAnim(false)
      const t = setTimeout(() => setSectionAnim(true), 60)
      prevSection.current = currentQ.section
      return () => clearTimeout(t)
    } else {
      setSectionAnim(true)
    }
  }, [currentQ])

  const startTest = () => { setPhase('test'); setTimeLeft(TOTAL_SECONDS) }

  const handleAnswer = (id, choice) => {
    if (revealed[id]) return
    setAnswers(a => ({ ...a, [id]: choice }))
  }

  const handleReveal = () => {
    if (answers[currentQ.id] === undefined) return
    setRevealed(r => ({ ...r, [currentQ.id]: true }))
  }

  const handleNext = () => {
    if (qIndex < allQuestions.length - 1) setQIndex(i => i + 1)
    else { clearInterval(timerRef.current); setPhase('results') }
  }

  const handlePrev = () => { if (qIndex > 0) setQIndex(i => i - 1) }

  // score
  const score = allQuestions.filter(q => {
    if (q.type === 'writing') return answers[q.id]?.trim().length > 10
    return answers[q.id] === q.answer
  }).length
  const total = allQuestions.length
  const pct = Math.round((score / total) * 100)
  const cefr =
    pct >= 90 ? 'C2' : pct >= 75 ? 'C1' : pct >= 60 ? 'B2' :
    pct >= 45 ? 'B1' : pct >= 30 ? 'A2' : 'A1'

  // ── INTRO SCREEN ────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-16'
      style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E1B4B 100%)' }}>
      <div
        className='w-full max-w-lg rounded-3xl p-8 md:p-12'
        style={{
          background: '#0F172A',
          border: '1px solid #1E293B',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          opacity: animated ? 1 : 0,
          transform: animated ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all .6s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* lang badge */}
        <div className='flex items-center gap-2 mb-8'>
          <span className='text-3xl'>{meta.flag}</span>
          <span
            className='text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full'
            style={{ background: `${meta.color}20`, color: meta.color }}
          >
            {meta.label} Placement Test
          </span>
        </div>

        <h1 className='text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight'>
          Ready to find your level?
        </h1>
        <p className='text-slate-400 text-sm leading-relaxed mb-8'>
          This test has <strong className='text-slate-300'>{total} questions</strong> across 4 sections.
          You have <strong className='text-slate-300'>10 minutes</strong> total. Answer honestly — the results help us recommend the right course for you.
        </p>

        {/* section pills */}
        <div className='grid grid-cols-2 gap-3 mb-10'>
          {SECTIONS.map(s => (
            <div key={s.id} className='flex items-center gap-2 px-3 py-2.5 rounded-xl'
              style={{ background: `${s.color}12`, border: `1px solid ${s.color}30` }}>
              <span className='text-base'>{s.icon}</span>
              <span className='text-xs font-medium' style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={startTest}
          className='w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300'
          style={{
            background: `linear-gradient(135deg, ${meta.color}, ${meta.color}99)`,
            boxShadow: `0 8px 24px ${meta.color}44`,
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Start Test →
        </button>
      </div>
    </div>
  )

  // ── RESULTS SCREEN ──────────────────────────────────────────────────────────
  if (phase === 'results') return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 py-16'
      style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E1B4B 100%)' }}>
      <div
        className='w-full max-w-lg rounded-3xl p-8 md:p-12 text-center'
        style={{
          background: '#0F172A', border: '1px solid #1E293B',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          opacity: animated ? 1 : 0,
          transform: animated ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all .6s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <span className='text-5xl mb-4 block'>🎉</span>
        <p className='text-slate-400 text-xs uppercase tracking-widest mb-2'>Your result</p>
        <div
          className='text-7xl font-black mb-2'
          style={{ color: meta.color }}
        >{cefr}</div>
        <p className='text-slate-300 text-sm mb-6'>
          You answered <strong className='text-white'>{score}</strong> out of <strong className='text-white'>{total}</strong> correctly ({pct}%)
        </p>

        {/* section breakdown */}
        <div className='space-y-3 mb-8 text-left'>
          {SECTIONS.map(s => {
            const qs = allQuestions.filter(q => q.section === s.id)
            const correct = qs.filter(q =>
              q.type === 'writing' ? answers[q.id]?.trim().length > 10 : answers[q.id] === q.answer
            ).length
            return (
              <div key={s.id}>
                <div className='flex justify-between text-xs mb-1'>
                  <span className='text-slate-400'>{s.icon} {s.label}</span>
                  <span style={{ color: s.color }}>{correct}/{qs.length}</span>
                </div>
                <ProgressBar current={correct} total={qs.length} color={s.color} />
              </div>
            )
          })}
        </div>

        <div className='flex gap-3'>
          <button
            onClick={() => navigate('/courses')}
            className='flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200'
            style={{ background: meta.color, boxShadow: `0 4px 16px ${meta.color}44` }}
          >
            Browse Courses
          </button>
          <button
            onClick={() => { setPhase('intro'); setQIndex(0); setAnswers({}); setRevealed({}); setTimeLeft(TOTAL_SECONDS) }}
            className='flex-1 py-3 rounded-xl text-slate-300 text-sm font-semibold border border-slate-700 hover:border-slate-500 transition-all duration-200'
          >
            Retake Test
          </button>
        </div>
      </div>
    </div>
  )

  // ── TEST SCREEN ─────────────────────────────────────────────────────────────
  const isAnswered = answers[currentQ.id] !== undefined
  const isRevealed = revealed[currentQ.id]
  const canNext = currentQ.type === 'writing' ? answers[currentQ.id]?.trim().length > 0 : isRevealed

  return (
    <div className='min-h-screen flex flex-col' style={{ background: '#0F172A' }}>

      {/* ── Top bar ── */}
      <div className='sticky top-0 z-30' style={{ background: '#0A0F1E', borderBottom: '1px solid #1E293B' }}>
        <div className='max-w-2xl mx-auto px-4 py-3 flex items-center gap-4'>

          {/* section tabs */}
          <div className='flex gap-1 flex-1 min-w-0 overflow-x-auto hide-scroll'>
            {SECTIONS.map((s, i) => {
              const sQs = allQuestions.filter(q => q.section === s.id)
              const done = sQs.every(q => answers[q.id] !== undefined)
              const active = s.id === currentQ.section
              return (
                <button
                  key={s.id}
                  onClick={() => setQIndex(allQuestions.findIndex(q => q.section === s.id))}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0'
                  style={{
                    background: active ? `${s.color}20` : 'transparent',
                    color: active ? s.color : done ? '#64748B' : '#475569',
                    border: active ? `1px solid ${s.color}40` : '1px solid transparent',
                  }}
                >
                  <span>{s.icon}</span>
                  <span className='hidden sm:inline'>{s.label}</span>
                </button>
              )
            })}
          </div>

          {/* timer */}
          <CircleTimer seconds={timeLeft} total={TOTAL_SECONDS} />
        </div>

        {/* overall progress */}
        <ProgressBar current={qIndex + 1} total={allQuestions.length} color={currentSec?.color || '#6366F1'} />
      </div>

      {/* ── Question area ── */}
      <div className='flex-1 max-w-2xl mx-auto w-full px-4 py-8'>

        {/* section header */}
        <div
          className='flex items-center gap-3 mb-6'
          style={{
            opacity: sectionAnim ? 1 : 0,
            transform: sectionAnim ? 'translateX(0)' : 'translateX(-12px)',
            transition: 'all .4s ease',
          }}
        >
          <span
            className='w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0'
            style={{ background: `${currentSec?.color}15` }}
          >{currentSec?.icon}</span>
          <div>
            <p className='text-xs uppercase tracking-widest font-semibold' style={{ color: currentSec?.color }}>
              {currentSec?.label}
            </p>
            <p className='text-slate-500 text-xs'>Question {sectionIdx + 1} of {sectionQs.length}</p>
          </div>
          <div className='ml-auto flex gap-1'>
            {sectionQs.map((_, i) => (
              <div key={i} className='w-2 h-2 rounded-full transition-all duration-300'
                style={{ background: i <= sectionIdx ? currentSec?.color : '#1E293B' }} />
            ))}
          </div>
        </div>

        {/* card */}
        <div
          className='rounded-2xl p-6 md:p-8 mb-6'
          style={{
            background: '#111827',
            border: '1px solid #1E293B',
            opacity: animated ? 1 : 0,
            transform: animated ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all .45s cubic-bezier(.22,1,.36,1)',
          }}
        >
          {/* passage */}
          {currentQ.passage && (
            <div
              className='mb-6 p-4 rounded-xl text-sm leading-relaxed text-slate-300 italic'
              style={{ background: '#0F172A', borderLeft: `3px solid ${currentSec?.color}` }}
            >
              {currentQ.passage}
            </div>
          )}

          {/* question */}
          <h2 className='text-white text-base md:text-lg font-semibold leading-snug mb-6'>
            {currentQ.question}
          </h2>

          {/* MCQ options */}
          {currentQ.type !== 'writing' && (
            <div className='space-y-3'>
              {currentQ.options.map((opt, i) => (
                <MCQOption
                  key={i}
                  text={opt}
                  index={i}
                  selected={answers[currentQ.id] === i}
                  onClick={() => handleAnswer(currentQ.id, i)}
                  revealed={isRevealed}
                  correct={currentQ.answer}
                />
              ))}
            </div>
          )}

          {/* Writing */}
          {currentQ.type === 'writing' && (
            <textarea
              rows={5}
              placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ''}
              onChange={e => handleAnswer(currentQ.id, e.target.value)}
              className='w-full rounded-xl px-4 py-3 text-sm text-slate-200 resize-none focus:outline-none transition-all duration-200'
              style={{
                background: '#0F172A',
                border: `1.5px solid ${answers[currentQ.id] ? currentSec?.color + '60' : '#1E293B'}`,
                caretColor: currentSec?.color,
              }}
            />
          )}
        </div>

        {/* actions */}
        <div className='flex items-center gap-3'>
          <button
            onClick={handlePrev}
            disabled={qIndex === 0}
            className='px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed'
          >
            ← Back
          </button>

          <div className='flex-1' />

          {/* reveal button — only for MCQ, before revealed */}
          {currentQ.type !== 'writing' && !isRevealed && (
            <button
              onClick={handleReveal}
              disabled={!isAnswered}
              className='px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed'
              style={{ background: `${currentSec?.color}20`, color: currentSec?.color, border: `1px solid ${currentSec?.color}40` }}
            >
              Check answer
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!canNext}
            className='px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed'
            style={{ background: canNext ? currentSec?.color : '#1E293B', boxShadow: canNext ? `0 4px 16px ${currentSec?.color}44` : 'none' }}
          >
            {qIndex === allQuestions.length - 1 ? 'Finish →' : 'Next →'}
          </button>
        </div>

        {/* question dots */}
        <div className='flex justify-center gap-1.5 mt-8 flex-wrap'>
          {allQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setQIndex(i)}
              className='w-2.5 h-2.5 rounded-full transition-all duration-200'
              style={{
                background:
                  i === qIndex ? currentSec?.color :
                  answers[q.id] !== undefined ? '#334155' : '#1E293B',
                transform: i === qIndex ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestPage