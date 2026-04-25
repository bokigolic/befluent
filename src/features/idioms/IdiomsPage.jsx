import { useState, useMemo, memo, useCallback, useEffect } from 'react'
import { IDIOMS, IDIOM_CATEGORIES, CATEGORY_COLOR, getIdiomOfDay } from './idiomsData'
import useStore from '../../store/useStore'
import styles from './IdiomsPage.module.css'

// ── Idiom of the Day ──────────────────────────────────────────────────────────
function IdiomOfTheDay({ idiom, onAddReview }) {
  const color = CATEGORY_COLOR[idiom.category] ?? '#3b82f6'
  return (
    <div className={styles.iotdCard} style={{ '--iotd-color': color }}>
      <div className={styles.iotdLabel}>💬 Idiom of the Day</div>
      <div className={styles.iotdQuote}>"</div>
      <div className={styles.iotdIdiom}>{idiom.idiom}</div>
      <div className={styles.iotdMeaning}>{idiom.meaning}</div>
      <div className={styles.iotdExample}>{idiom.example}</div>
      <div className={styles.iotdOrigin}>📜 {idiom.origin}</div>
      <div className={styles.iotdSerbian}>🇷🇸 {idiom.serbian}</div>
      <button className={styles.iotdReviewBtn} onClick={() => onAddReview(idiom)}>
        + Add to Review
      </button>
    </div>
  )
}

// ── Idiom card ────────────────────────────────────────────────────────────────
function IdiomCard({ idiom, saved, onToggleSave, onAddReview }) {
  const [open, setOpen] = useState(false)
  const color = CATEGORY_COLOR[idiom.category] ?? '#3b82f6'

  const boldExample = idiom.example.replace(
    new RegExp(`(${idiom.idiom})`, 'i'),
    '**$1**'
  ).split('**').map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--t1)' }}>{part}</strong>
      : <span key={i}>{part}</span>
  )

  return (
    <div
      className={`${styles.card} ${open ? styles.cardOpen : ''}`}
      style={{ '--cat-color': color }}
    >
      <button className={styles.cardHeader} onClick={() => setOpen(v => !v)}>
        <div className={styles.cardLeft}>
          <div className={styles.cardIdiom}>{idiom.idiom}</div>
          <div className={styles.cardMeaning}>{idiom.meaning}</div>
        </div>
        <div className={styles.cardRight}>
          <span className={styles.levelBadge}>{idiom.level}</span>
          <span className={styles.catBadge} style={{ color }}>
            {IDIOM_CATEGORIES.find(c => c.id === idiom.category)?.label ?? idiom.category}
          </span>
          <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <div className={styles.exampleRow}>{boldExample}</div>
          <div className={styles.originRow}>
            <span className={styles.originLabel}>📜 Origin:</span> {idiom.origin}
          </div>
          <div className={styles.serbianRow}>
            <span className={styles.serbianLabel}>🇷🇸 Srpski:</span> {idiom.serbian}
          </div>
          <div className={styles.tags}>
            {idiom.tags.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <div className={styles.cardActions}>
            <button className={styles.cardActionBtn} onClick={() => onAddReview(idiom)}>
              + Review
            </button>
            <button
              className={`${styles.cardActionBtn} ${saved ? styles.savedBtn : ''}`}
              onClick={() => onToggleSave(idiom.id)}
            >
              {saved ? '🔖 Saved' : '🔖 Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Quiz ──────────────────────────────────────────────────────────────────────
function buildQuizQuestions(pool) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10)
  return shuffled.map((idiom, qi) => {
    const type = qi % 3
    const others = IDIOMS.filter(i => i.id !== idiom.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    if (type === 0) {
      // What does X mean?
      const opts = [idiom.meaning, ...others.map(o => o.meaning)].sort(() => Math.random() - 0.5)
      return { idiom, type: 0, question: `What does "${idiom.idiom}" mean?`, options: opts, correct: opts.indexOf(idiom.meaning) }
    } else if (type === 1) {
      // Which idiom means X?
      const opts = [idiom.idiom, ...others.map(o => o.idiom)].sort(() => Math.random() - 0.5)
      return { idiom, type: 1, question: `Which idiom means "${idiom.meaning}"?`, options: opts, correct: opts.indexOf(idiom.idiom) }
    } else {
      // Complete the idiom
      const words = idiom.idiom.split(' ')
      const blankIdx = words.length > 2 ? words.length - 1 : 0
      const blanked = [...words]
      const answer = blanked[blankIdx]
      blanked[blankIdx] = '___'
      const wrongWords = others.map(o => o.idiom.split(' ')[blankIdx] ?? o.idiom.split(' ')[o.idiom.split(' ').length - 1])
      const opts = [answer, ...wrongWords].sort(() => Math.random() - 0.5)
      return { idiom, type: 2, question: `Complete the idiom: "${blanked.join(' ')}"`, options: opts, correct: opts.indexOf(answer) }
    }
  })
}

function IdiomQuiz({ onClose, onComplete }) {
  const addXP = useStore(s => s.addXP)
  const addIdiomQuizResult = useStore(s => s.addIdiomQuizResult)
  const [questions] = useState(() => buildQuizQuestions(IDIOMS))
  const [current, setCurrent]   = useState(0)
  const [answers, setAnswers]   = useState({})
  const [done, setDone]         = useState(false)

  const q = questions[current]
  const score = done ? questions.filter((_, i) => answers[i] === questions[i].correct).length : 0

  const handleAnswer = (oi) => {
    if (answers[current] !== undefined) return
    setAnswers(a => ({ ...a, [current]: oi }))
    setTimeout(() => {
      if (current < questions.length - 1) setCurrent(c => c + 1)
      else {
        const finalScore = Object.keys({ ...answers, [current]: oi }).filter(
          i => ({ ...answers, [current]: oi })[i] === questions[i].correct
        ).length
        setDone(true)
        const xp = finalScore * 5
        addXP(xp)
        addIdiomQuizResult({ date: new Date().toDateString(), score: finalScore, total: questions.length })
        onComplete(finalScore, questions.length)
      }
    }, 600)
  }

  return (
    <div className={styles.quizOverlay}>
      <div className={styles.quizBox}>
        <div className={styles.quizHeader}>
          <span className={styles.quizTitle}>Idiom Quiz</span>
          <button className={styles.quizClose} onClick={onClose}>✕</button>
        </div>

        {!done ? (
          <>
            <div className={styles.quizProgress}>
              <div className={styles.quizProgressBar}>
                <div className={styles.quizProgressFill} style={{ width: `${(current / questions.length) * 100}%` }} />
              </div>
              <span className={styles.quizCounter}>{current + 1}/{questions.length}</span>
            </div>
            <div className={styles.quizQuestion}>{q.question}</div>
            <div className={styles.quizOptions}>
              {q.options.map((opt, oi) => {
                let cls = styles.quizOption
                if (answers[current] !== undefined) {
                  if (oi === q.correct) cls += ' ' + styles.qCorrect
                  else if (answers[current] === oi) cls += ' ' + styles.qWrong
                } else if (answers[current] === oi) {
                  cls += ' ' + styles.qSelected
                }
                return (
                  <button key={oi} className={cls} onClick={() => handleAnswer(oi)}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className={styles.quizResult}>
            <div className={styles.quizResultScore}>
              {score === 10 ? '🏆' : score >= 7 ? '⭐' : '📚'} {score}/10
            </div>
            <div className={styles.quizResultPct}>{score * 10}% correct</div>
            <div className={styles.quizResultXP}>+{score * 5} XP earned</div>
            <button className={styles.quizDoneBtn} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
function IdiomsPage({ autoStartQuiz = false }) {
  const savedIdioms        = useStore(s => s.savedIdioms)
  const toggleSavedIdiom   = useStore(s => s.toggleSavedIdiom)
  const addToReview        = useStore(s => s.addToReview)

  const [category, setCategory]   = useState('all')
  const [level, setLevel]         = useState('all')
  const [search, setSearch]       = useState('')
  const [showSaved, setShowSaved] = useState(false)
  const [quizOpen, setQuizOpen]   = useState(false)
  const [quizResult, setQuizResult] = useState(null)

  useEffect(() => { if (autoStartQuiz) setQuizOpen(true) }, [autoStartQuiz])

  const iotd = useMemo(() => getIdiomOfDay(), [])

  const filtered = useMemo(() => IDIOMS.filter(i => {
    if (showSaved && !savedIdioms.includes(i.id)) return false
    if (category !== 'all' && i.category !== category) return false
    if (level !== 'all' && i.level !== level) return false
    if (search) {
      const q = search.toLowerCase()
      return i.idiom.toLowerCase().includes(q) || i.meaning.toLowerCase().includes(q) || i.serbian.toLowerCase().includes(q)
    }
    return true
  }), [category, level, search, showSaved, savedIdioms])

  const categoryCounts = useMemo(() => {
    const counts = {}
    IDIOMS.forEach(i => { counts[i.category] = (counts[i.category] ?? 0) + 1 })
    return counts
  }, [])

  const handleAddReview = useCallback((idiom) => {
    addToReview(idiom.idiom, `${idiom.meaning} / ${idiom.serbian}`, 'vocabulary')
  }, [addToReview])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Idioms &amp; Slang</h2>
          <p className={styles.pageSubtitle}>{IDIOMS.length} idioms · {IDIOM_CATEGORIES.filter(c => c.id !== 'all').length} categories · A2–C1</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.savedToggle} ${showSaved ? styles.savedToggleActive : ''}`}
            onClick={() => setShowSaved(v => !v)}
          >
            🔖 Saved ({savedIdioms.length})
          </button>
          <button className={styles.quizBtn} onClick={() => { setQuizResult(null); setQuizOpen(true) }}>
            🧪 Quiz
          </button>
        </div>
      </div>

      <IdiomOfTheDay idiom={iotd} onAddReview={handleAddReview} />

      <input
        className={styles.searchBar}
        type="search"
        placeholder="Search idioms and meanings..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className={styles.filterScroll}>
        {IDIOM_CATEGORIES.map(cat => {
          const count = cat.id === 'all' ? IDIOMS.length : (categoryCounts[cat.id] ?? 0)
          return (
            <button
              key={cat.id}
              className={`${styles.catPill} ${category === cat.id ? styles.catPillActive : ''}`}
              style={category === cat.id ? { borderColor: cat.color, color: cat.color, background: `${cat.color}18` } : {}}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label} <span className={styles.catCount}>{count}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.levelRow}>
        {['all', 'A2', 'B1', 'B2'].map(l => (
          <button
            key={l}
            className={`${styles.levelPill} ${level === l ? styles.levelPillActive : ''}`}
            onClick={() => setLevel(l)}
          >
            {l === 'all' ? 'All levels' : l}
          </button>
        ))}
      </div>

      {quizResult && (
        <div className={styles.quizBanner}>
          Last quiz: {quizResult.score}/{quizResult.total} — +{quizResult.score * 5} XP
          <button className={styles.quizBannerClose} onClick={() => setQuizResult(null)}>✕</button>
        </div>
      )}

      <div className={styles.resultsCount}>{filtered.length} idioms</div>

      <div className={styles.list}>
        {filtered.map(idiom => (
          <IdiomCard
            key={idiom.id}
            idiom={idiom}
            saved={savedIdioms.includes(idiom.id)}
            onToggleSave={toggleSavedIdiom}
            onAddReview={handleAddReview}
          />
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>No idioms match your search.</div>
        )}
      </div>

      {quizOpen && (
        <IdiomQuiz
          onClose={() => setQuizOpen(false)}
          onComplete={(score, total) => { setQuizResult({ score, total }); setQuizOpen(false) }}
        />
      )}
    </div>
  )
}

export default memo(IdiomsPage)
