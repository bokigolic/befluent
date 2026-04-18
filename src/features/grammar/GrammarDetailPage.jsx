import { useState, useCallback, useEffect, useRef, memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from './GrammarSection'
import { GRAMMAR_DATA } from './grammarData'
import { GRAMMAR_PRACTICE } from './grammarPractice'
import PracticeView from './PracticeView'
import styles from './GrammarDetailPage.module.css'

// ── Highlight helper ──────────────────────────────────────────────────────────
function HighlightedSentence({ sentence, highlight }) {
  if (!highlight || highlight === 'all forms') {
    return <span className={styles.exSentence}>{sentence}</span>
  }
  const first = highlight.split(' / ')[0]
  const idx = sentence.indexOf(first)
  if (idx === -1) return <span className={styles.exSentence}>{sentence}</span>
  return (
    <span className={styles.exSentence}>
      {sentence.slice(0, idx)}
      <strong className={styles.exHighlight}>{sentence.slice(idx, idx + first.length)}</strong>
      {sentence.slice(idx + first.length)}
    </span>
  )
}

// ── CSS confetti burst ────────────────────────────────────────────────────────
function Confetti({ active }) {
  if (!active) return null
  const colors = ['var(--acc)', 'var(--acc-g)', 'var(--acc-p)', 'var(--acc-a)', '#fff']
  return (
    <div className={styles.confettiWrap} aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={styles.confettiDot}
          style={{
            background: colors[i % colors.length],
            '--angle': `${(i / 12) * 360}deg`,
            '--dist':  `${40 + (i % 3) * 20}px`,
            animationDelay: `${i * 20}ms`,
          }}
        />
      ))}
    </div>
  )
}

// ── Lesson detail view ────────────────────────────────────────────────────────
function LessonDetailView({ lesson, cat, lessons, currentIndex, onBack, onNextLesson, onPrevLesson }) {
  const completedLessons    = useStore(s => s.completedLessons)
  const markLessonComplete  = useStore(s => s.markLessonComplete)
  const addXP               = useStore(s => s.addXP)
  const savedLessons        = useStore(s => s.savedLessons)
  const toggleSavedLesson   = useStore(s => s.toggleSavedLesson)

  const [justDone,     setJustDone]     = useState(false)
  const [showPractice, setShowPractice] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [toast,        setToast]        = useState(null)
  const toastTimer = useRef(null)
  const navTimer   = useRef(null)

  const categoryLessons   = lessons
  const categoryLessonIds = categoryLessons.map(l => l.id)
  const exercises         = GRAMMAR_PRACTICE[lesson.id] ?? []
  const isCompleted       = completedLessons.includes(lesson.id)
  const isBookmarked      = savedLessons.includes(lesson.id)

  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(navTimer.current) }, [])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2500)
  }

  const handleComplete = useCallback(() => {
    if (isCompleted) return
    markLessonComplete(lesson.id, cat.id, categoryLessonIds)
    addXP(10)
    setJustDone(true)
    setShowConfetti(true)
    showToast('🎉 +10 XP earned!')
    setTimeout(() => setShowConfetti(false), 900)
    if (onNextLesson) {
      navTimer.current = setTimeout(() => onNextLesson(), 1500)
    }
  }, [isCompleted, lesson.id, cat.id, categoryLessonIds, markLessonComplete, addXP, onNextLesson])

  const handleShare = async () => {
    const title = `BeFluent: ${lesson.title}`
    const text  = `${lesson.title}\n\n${lesson.explanation}\n\n— BeFluent Grammar`
    try {
      if (navigator.share) {
        await navigator.share({ title, text })
      } else {
        await navigator.clipboard.writeText(text)
        showToast('Copied to clipboard! ✓')
      }
    } catch {}
  }

  if (showPractice) {
    return (
      <PracticeView
        lesson={lesson}
        cat={cat}
        exercises={exercises}
        onBack={() => setShowPractice(false)}
        onNextLesson={onNextLesson}
      />
    )
  }

  return (
    <div className={styles.lessonOverlay}>
      <div className={styles.lessonHeader}>
        <button className={styles.back} onClick={onBack}>← Lessons</button>
        <span className={styles.lessonHeaderTitle}>{lesson.title}</span>
        <div className={styles.lessonHeaderRight}>
          <span className={styles.readTimePill}>⏱ {lesson.duration}</span>
          <button
            className={`${styles.iconAction} ${isBookmarked ? styles.iconActionActive : ''}`}
            onClick={() => toggleSavedLesson(lesson.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
          >
            {isBookmarked ? '🔖' : '📌'}
          </button>
          <button className={styles.iconAction} onClick={handleShare} title="Share lesson">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <circle cx="11.5" cy="2.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="11.5" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="3.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="9.75" y1="3.4" x2="5.25" y2="6.6" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="9.75" y1="11.6" x2="5.25" y2="8.4" stroke="currentColor" strokeWidth="1.3"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.lessonContent}>

        {/* Explanation */}
        <div className={styles.explanationBox} style={{ borderLeftColor: cat.color }}>
          <div className={styles.sectionLabel} style={{ color: cat.color }}>Explanation</div>
          <p className={styles.explanationText}>{lesson.explanation}</p>
        </div>

        {/* Rules */}
        <div className={styles.block}>
          <div className={styles.sectionLabel} style={{ color: cat.color }}>Rules</div>
          <ul className={styles.rulesList}>
            {lesson.rules.map((rule, i) => (
              <li key={i} className={styles.ruleItem}>
                <span className={styles.ruleBullet} style={{ color: cat.color }}>→</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Examples */}
        <div className={styles.block}>
          <div className={styles.sectionLabel} style={{ color: cat.color }}>Examples</div>
          <div className={styles.examplesList}>
            {lesson.examples.map((ex, i) => (
              <div key={i} className={styles.exampleCard}>
                <HighlightedSentence sentence={ex.sentence} highlight={ex.highlight} />
                <span className={styles.exNote}>{ex.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        {lesson.commonMistakes?.length > 0 && (
          <div className={styles.block}>
            <div className={styles.sectionLabel} style={{ color: cat.color }}>Common Mistakes</div>
            <div className={styles.mistakesList}>
              {lesson.commonMistakes.map((m, i) => (
                <div key={i} className={styles.mistakeCard}>
                  <div className={styles.mistakeRow}>
                    <span className={styles.mistakeWrong}>
                      <span className={styles.mistakeIcon}>✗</span>{m.wrong}
                    </span>
                    <span className={styles.mistakeCorrect}>
                      <span className={styles.mistakeIconOk}>✓</span>{m.correct}
                    </span>
                  </div>
                  <p className={styles.mistakeExplain}>{m.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        {lesson.tips && (
          <div className={styles.tipBox}>
            <span className={styles.tipLabel}>💡 Pro tip:</span>
            <span className={styles.tipText}>{lesson.tips}</span>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className={styles.lessonNav}>
          <button
            className={styles.lessonNavBtn}
            onClick={onPrevLesson}
            disabled={!onPrevLesson}
          >
            ← Previous
          </button>
          <span className={styles.lessonNavCount}>{currentIndex + 1} / {lessons.length}</span>
          <button
            className={styles.lessonNavBtn}
            onClick={onNextLesson}
            disabled={!onNextLesson}
          >
            Next →
          </button>
        </div>

        {/* Bottom actions */}
        {(isCompleted || justDone) ? (
          <div className={styles.bottomActions}>
            <div className={styles.completedBadge}>✓ Completed</div>
            {exercises.length > 0 && (
              <button
                className={styles.practiceBtn}
                style={{ background: cat.color }}
                onClick={() => setShowPractice(true)}
              >
                Practice Again ⚡
              </button>
            )}
          </div>
        ) : (
          <div className={styles.bottomActions}>
            {exercises.length > 0 && (
              <button
                className={styles.practiceBtn}
                style={{ background: cat.color }}
                onClick={() => setShowPractice(true)}
              >
                Practice Now ⚡
              </button>
            )}
            <div style={{ position: 'relative' }}>
              <button className={styles.completeBtn} onClick={handleComplete}>
                Mark as Complete ✓
              </button>
              <Confetti active={showConfetti} />
            </div>
          </div>
        )}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  )
}

// ── Lesson card in list ───────────────────────────────────────────────────────
function LessonCard({ lesson, index, cat, isCompleted, isBookmarked, onClick }) {
  return (
    <button className={styles.lessonCard} onClick={onClick}>
      <div
        className={`${styles.lessonCircle} ${isCompleted ? styles.lessonCircleDone : ''}`}
        style={isCompleted ? { background: cat.color } : {}}
      >
        {isCompleted ? '✓' : index + 1}
      </div>
      <div className={styles.lessonInfo}>
        <div className={styles.lessonTitle}>{lesson.title}</div>
        <div className={styles.lessonMeta}>
          <span className={styles.lessonDuration}>{lesson.duration}</span>
          {isBookmarked && <span className={styles.bookmarkDot}>🔖</span>}
        </div>
      </div>
      <span className={styles.lessonChevron}>›</span>
    </button>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
function GrammarDetailPage() {
  const activeGrammarCategory    = useStore(s => s.activeGrammarCategory)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)
  const grammarProgress          = useStore(s => s.grammarProgress)
  const completedLessons         = useStore(s => s.completedLessons)
  const savedLessons             = useStore(s => s.savedLessons)
  const updateLastStudied        = useStore(s => s.updateLastStudied)

  const [activeLessonId, setActiveLessonId] = useState(null)

  const cat = CATEGORIES.find(c => c.id === activeGrammarCategory)
  if (!cat) return null

  const lessons  = GRAMMAR_DATA[cat.id]?.lessons ?? []
  const progress = grammarProgress[cat.id] ?? 0

  const handleOpenLesson = (id) => {
    setActiveLessonId(id)
    updateLastStudied(cat.id)
  }

  if (activeLessonId) {
    const idx         = lessons.findIndex(l => l.id === activeLessonId)
    const activeLesson = lessons[idx]
    const prevLesson  = idx > 0 ? lessons[idx - 1] : null
    const nextLesson  = idx < lessons.length - 1 ? lessons[idx + 1] : null

    return (
      <LessonDetailView
        lesson={activeLesson}
        cat={cat}
        lessons={lessons}
        currentIndex={idx}
        onBack={() => setActiveLessonId(null)}
        onPrevLesson={prevLesson ? () => setActiveLessonId(prevLesson.id) : null}
        onNextLesson={nextLesson ? () => setActiveLessonId(nextLesson.id) : null}
      />
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => setActiveGrammarCategory(null)}>
          ← Back
        </button>
        <div className={styles.headerMeta}>
          <span className={styles.headerEmoji}>{cat.emoji}</span>
          <span className={styles.headerTitle}>{cat.title}</span>
        </div>
        <span
          className={styles.progressPill}
          style={{ background: `${cat.color}22`, color: cat.color }}
        >
          {progress}% done
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.lessonList}>
          {lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={i}
              cat={cat}
              isCompleted={completedLessons.includes(lesson.id)}
              isBookmarked={savedLessons.includes(lesson.id)}
              onClick={() => handleOpenLesson(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(GrammarDetailPage)
