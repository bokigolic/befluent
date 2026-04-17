import { useState, useMemo, useRef, memo } from 'react'
import useDictionary from '../../hooks/useDictionary'
import useStore from '../../store/useStore'
import styles from './QuizPage.module.css'

const FALLBACK_WORDS = [
  'able','ancient','beauty','careful','danger','eager','famous',
  'gentle','happy','ignore','jungle','kindly','lovely','modern',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── 3D Flip Flashcard ────────────────────────────────────
function FlashCard({ word, onKnow, onDontKnow }) {
  const [flipped, setFlipped] = useState(false)
  const { data, isLoading } = useDictionary(word)
  const def = data?.meanings?.[0]?.definitions?.[0]

  return (
    <div
      className={`${styles.card} ${flipped ? styles.cardFlipped : ''}`}
      onClick={() => !flipped && setFlipped(true)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.cardWord}>{word}</div>
          <div className={styles.cardHint}>Tap to reveal definition</div>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.cardContent}>
            {isLoading ? (
              <div className={styles.cardLoading}>Loading…</div>
            ) : def ? (
              <>
                <div className={styles.cardDef}>{def.definition}</div>
                {def.example && <div className={styles.cardEx}>"{def.example}"</div>}
              </>
            ) : (
              <div className={styles.cardDef}>Definition not available</div>
            )}
          </div>
          <div className={styles.cardActions}>
            <button
              className={styles.btnWrong}
              onClick={e => { e.stopPropagation(); onDontKnow() }}
            >
              ✗ Don't know
            </button>
            <button
              className={styles.btnRight}
              onClick={e => { e.stopPropagation(); onKnow() }}
            >
              ✓ Know it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Multiple-choice question ─────────────────────────────
function QuizQuestion({ word, options, onAnswer }) {
  const { data, isLoading } = useDictionary(word)
  const [selected, setSelected] = useState(null)
  const def = data?.meanings?.[0]?.definitions?.[0]?.definition

  const handlePick = (w) => {
    if (selected !== null) return
    setSelected(w)
    setTimeout(() => onAnswer(w === word), 900)
  }

  if (isLoading) return <div className={styles.questionLoading}>Loading question…</div>

  return (
    <div className={styles.questionWrap}>
      <div className={styles.questionLabel}>Which word matches this definition?</div>
      <div className={styles.questionDef}>"{def || 'Definition not available'}"</div>
      <div className={styles.optionGrid}>
        {options.map(opt => {
          let cls = styles.option
          if (selected !== null) {
            if (opt === word)        cls = `${styles.option} ${styles.optionCorrect}`
            else if (opt === selected) cls = `${styles.option} ${styles.optionWrong}`
          }
          return (
            <button key={opt} className={cls} onClick={() => handlePick(opt)}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main QuizPage ────────────────────────────────────────
function QuizPage({ onClose }) {
  const savedWords       = useStore(s => s.savedWords)
  const addXP            = useStore(s => s.addXP)
  const recordQuizScore  = useStore(s => s.recordQuizScore)

  const [screen, setScreen]     = useState('select')
  const [quizType, setQuizType] = useState('flashcard')
  const [queue, setQueue]       = useState([])
  const [current, setCurrent]   = useState(0)
  const [correct, setCorrect]   = useState(0)
  const correctRef = useRef(0)

  const questions = useMemo(() => {
    if (queue.length === 0) return []
    return queue.map(word => {
      const others = queue.filter(w => w !== word)
      const pool = shuffle([...others, ...FALLBACK_WORDS.filter(w => !queue.includes(w))])
      const distractors = pool.slice(0, 3)
      return { word, options: shuffle([word, ...distractors]) }
    })
  }, [queue])

  const start = (type) => {
    correctRef.current = 0
    setCorrect(0)
    setQueue(shuffle([...savedWords]))
    setCurrent(0)
    setQuizType(type)
    setScreen('playing')
  }

  const handleAnswer = (wasCorrect) => {
    if (wasCorrect) {
      correctRef.current++
      setCorrect(c => c + 1)
    }
    const next = current + 1
    if (next >= queue.length) {
      const pct = Math.round((correctRef.current / queue.length) * 100)
      recordQuizScore(pct)
      addXP(Math.max(5, Math.floor(pct / 10) * 3))
      setScreen('done')
    } else {
      setCurrent(next)
    }
  }

  const progress  = queue.length > 0 ? Math.round((current / queue.length) * 100) : 0
  const finalPct  = queue.length > 0 ? Math.round((correctRef.current / queue.length) * 100) : 0

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onClose}>← Back</button>
        {screen === 'playing' && (
          <div className={styles.progressRow}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressText}>{current + 1} / {queue.length}</span>
          </div>
        )}
      </div>

      {screen === 'select' && (
        <div className={styles.selectScreen}>
          <div className={styles.selectTitle}>Practice</div>
          <div className={styles.selectSub}>{savedWords.length} word{savedWords.length !== 1 ? 's' : ''} saved</div>
          <div className={styles.modeCards}>
            <button className={styles.modeCard} onClick={() => start('flashcard')}>
              <div className={styles.modeEmoji}>🃏</div>
              <div className={styles.modeName}>Flashcards</div>
              <div className={styles.modeDesc}>Flip cards to reveal definitions. Mark what you know.</div>
            </button>
            <button className={styles.modeCard} onClick={() => start('quiz')}>
              <div className={styles.modeEmoji}>🧩</div>
              <div className={styles.modeName}>Quiz</div>
              <div className={styles.modeDesc}>Read the definition and pick the correct word.</div>
            </button>
          </div>
        </div>
      )}

      {screen === 'playing' && quizType === 'flashcard' && queue[current] && (
        <div className={styles.cardWrap}>
          <FlashCard
            key={queue[current]}
            word={queue[current]}
            onKnow={() => handleAnswer(true)}
            onDontKnow={() => handleAnswer(false)}
          />
          <div className={styles.scoreRow}>
            <span className={styles.scoreGood}>✓ {correct}</span>
            <span className={styles.scoreBad}>✗ {current - correct}</span>
          </div>
        </div>
      )}

      {screen === 'playing' && quizType === 'quiz' && questions[current] && (
        <div className={styles.quizWrap}>
          <QuizQuestion
            key={questions[current].word}
            word={questions[current].word}
            options={questions[current].options}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {screen === 'done' && (
        <div className={styles.doneScreen}>
          <div className={styles.doneEmoji}>
            {finalPct >= 80 ? '🏆' : finalPct >= 50 ? '⭐' : '📚'}
          </div>
          <div className={styles.doneScore}>{finalPct}%</div>
          <div className={styles.doneSub}>{correctRef.current} / {queue.length} correct</div>
          <div className={styles.doneMsg}>
            {finalPct >= 80 ? 'Excellent work!' : finalPct >= 50 ? 'Good progress!' : 'Keep practicing!'}
          </div>
          <div className={styles.doneActions}>
            <button className={styles.retryBtn} onClick={() => start(quizType)}>Try again</button>
            <button className={styles.doneBtn} onClick={onClose}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(QuizPage)
