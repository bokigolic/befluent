import { useState, useRef } from 'react'
import useStore from '../../store/useStore'
import styles from './Onboarding.module.css'

const INFO_SLIDES = [
  {
    emoji: '🔍',
    emojiSize: 64,
    title: '400,000+ English Words',
    sub: 'Search any word and get definitions, examples, pronunciation and more.',
  },
  {
    emoji: '🇺🇸 ↔ 🇷🇸',
    emojiSize: 48,
    title: 'English ↔ Serbian',
    sub: 'Translate instantly between English and Serbian. Perfect for learning.',
  },
  {
    emoji: '⚡',
    emojiSize: 64,
    title: 'Learn & Level Up',
    sub: 'Earn XP for every search. Build your streak. Track your progress.',
  },
]

const LEVEL_OPTIONS = [
  { id: 'beginner',     emoji: '🌱', label: 'Beginner',     sub: 'A1–A2 · I know basic words',          startNode: 1  },
  { id: 'elementary',   emoji: '📚', label: 'Elementary',   sub: 'B1 · I can have simple conversations', startNode: 5  },
  { id: 'intermediate', emoji: '⭐', label: 'Intermediate', sub: 'B2 · I can discuss most topics',       startNode: 9  },
  { id: 'advanced',     emoji: '🎯', label: 'Advanced',     sub: 'C1+ · I\'m nearly fluent',             startNode: 13 },
]

const GOAL_OPTIONS = [
  { mins: 5,  emoji: '⚡', label: '5 minutes',  sub: 'Quick learner',    words: 3  },
  { mins: 10, emoji: '📖', label: '10 minutes', sub: 'Steady progress',  words: 5  },
  { mins: 20, emoji: '🎯', label: '20 minutes', sub: 'Serious learner',  words: 10 },
  { mins: 30, emoji: '🏆', label: '30+ minutes',sub: 'Full immersion',   words: 15 },
]

const TOTAL_SLIDES = INFO_SLIDES.length + 2 // +2 for level + goal slides

export default function Onboarding({ onDone }) {
  const [index,         setIndex]       = useState(0)
  const [animDir,       setAnimDir]     = useState(null)
  const [selectedLevel, setLevel]       = useState(null)
  const [selectedGoal,  setGoal]        = useState(null)
  const touchStartX = useRef(null)

  const setUserLevel        = useStore(s => s.setUserLevel)
  const setDailyGoalMinutes = useStore(s => s.setDailyGoalMinutes)
  const setDailyGoal        = useStore(s => s.setDailyGoal)

  const isInfoSlide  = index < INFO_SLIDES.length
  const isLevelSlide = index === INFO_SLIDES.length
  const isGoalSlide  = index === INFO_SLIDES.length + 1

  const canAdvance = isInfoSlide || (isLevelSlide && selectedLevel) || (isGoalSlide && selectedGoal)

  const goTo = (next) => {
    if (next < 0 || next >= TOTAL_SLIDES) return
    setAnimDir(next > index ? 'left' : 'right')
    setIndex(next)
  }

  const handleNext = () => {
    if (index < TOTAL_SLIDES - 1) {
      goTo(index + 1)
    } else {
      finish()
    }
  }

  const finish = () => {
    if (selectedLevel) {
      setUserLevel(selectedLevel.id)
    }
    if (selectedGoal) {
      setDailyGoalMinutes(selectedGoal.mins)
      setDailyGoal(selectedGoal.words)
    }
    localStorage.setItem('bf_onboarded', 'true')
    onDone()
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx < -50 && canAdvance) goTo(index + 1)
    else if (dx > 50) goTo(index - 1)
  }

  return (
    <div className={styles.overlay}>
      <button className={styles.skip} onClick={finish}>Skip</button>

      <div
        className={styles.slideWrap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={index}
          className={`${styles.slide} ${animDir === 'left' ? styles.slideInLeft : animDir === 'right' ? styles.slideInRight : ''}`}
        >
          <div className={styles.glow} />

          {/* ── Info slides ── */}
          {isInfoSlide && (() => {
            const s = INFO_SLIDES[index]
            return (
              <>
                <div className={styles.emoji} style={{ fontSize: s.emojiSize }}>{s.emoji}</div>
                <h2 className={styles.title}>{s.title}</h2>
                <p className={styles.sub}>{s.sub}</p>
              </>
            )
          })()}

          {/* ── Level slide ── */}
          {isLevelSlide && (
            <>
              <h2 className={styles.title}>What's your English level?</h2>
              <p className={styles.sub}>We'll personalise your learning path.</p>
              <div className={styles.optionGrid}>
                {LEVEL_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`${styles.optCard} ${selectedLevel?.id === opt.id ? styles.optSelected : ''}`}
                    onClick={() => setLevel(opt)}
                  >
                    <span className={styles.optEmoji}>{opt.emoji}</span>
                    <span className={styles.optLabel}>{opt.label}</span>
                    <span className={styles.optSub}>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Goal slide ── */}
          {isGoalSlide && (
            <>
              <h2 className={styles.title}>How much time daily?</h2>
              <p className={styles.sub}>Set a realistic goal and stick to it.</p>
              <div className={styles.optionGrid}>
                {GOAL_OPTIONS.map(opt => (
                  <button
                    key={opt.mins}
                    className={`${styles.optCard} ${selectedGoal?.mins === opt.mins ? styles.optSelected : ''}`}
                    onClick={() => setGoal(opt)}
                  >
                    <span className={styles.optEmoji}>{opt.emoji}</span>
                    <span className={styles.optLabel}>{opt.label}</span>
                    <span className={styles.optSub}>{opt.sub}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.dots}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className={styles.nextBtn}
          onClick={handleNext}
          disabled={!canAdvance}
          style={!canAdvance ? { opacity: 0.4 } : {}}
        >
          {index === TOTAL_SLIDES - 1 ? 'Start Learning →' : 'Next'}
        </button>
      </div>
    </div>
  )
}
