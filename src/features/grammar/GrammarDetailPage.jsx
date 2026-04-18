import { useState, useCallback, memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from './GrammarSection'
import { GRAMMAR_DATA } from './grammarData'
import styles from './GrammarDetailPage.module.css'

// ── Highlight helper ──────────────────────────────────────────────────────────
function HighlightedSentence({ sentence, highlight }) {
  if (!highlight || highlight === 'all forms') {
    return <span className={styles.exSentence}>{sentence}</span>
  }
  // Only highlight the first match for simplicity
  const parts = highlight.split(' / ')
  const first = parts[0]
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

// ── Lesson detail view ────────────────────────────────────────────────────────
function LessonDetailView({ lesson, cat, onBack }) {
  const completedLessons    = useStore(s => s.completedLessons)
  const markLessonComplete  = useStore(s => s.markLessonComplete)
  const addXP               = useStore(s => s.addXP)
  const [justDone, setJustDone] = useState(false)

  const categoryLessons = GRAMMAR_DATA[cat.id]?.lessons ?? []
  const categoryLessonIds = categoryLessons.map(l => l.id)
  const isCompleted = completedLessons.includes(lesson.id)

  const handleComplete = useCallback(() => {
    if (isCompleted) return
    markLessonComplete(lesson.id, cat.id, categoryLessonIds)
    addXP(10)
    setJustDone(true)
  }, [isCompleted, lesson.id, cat.id, categoryLessonIds, markLessonComplete, addXP])

  return (
    <div className={styles.lessonOverlay}>
      <div className={styles.lessonHeader}>
        <button className={styles.back} onClick={onBack}>← Lessons</button>
        <span className={styles.lessonHeaderTitle}>{lesson.title}</span>
        <span className={styles.lessonDuration}>{lesson.duration}</span>
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
                      <span className={styles.mistakeIcon}>✗</span>
                      {m.wrong}
                    </span>
                    <span className={styles.mistakeCorrect}>
                      <span className={styles.mistakeIconOk}>✓</span>
                      {m.correct}
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

        {/* Complete button */}
        <button
          className={`${styles.completeBtn} ${(isCompleted || justDone) ? styles.completeBtnDone : ''}`}
          onClick={handleComplete}
          disabled={isCompleted || justDone}
          style={!(isCompleted || justDone) ? { background: cat.color } : {}}
        >
          {(isCompleted || justDone) ? '✓ Completed' : 'Mark as Complete'}
        </button>
        {justDone && (
          <p className={styles.xpNote}>+10 XP earned!</p>
        )}
      </div>
    </div>
  )
}

// ── Lesson card in list ───────────────────────────────────────────────────────
function LessonCard({ lesson, index, cat, isCompleted, onClick }) {
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
        <div className={styles.lessonDuration}>{lesson.duration}</div>
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

  const [activeLessonId, setActiveLessonId] = useState(null)

  const cat = CATEGORIES.find(c => c.id === activeGrammarCategory)
  if (!cat) return null

  const lessons = GRAMMAR_DATA[cat.id]?.lessons ?? []
  const progress = grammarProgress[cat.id] ?? 0
  const activeLesson = activeLessonId ? lessons.find(l => l.id === activeLessonId) : null

  if (activeLesson) {
    return (
      <LessonDetailView
        lesson={activeLesson}
        cat={cat}
        onBack={() => setActiveLessonId(null)}
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
          {progress}% complete
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
              onClick={() => setActiveLessonId(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(GrammarDetailPage)
