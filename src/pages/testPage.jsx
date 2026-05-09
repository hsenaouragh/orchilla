import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ─── Gravity-UI SVG Icons (inline, no dependencies) ───────────────────────────
const IconGrammar = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 10h12M4 14h8M4 18h10" />
  </svg>
)
const IconVocabulary = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h6M9 11h4" />
  </svg>
)
const IconReading = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35M8 11h6M11 8v6" />
  </svg>
)
const IconWriting = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
)
const IconCheck = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconX = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconArrowLeft = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)
const IconArrowRight = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const IconRefresh = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)
const IconCourses = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)
const IconClock = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconStar = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// ─── Site palette (from screenshots) ─────────────────────────────────────────
const C = {
  orange:      '#F5A623',   // dominant page background
  orangeDark:  '#E09510',   // hover / deeper orange
  orangeLight: '#FBD07A',   // lighter tint
  orangeFaint: '#FEF3DC',   // very faint bg tint

  maroon:      '#7C1D1D',   // primary buttons (dark wine/maroon from screenshots)
  maroonHover: '#6B1515',
  maroonLight: '#F3E8E8',

  green:       '#1D9E75',   // accent (placement banner, correct answers)
  greenDark:   '#0F6E56',
  greenFaint:  '#E8F8F2',

  brown:       '#704032',   // section labels
  white:       '#FFFFFF',
  offWhite:    '#FFFBF5',   // card bg with slight warmth
  border:      '#EDE0CC',   // warm card border

  text:        '#1A1209',   // near-black headings
  textBody:    '#4A3728',   // warm brown-grey body
  textMuted:   '#8C7660',   // muted warm
  textFaint:   '#C4B49E',

  correct:     '#1D9E75',
  correctBg:   '#E8F8F2',
  wrong:       '#DC2626',
  wrongBg:     '#FEF2F2',
}

// ─── Question Bank ────────────────────────────────────────────────────────────
const QUESTIONS = {
  english: {
    grammar: [
      { id: 'en_g1', type: 'mcq', question: 'Choose the correct sentence:', options: ["She don't like coffee in the morning.", "She doesn't likes coffee in the morning.", "She doesn't like coffee in the morning.", "She not like coffee in the morning."], answer: 2 },
      { id: 'en_g2', type: 'mcq', question: 'Which sentence uses the Past Perfect correctly?', options: ['By the time she arrived, I have already eaten.', 'By the time she arrived, I had already eaten.', 'By the time she arrived, I already ate.', 'By the time she arrived, I was already eating.'], answer: 1 },
      { id: 'en_g3', type: 'mcq', question: 'Select the correct passive voice form: "They build the bridge in 1990."', options: ['The bridge is built in 1990.', 'The bridge was being built in 1990.', 'The bridge was built in 1990.', 'The bridge had been built in 1990.'], answer: 2 },
    ],
    vocabulary: [
      { id: 'en_v1', type: 'mcq', question: 'What does "ephemeral" mean?', options: ['Permanent and lasting', 'Short-lived or transitory', 'Ancient or old', 'Bright and colorful'], answer: 1 },
      { id: 'en_v2', type: 'mcq', question: 'Choose the word closest in meaning to "benevolent":', options: ['Cruel', 'Indifferent', 'Kind and generous', 'Selfish'], answer: 2 },
      { id: 'en_v3', type: 'mcq', question: '"She was ______ by the complexity of the problem." — Choose the best word:', options: ['amused', 'daunted', 'pleased', 'relieved'], answer: 1 },
    ],
    reading: [
      { id: 'en_r1', type: 'passage', passage: 'The concept of "flow," introduced by psychologist Mihaly Csikszentmihalyi, describes a state of deep focus where a person is fully immersed in a challenging yet manageable activity. During flow, time seems to distort, and self-consciousness fades. Athletes call it "being in the zone." Researchers argue that cultivating flow leads to greater life satisfaction.', question: 'According to the passage, what happens to self-consciousness during flow?', options: ['It intensifies significantly.', 'It remains unchanged.', 'It fades away.', 'It transforms into confidence.'], answer: 2 },
      { id: 'en_r2', type: 'passage', passage: 'The concept of "flow," introduced by psychologist Mihaly Csikszentmihalyi, describes a state of deep focus where a person is fully immersed in a challenging yet manageable activity. During flow, time seems to distort, and self-consciousness fades. Athletes call it "being in the zone." Researchers argue that cultivating flow leads to greater life satisfaction.', question: 'What is the main purpose of this passage?', options: ['To criticize the concept of flow.', 'To introduce and explain the concept of flow.', 'To provide instructions for achieving flow.', 'To compare athletes to researchers.'], answer: 1 },
    ],
    writing: [{ id: 'en_w1', type: 'writing', question: 'In 2–4 sentences, describe a time you learned something new and how it made you feel. Use at least one past tense and one present tense.', placeholder: 'Write your response here…' }],
  },
  french: {
    grammar: [
      { id: 'fr_g1', type: 'mcq', question: 'Choisissez la forme correcte du verbe "aller" au présent :', options: ["Je vas à l'école.", "Je vais à l'école.", "Je aille à l'école.", "J'allez à l'école."], answer: 1 },
      { id: 'fr_g2', type: 'mcq', question: 'Quelle phrase utilise correctement le subjonctif ?', options: ['Il faut que tu viens demain.', 'Il faut que tu viens pas.', 'Il faut que tu viennes demain.', 'Il faut que tu venais demain.'], answer: 2 },
      { id: 'fr_g3', type: 'mcq', question: 'Complétez : "Elle ______ son livre quand le téléphone a sonné."', options: ['lisait', 'lit', 'lira', 'lirait'], answer: 0 },
    ],
    vocabulary: [
      { id: 'fr_v1', type: 'mcq', question: 'Quel est le synonyme de "rapide" ?', options: ['Lent', 'Vif', 'Lourd', 'Calme'], answer: 1 },
      { id: 'fr_v2', type: 'mcq', question: 'Que signifie "quotidien" ?', options: ['Hebdomadaire', 'Mensuel', 'De chaque jour', 'Annuel'], answer: 2 },
      { id: 'fr_v3', type: 'mcq', question: '"Il est très ______ — il aide toujours les autres." Choisissez le bon mot :', options: ['avare', 'généreux', 'paresseux', 'timide'], answer: 1 },
    ],
    reading: [
      { id: 'fr_r1', type: 'passage', passage: "La gastronomie française est reconnue mondialement. En 2010, l'UNESCO a inscrit le repas gastronomique des Français au patrimoine culturel immatériel de l'humanité. Ce repas se caractérise par le choix de bons produits, l'accord entre les mets et les vins, et l'art de la conversation à table. Pour les Français, manger est bien plus qu'un simple besoin physiologique : c'est un rituel social.", question: "Pourquoi le repas gastronomique français a-t-il été inscrit au patrimoine de l'UNESCO ?", options: ['Parce que la cuisine française est la plus ancienne du monde.', "Parce qu'il représente une tradition culturelle et sociale importante.", 'Parce que les restaurants français sont les meilleurs du monde.', 'Parce que les Français mangent plus que les autres peuples.'], answer: 1 },
      { id: 'fr_r2', type: 'passage', passage: "La gastronomie française est reconnue mondialement. En 2010, l'UNESCO a inscrit le repas gastronomique des Français au patrimoine culturel immatériel de l'humanité. Ce repas se caractérise par le choix de bons produits, l'accord entre les mets et les vins, et l'art de la conversation à table. Pour les Français, manger est bien plus qu'un simple besoin physiologique : c'est un rituel social.", question: "D'après le texte, qu'est-ce que manger représente pour les Français ?", options: ['Une obligation médicale.', 'Un simple besoin biologique.', 'Un rituel social et culturel.', 'Une activité économique.'], answer: 2 },
    ],
    writing: [{ id: 'fr_w1', type: 'writing', question: "En 2 à 4 phrases, décrivez votre plat préféré et expliquez pourquoi vous l'aimez. Utilisez au moins un adjectif et un verbe au présent.", placeholder: 'Écrivez votre réponse ici…' }],
  },
  italian: {
    grammar: [
      { id: 'it_g1', type: 'mcq', question: 'Scegli la forma corretta del verbo "essere" al presente:', options: ['Loro è studenti.', 'Loro sono studenti.', 'Loro sta studenti.', 'Loro siamo studenti.'], answer: 1 },
      { id: 'it_g2', type: 'mcq', question: 'Quale frase usa correttamente il passato prossimo?', options: ['Ieri ho mangiato una pizza.', 'Ieri mangiavo una pizza.', 'Ieri mangiai una pizza.', 'Ieri mangio una pizza.'], answer: 0 },
      { id: 'it_g3', type: 'mcq', question: 'Completa: "Quando ero piccolo, ______ spesso al parco."', options: ['andai', 'sono andato', 'andrò', 'andavo'], answer: 3 },
    ],
    vocabulary: [
      { id: 'it_v1', type: 'mcq', question: 'Qual è il sinonimo di "felice"?', options: ['Triste', 'Contento', 'Arrabbiato', 'Stanco'], answer: 1 },
      { id: 'it_v2', type: 'mcq', question: 'Cosa significa "affascinante"?', options: ['Noioso', 'Pericoloso', 'Che affascina, attraente', 'Veloce'], answer: 2 },
      { id: 'it_v3', type: 'mcq', question: '"Dopo la gara, il corridore era completamente ______." Scegli la parola migliore:', options: ['riposato', 'sorridente', 'esausto', 'nervoso'], answer: 2 },
    ],
    reading: [
      { id: 'it_r1', type: 'passage', passage: "Il Rinascimento italiano, fiorito tra il XIV e il XVII secolo, segnò una svolta epocale nella storia della cultura europea. Nato a Firenze, questo movimento celebrava l'uomo come centro dell'universo, riscoprendo i valori dell'antichità classica. Artisti come Leonardo da Vinci e Michelangelo incarnarono l'ideale dell'uomo universale, capace di eccellere in discipline diverse.", question: 'Dove nacque il Rinascimento italiano?', options: ['A Roma', 'A Venezia', 'A Firenze', 'A Milano'], answer: 2 },
      { id: 'it_r2', type: 'passage', passage: "Il Rinascimento italiano, fiorito tra il XIV e il XVII secolo, segnò una svolta epocale nella storia della cultura europea. Nato a Firenze, questo movimento celebrava l'uomo come centro dell'universo, riscoprendo i valori dell'antichità classica. Artisti come Leonardo da Vinci e Michelangelo incarnarono l'ideale dell'uomo universale, capace di eccellere in discipline diverse.", question: 'Cosa celebrava il Rinascimento?', options: ["La supremazia della religione sull'uomo.", "L'uomo come centro dell'universo.", 'La potenza militare italiana.', "Il dominio della natura sull'uomo."], answer: 1 },
    ],
    writing: [{ id: 'it_w1', type: 'writing', question: 'In 2–4 frasi, descrivi il tuo posto preferito in Italia o in un altro paese. Usa almeno un aggettivo e un verbo al presente.', placeholder: 'Scrivi la tua risposta qui…' }],
  },
  korean: {
    grammar: [
      { id: 'ko_g1', type: 'mcq', question: 'Choose the correct particle to complete: "저는 학교___ 갑니다."', options: ['을', '에', '이', '는'], answer: 1 },
      { id: 'ko_g2', type: 'mcq', question: 'Which sentence is in the past tense?', options: ['저는 밥을 먹어요.', '저는 밥을 먹을 거예요.', '저는 밥을 먹었어요.', '저는 밥을 먹고 있어요.'], answer: 2 },
      { id: 'ko_g3', type: 'mcq', question: 'Select the correct honorific form of "먹다" (to eat):', options: ['먹어요', '먹습니다', '드세요', '먹자'], answer: 2 },
    ],
    vocabulary: [
      { id: 'ko_v1', type: 'mcq', question: 'What does "행복하다" mean?', options: ['To be sad', 'To be angry', 'To be happy', 'To be tired'], answer: 2 },
      { id: 'ko_v2', type: 'mcq', question: 'Which word means "beautiful" in Korean?', options: ['무섭다', '아름답다', '빠르다', '어렵다'], answer: 1 },
      { id: 'ko_v3', type: 'mcq', question: '"그 영화는 정말 ______." Choose the best word for "boring":', options: ['재미있어요', '무서워요', '지루해요', '슬퍼요'], answer: 2 },
    ],
    reading: [
      { id: 'ko_r1', type: 'passage', passage: 'Hangul, the Korean writing system, was created in 1443 by King Sejong the Great during the Joseon Dynasty. Before its creation, Koreans used Classical Chinese characters, which were difficult for common people to learn. Sejong designed Hangul to be easy to learn so that all Koreans could read and write. Today, Hangul is celebrated on Hangul Day, a national holiday in South Korea observed on October 9th.', question: 'Why did King Sejong create Hangul?', options: ['To replace Chinese culture with Korean culture.', 'To make reading and writing accessible to all Koreans.', 'To create a secret code for the royal court.', 'To simplify the Chinese writing system.'], answer: 1 },
      { id: 'ko_r2', type: 'passage', passage: 'Hangul, the Korean writing system, was created in 1443 by King Sejong the Great during the Joseon Dynasty. Before its creation, Koreans used Classical Chinese characters, which were difficult for common people to learn. Sejong designed Hangul to be easy to learn so that all Koreans could read and write. Today, Hangul is celebrated on Hangul Day, a national holiday in South Korea observed on October 9th.', question: 'When is Hangul Day celebrated?', options: ['September 9th', 'November 9th', 'October 9th', 'October 19th'], answer: 2 },
    ],
    writing: [{ id: 'ko_w1', type: 'writing', question: 'In 2–4 sentences (in English or Korean), describe something you enjoy about Korean culture — food, music, drama, or language. Why does it interest you?', placeholder: 'Write your response here… / 여기에 답을 쓰세요…' }],
  },
}

// ─── Sections (gravity-ui icon components, no emojis) ─────────────────────────
const SECTIONS = [
  { id: 'grammar',    label: 'Grammar',    sublabel: '& Structure',   Icon: IconGrammar,    color: '#378ADD', seconds: 150 },
  { id: 'vocabulary', label: 'Vocabulary', sublabel: 'Word Knowledge', Icon: IconVocabulary, color: '#8B5CF6', seconds: 120 },
  { id: 'reading',    label: 'Reading',    sublabel: 'Comprehension',  Icon: IconReading,    color: C.green,   seconds: 180 },
  { id: 'writing',    label: 'Writing',    sublabel: 'Expression',     Icon: IconWriting,    color: C.maroon,  seconds: 150 },
]

const LANG_META = {
  english: { label: 'English', flag: '🇬🇧', color: '#378ADD' },
  french:  { label: 'French',  flag: '🇫🇷', color: '#E85D26' },
  italian: { label: 'Italian', flag: '🇮🇹', color: '#D4537E' },
  korean:  { label: 'Korean',  flag: '🇰🇷', color: C.green   },
}

const TOTAL_SECONDS = 600
const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

// ─── Circle Timer — warm palette ──────────────────────────────────────────────
const CircleTimer = ({ seconds, total }) => {
  const r = 30, circ = 2 * Math.PI * r
  const pct = seconds / total
  const danger = seconds < 60
  const warn   = seconds < 120
  const stroke = danger ? C.wrong : warn ? C.orange : C.maroon
  const track  = danger ? '#FEE2E2' : warn ? C.orangeFaint : C.maroonLight

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 74, height: 74, flexShrink: 0 }}>
      <svg width="74" height="74" viewBox="0 0 74 74" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="37" cy="37" r={r} fill="none" stroke={track} strokeWidth="5" />
        <circle cx="37" cy="37" r={r} fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
        />
      </svg>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: stroke, fontFamily: 'monospace', letterSpacing: '-0.5px' }}>
          {fmt(seconds)}
        </div>
      </div>
    </div>
  )
}

// ─── Progress bar — orange-on-white track ─────────────────────────────────────
const ProgressTrack = ({ current, total, color }) => (
  <div style={{ width: '100%', height: 4, background: C.orangeFaint }}>
    <div style={{
      height: '100%', width: `${(current / total) * 100}%`,
      background: color, transition: 'width 0.5s cubic-bezier(.22,1,.36,1)',
    }} />
  </div>
)

// ─── Decorated Section Scroll Indicator ──────────────────────────────────────
const SectionScrollIndicator = ({ sections, allQuestions, answers, currentSection, onSectionClick }) => (
  <div style={{ position: 'relative' }}>
    {/* connector line */}
    <div style={{
      position: 'absolute', top: '50%', left: 10, right: 10, height: 1.5,
      background: `linear-gradient(90deg, ${C.border} 0%, ${C.orangeLight} 50%, ${C.border} 100%)`,
      transform: 'translateY(-50%)', zIndex: 0, borderRadius: 2,
    }} />
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none', position: 'relative', zIndex: 1 }}>
      {sections.map(s => {
        const sQs = allQuestions.filter(q => q.section === s.id)
        const answered = sQs.filter(q => answers[q.id] !== undefined).length
        const complete = answered === sQs.length
        const active = s.id === currentSection
        const Icon = s.Icon

        return (
          <button
            key={s.id}
            onClick={() => onSectionClick(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: active ? '8px 13px' : '6px 11px',
              borderRadius: 12, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
              border: active
                ? `1.5px solid ${s.color}`
                : complete ? `1.5px solid ${s.color}55` : `1.5px solid ${C.border}`,
              background: active
                ? C.white
                : complete ? `${s.color}08` : 'rgba(255,255,255,0.55)',
              boxShadow: active
                ? `0 2px 14px ${s.color}28, 0 0 0 3px ${s.color}10`
                : '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.25s cubic-bezier(.22,1,.36,1)',
              position: 'relative',
            }}
          >
            {/* active pulse beacon */}
            {active && (
              <span style={{
                position: 'absolute', top: -4, right: -4, width: 8, height: 8,
                borderRadius: '50%', background: s.color,
                boxShadow: `0 0 0 2px ${C.white}, 0 0 6px ${s.color}`,
                animation: 'pulseDot 1.8s ease-in-out infinite', display: 'block',
              }} />
            )}
            {/* icon */}
            <span style={{
              width: 26, height: 26, borderRadius: 7, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? `${s.color}18` : complete ? `${s.color}10` : C.orangeFaint,
            }}>
              <Icon size={14} color={active ? s.color : complete ? s.color : C.textMuted} />
            </span>
            {/* label */}
            <span>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: active ? s.color : complete ? s.color : C.textMuted }}>
                {s.label}
              </span>
              <span style={{ display: 'block', fontSize: 9.5, color: active ? `${s.color}99` : C.textFaint, marginTop: 1 }}>
                {s.sublabel}
              </span>
            </span>
            {/* progress pips */}
            <span style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 2 }}>
              {sQs.map((_, i) => (
                <span key={i} style={{
                  display: 'block',
                  width: i < answered ? 6 : 4, height: i < answered ? 6 : 4, borderRadius: '50%',
                  background: i < answered ? s.color : C.border,
                  boxShadow: (i < answered && active) ? `0 0 4px ${s.color}80` : 'none',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </span>
            {/* complete badge */}
            {complete && !active && (
              <span style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: `${s.color}12`, border: `1px solid ${s.color}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <IconCheck size={9} color={s.color} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  </div>
)

// ─── MCQ Option ───────────────────────────────────────────────────────────────
const MCQOption = ({ text, index, selected, onClick, revealed, correct }) => {
  const letters = ['A', 'B', 'C', 'D']
  const isCorrect = revealed && index === correct
  const isWrong   = revealed && selected && index !== correct

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderRadius: 12, textAlign: 'left',
        cursor: revealed ? 'default' : 'pointer',
        background: isCorrect ? C.correctBg : isWrong ? C.wrongBg : selected ? C.maroonLight : C.white,
        border: `1.5px solid ${isCorrect ? C.correct : isWrong ? C.wrong : selected ? C.maroon : C.border}`,
        boxShadow: isCorrect ? `0 0 0 3px ${C.correct}14` : isWrong ? `0 0 0 3px ${C.wrong}10` : selected ? `0 0 0 3px ${C.maroon}10` : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700,
        background: isCorrect ? C.correct : isWrong ? C.wrong : selected ? C.maroon : C.orangeFaint,
        color: (isCorrect || isWrong || selected) ? C.white : C.textMuted,
        transition: 'all 0.2s ease',
      }}>
        {isCorrect ? <IconCheck size={12} color={C.white} /> : isWrong ? <IconX size={12} color={C.white} /> : letters[index]}
      </span>
      <span style={{ fontSize: 13.5, color: isCorrect ? C.greenDark : isWrong ? '#B91C1C' : C.textBody, flex: 1, fontWeight: selected && !revealed ? 600 : 400 }}>
        {text}
      </span>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const TestPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const lang   = params.get('lang') || 'english'
  const meta   = LANG_META[lang] || LANG_META.english
  const qBank  = QUESTIONS[lang] || QUESTIONS.english

  const allQuestions = [
    ...qBank.grammar.map(q => ({ ...q, section: 'grammar' })),
    ...qBank.vocabulary.map(q => ({ ...q, section: 'vocabulary' })),
    ...qBank.reading.map(q => ({ ...q, section: 'reading' })),
    ...qBank.writing.map(q => ({ ...q, section: 'writing' })),
  ]

  const [phase, setPhase]       = useState('intro')
  const [qIndex, setQIndex]     = useState(0)
  const [answers, setAnswers]   = useState({})
  const [revealed, setRevealed] = useState({})
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS)
  const [animated, setAnimated] = useState(false)
  const [secAnim, setSecAnim]   = useState(false)
  const timerRef    = useRef(null)
  const prevSection = useRef(null)

  const currentQ   = allQuestions[qIndex]
  const currentSec = SECTIONS.find(s => s.id === currentQ?.section)
  const sectionQs  = allQuestions.filter(q => q.section === currentQ?.section)
  const sectionIdx = sectionQs.indexOf(currentQ)

  useEffect(() => {
    setAnimated(false)
    const t = setTimeout(() => setAnimated(true), 30)
    return () => clearTimeout(t)
  }, [qIndex, phase])

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

  useEffect(() => {
    if (currentQ && prevSection.current !== currentQ.section) {
      setSecAnim(false)
      const t = setTimeout(() => setSecAnim(true), 60)
      prevSection.current = currentQ.section
      return () => clearTimeout(t)
    } else { setSecAnim(true) }
  }, [currentQ])

  useEffect(() => {
    const s = document.createElement('style')
    s.textContent = `@keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}`
    document.head.appendChild(s)
    return () => document.head.removeChild(s)
  }, [])

  const startTest    = () => { setPhase('test'); setTimeLeft(TOTAL_SECONDS) }
  const handleAnswer = (id, val) => { if (!revealed[id]) setAnswers(a => ({ ...a, [id]: val })) }
  const handleReveal = () => { if (answers[currentQ.id] !== undefined) setRevealed(r => ({ ...r, [currentQ.id]: true })) }
  const handleNext   = () => { if (qIndex < allQuestions.length - 1) setQIndex(i => i + 1); else { clearInterval(timerRef.current); setPhase('results') } }
  const handlePrev   = () => { if (qIndex > 0) setQIndex(i => i - 1) }

  const score = allQuestions.filter(q => q.type === 'writing' ? answers[q.id]?.trim().length > 10 : answers[q.id] === q.answer).length
  const total = allQuestions.length
  const pct   = Math.round((score / total) * 100)
  const cefr  = pct >= 90 ? 'C2' : pct >= 75 ? 'C1' : pct >= 60 ? 'B2' : pct >= 45 ? 'B1' : pct >= 30 ? 'A2' : 'A1'
  const cefrColor = { C2: C.maroon, C1: C.maroon, B2: C.green, B1: C.green, A2: '#378ADD', A1: '#8B5CF6' }[cefr]

  const isAnswered = answers[currentQ?.id] !== undefined
  const isRevealed = revealed[currentQ?.id]
  const canNext    = currentQ?.type === 'writing' ? answers[currentQ.id]?.trim().length > 0 : isRevealed

  // shared page background — the real amber orange from screenshots
  const pageBg = C.orange

  // ─── INTRO ────────────────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 16px', background: pageBg,
    }}>
      {/* White floating card — same style as site's membership/offer cards */}
      <div style={{
        width: '100%', maxWidth: 500, background: C.white,
        borderRadius: 28, padding: '44px 40px',
        boxShadow: '0 16px 60px rgba(0,0,0,0.18)',
        opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.55s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ fontSize: 34 }}>{meta.flag}</span>
          <div>
            {/* brand brown label */}
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.brown, margin: '0 0 3px' }}>
              Placement Test
            </p>
            <p style={{ fontSize: 19, fontWeight: 800, color: meta.color, margin: 0 }}>{meta.label}</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 2, color: C.orange }}>
            {[...Array(5)].map((_, i) => <IconStar key={i} size={13} />)}
          </div>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 900, color: C.text, lineHeight: 1.25, margin: '0 0 12px' }}>
          Ready to find your level?
        </h1>
        <p style={{ fontSize: 14, color: C.textBody, lineHeight: 1.75, margin: '0 0 28px' }}>
          This test covers <strong style={{ color: C.text }}>{total} questions</strong> across 4 sections.
          You have <strong style={{ color: C.text }}>10 minutes</strong> — answer honestly for the best course recommendation.
        </p>

        {/* Section preview grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
          {SECTIONS.map(s => {
            const Icon = s.Icon
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '10px 13px', borderRadius: 12,
                background: `${s.color}0C`, border: `1px solid ${s.color}28`,
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}18` }}>
                  <Icon size={15} color={s.color} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: s.color }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>{s.sublabel}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick stats row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28, padding: '12px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          {[
            { label: '10 min', sub: 'Quick & focused', icon: <IconClock size={13} color={C.maroon} /> },
            { label: 'A1 – C2', sub: 'Full coverage', icon: <IconStar size={13} /> },
            { label: 'Instant', sub: 'Results right away', icon: <IconCheck size={13} color={C.green} /> },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 2 }}>
                <span style={{ color: C.orange }}>{item.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{item.label}</span>
              </div>
              <div style={{ fontSize: 10, color: C.textMuted }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Maroon primary button — from site screenshots */}
        <button
          onClick={startTest}
          style={{
            width: '100%', padding: '16px 0', borderRadius: 50,
            border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 15, color: C.white,
            background: C.maroon,
            boxShadow: `0 4px 20px ${C.maroon}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.maroonHover; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = C.maroon; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Start the test <IconArrowRight size={16} />
        </button>
      </div>
    </div>
  )

  // ─── RESULTS ──────────────────────────────────────────────────────────────────
  if (phase === 'results') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', background: pageBg }}>
      <div style={{
        width: '100%', maxWidth: 500, background: C.white,
        borderRadius: 28, padding: '44px 40px',
        boxShadow: '0 16px 60px rgba(0,0,0,0.18)', textAlign: 'center',
        opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all 0.55s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Brown label */}
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.brown, margin: '0 0 16px' }}>
          Your Result
        </p>

        {/* CEFR ring */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 100, height: 100, borderRadius: '50%',
          background: `${cefrColor}0F`, border: `3px solid ${cefrColor}`,
          boxShadow: `0 0 0 8px ${cefrColor}08`, marginBottom: 16,
        }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: cefrColor }}>{cefr}</span>
        </div>

        <p style={{ fontSize: 14, color: C.textBody, margin: '0 0 28px' }}>
          You answered <strong style={{ color: C.text }}>{score}</strong> of{' '}
          <strong style={{ color: C.text }}>{total}</strong> correctly{' '}
          <span style={{ color: cefrColor, fontWeight: 700 }}>({pct}%)</span>
        </p>

        {/* Section bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, textAlign: 'left' }}>
          {SECTIONS.map(s => {
            const qs = allQuestions.filter(q => q.section === s.id)
            const correct = qs.filter(q => q.type === 'writing' ? answers[q.id]?.trim().length > 10 : answers[q.id] === q.answer).length
            const Icon = s.Icon
            return (
              <div key={s.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}14`, flexShrink: 0 }}>
                    <Icon size={12} color={s.color} />
                  </div>
                  <span style={{ fontSize: 12.5, color: C.textBody, flex: 1 }}>{s.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: s.color }}>{correct}/{qs.length}</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, background: C.orangeFaint, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${(correct / qs.length) * 100}%`,
                    background: `linear-gradient(90deg, ${s.color}80, ${s.color})`,
                    borderRadius: 4, transition: 'width 0.8s cubic-bezier(.22,1,.36,1)',
                  }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {/* maroon primary */}
          <button
            onClick={() => navigate('/courses')}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 50, border: 'none',
              cursor: 'pointer', fontWeight: 700, fontSize: 13, color: C.white,
              background: C.maroon, boxShadow: `0 4px 14px ${C.maroon}38`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.maroonHover; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.maroon; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <IconCourses size={15} /> Browse Courses
          </button>
          {/* white outline — from screenshots */}
          <button
            onClick={() => { setPhase('intro'); setQIndex(0); setAnswers({}); setRevealed({}); setTimeLeft(TOTAL_SECONDS) }}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 50,
              border: `2px solid ${C.border}`, cursor: 'pointer',
              fontWeight: 700, fontSize: 13, color: C.textBody, background: C.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.maroon; e.currentTarget.style.color = C.maroon }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textBody }}
          >
            <IconRefresh size={15} /> Retake
          </button>
        </div>
      </div>
    </div>
  )

  // ─── TEST SCREEN ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: pageBg }}>

      {/* ── Sticky white top bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${C.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <SectionScrollIndicator
              sections={SECTIONS} allQuestions={allQuestions} answers={answers}
              currentSection={currentQ.section}
              onSectionClick={sid => setQIndex(allQuestions.findIndex(q => q.section === sid))}
            />
          </div>
          <CircleTimer seconds={timeLeft} total={TOTAL_SECONDS} />
        </div>
        <ProgressTrack current={qIndex + 1} total={allQuestions.length} color={currentSec?.color || C.maroon} />
      </div>

      {/* ── Question area — floats on orange ── */}
      <div style={{ flex: 1, maxWidth: 680, margin: '0 auto', width: '100%', padding: '32px 16px 56px' }}>

        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
          opacity: secAnim ? 1 : 0, transform: secAnim ? 'translateX(0)' : 'translateX(-14px)',
          transition: 'all 0.4s ease',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: C.white, border: `1.5px solid ${currentSec?.color}30`,
            boxShadow: `0 2px 10px ${currentSec?.color}20`,
          }}>
            {currentSec && <currentSec.Icon size={18} color={currentSec.color} />}
          </div>
          <div style={{ flex: 1 }}>
            {/* brown label pattern */}
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.white, margin: '0 0 2px', opacity: 0.85 }}>
              {currentSec?.label} · {currentSec?.sublabel}
            </p>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Question {sectionIdx + 1} of {sectionQs.length}
            </p>
          </div>
          {/* pip progress strip */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {sectionQs.map((_, i) => (
              <div key={i} style={{
                width: i === sectionIdx ? 22 : 7, height: 7, borderRadius: 4,
                background: i < sectionIdx ? C.white : i === sectionIdx ? C.white : 'rgba(255,255,255,0.3)',
                opacity: i < sectionIdx ? 0.7 : 1,
                boxShadow: i === sectionIdx ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
                transition: 'all 0.35s cubic-bezier(.22,1,.36,1)',
              }} />
            ))}
          </div>
        </div>

        {/* White question card floating on orange */}
        <div style={{
          background: C.white, borderRadius: 22, padding: '28px 28px 24px',
          marginBottom: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
          borderLeft: `4px solid ${currentSec?.color}`,
          opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.45s cubic-bezier(.22,1,.36,1)',
        }}>
          {/* Passage */}
          {currentQ.passage && (
            <div style={{
              marginBottom: 20, padding: '14px 16px', borderRadius: 10,
              background: C.orangeFaint, borderLeft: `3px solid ${currentSec?.color}`,
              fontSize: 13.5, lineHeight: 1.8, color: C.textBody, fontStyle: 'italic',
            }}>
              {currentQ.passage}
            </div>
          )}
          {/* Question */}
          <h2 style={{ fontSize: 16.5, fontWeight: 700, color: C.text, lineHeight: 1.55, margin: '0 0 20px' }}>
            {currentQ.question}
          </h2>
          {/* MCQ */}
          {currentQ.type !== 'writing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQ.options.map((opt, i) => (
                <MCQOption key={i} text={opt} index={i}
                  selected={answers[currentQ.id] === i}
                  onClick={() => handleAnswer(currentQ.id, i)}
                  revealed={isRevealed} correct={currentQ.answer}
                />
              ))}
            </div>
          )}
          {/* Writing */}
          {currentQ.type === 'writing' && (
            <textarea
              rows={5} placeholder={currentQ.placeholder}
              value={answers[currentQ.id] || ''}
              onChange={e => handleAnswer(currentQ.id, e.target.value)}
              style={{
                width: '100%', borderRadius: 12, padding: '13px 16px',
                fontSize: 13.5, color: C.text, resize: 'none',
                background: C.orangeFaint,
                border: `1.5px solid ${answers[currentQ.id] ? `${currentSec?.color}70` : C.border}`,
                caretColor: currentSec?.color, outline: 'none',
                fontFamily: 'inherit', lineHeight: 1.7, boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={e => e.target.style.borderColor = `${currentSec?.color}90`}
              onBlur={e => e.target.style.borderColor = answers[currentQ.id] ? `${currentSec?.color}70` : C.border}
            />
          )}
        </div>

        {/* ── Action buttons — on orange background ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* White outline back — matches site's outline button style */}
          <button
            onClick={handlePrev} disabled={qIndex === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 18px', borderRadius: 50,
              border: `2px solid rgba(255,255,255,0.6)`,
              background: 'transparent',
              cursor: qIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: 13, fontWeight: 600, color: C.white,
              opacity: qIndex === 0 ? 0.35 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (qIndex > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <IconArrowLeft size={14} /> Back
          </button>

          <div style={{ flex: 1 }} />

          {/* Check answer */}
          {currentQ.type !== 'writing' && !isRevealed && (
            <button
              onClick={handleReveal} disabled={!isAnswered}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 50,
                border: `2px solid ${isAnswered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'}`,
                background: isAnswered ? 'rgba(255,255,255,0.18)' : 'transparent',
                cursor: isAnswered ? 'pointer' : 'not-allowed',
                fontSize: 13, fontWeight: 600, color: C.white,
                opacity: isAnswered ? 1 : 0.4,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { if (isAnswered) e.currentTarget.style.background = 'rgba(255,255,255,0.28)' }}
              onMouseLeave={e => { e.currentTarget.style.background = isAnswered ? 'rgba(255,255,255,0.18)' : 'transparent' }}
            >
              <IconCheck size={14} color={C.white} /> Check
            </button>
          )}

          {/* Maroon primary Next/Finish */}
          <button
            onClick={handleNext} disabled={!canNext}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '11px 24px', borderRadius: 50, border: 'none',
              cursor: canNext ? 'pointer' : 'not-allowed',
              fontSize: 13, fontWeight: 800, color: C.white,
              background: canNext ? C.maroon : 'rgba(255,255,255,0.25)',
              boxShadow: canNext ? `0 4px 18px ${C.maroon}50` : 'none',
              opacity: canNext ? 1 : 0.5,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { if (canNext) { e.currentTarget.style.background = C.maroonHover; e.currentTarget.style.transform = 'translateY(-1px)' } }}
            onMouseLeave={e => { e.currentTarget.style.background = canNext ? C.maroon : 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {qIndex === allQuestions.length - 1 ? 'Finish' : 'Next'} <IconArrowRight size={14} />
          </button>
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 28, flexWrap: 'wrap' }}>
          {allQuestions.map((q, i) => {
            const sec = SECTIONS.find(s => s.id === q.section)
            const isActive = i === qIndex
            const isDone   = answers[q.id] !== undefined
            return (
              <button key={q.id} onClick={() => setQIndex(i)} style={{
                width: isActive ? 22 : 8, height: 8, borderRadius: 4,
                border: 'none', cursor: 'pointer', padding: 0,
                background: isActive ? C.white : isDone ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
                boxShadow: isActive ? '0 0 8px rgba(255,255,255,0.7)' : 'none',
                transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
              }} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestPage