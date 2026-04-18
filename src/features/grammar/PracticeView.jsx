import { useState, useRef, useCallback, useEffect, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './PracticeView.module.css'

function normalise(str) {
  return str.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, ' ')
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

// ── Streak display ────────────────────────────────────────────────────────────
function StreakBadge({ streak }) {
  if (streak === 0) return null
  return (
    <span className={`${styles.streakBadge} ${streak >= 5 ? styles.streakHot : ''}`}>
      🔥 {streak} in a row
    </span>
  )
}

// ── Multiple Choice ───────────────────────────────────────────────────────────
function MultipleChoiceQ({ exercise, onAnswer, answered }) {
  const [selected, setSelected] = useState(null)

  const pick = (i) => {
    if (answered) return
    setSelected(i)
    onAnswer(i === exercise.correct)
  }

  return (
    <div className={styles.questionBody}>
      <div className={styles.sentence}>
        {exercise.sentence.split('___').map((part, i, arr) => (
          i < arr.length - 1
            ? <span key={i}>{part}<span className={styles.blank}>_____</span></span>
            : <span key={i}>{part}</span>
        ))}
      </div>
      <div className={styles.options}>
        {exercise.options.map((opt, i) => {
          let cls = styles.option
          if (selected !== null) {
            if (i === exercise.correct) cls += ` ${styles.optionCorrect}`
            else if (i === selected && selected !== exercise.correct) cls += ` ${styles.optionWrong}`
            else cls += ` ${styles.optionDimmed}`
          }
          return (
            <button key={i} className={cls} onClick={() => pick(i)} disabled={answered}>
              <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={styles.optionText}>{opt}</span>
              {selected !== null && i === exercise.correct && <span className={styles.resultIcon}>✓</span>}
              {selected === i && i !== exercise.correct && <span className={styles.resultIcon}>✗</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Fill in blank ─────────────────────────────────────────────────────────────
function FillBlankQ({ exercise, onAnswer, answered }) {
  const [value,    setValue]    = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result,   setResult]   = useState(null)

  const check = () => {
    if (!value.trim()) return
    const correct = normalise(value) === normalise(exercise.answer)
    setResult(correct ? 'correct' : 'wrong')
    onAnswer(correct)
  }

  return (
    <div className={styles.questionBody}>
      <div className={styles.sentence}>{exercise.sentence.replace('___', '________')}</div>
      <div className={styles.inputWrap}>
        <input
          className={`${styles.fillInput} ${result === 'correct' ? styles.fillCorrect : ''} ${result === 'wrong' ? styles.fillWrong : ''}`}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !answered && check()}
          placeholder="Type your answer..."
          disabled={answered}
          autoCapitalize="none"
        />
        {!answered && (
          <button className={styles.hintBtn} onClick={() => setShowHint(v => !v)}>💡 Hint</button>
        )}
      </div>
      {showHint && !answered && <div className={styles.hint}>{exercise.hint}</div>}
      {result === 'wrong'   && <div className={styles.correctAnswer}>Correct: <strong>{exercise.answer}</strong></div>}
      {result === 'correct' && <div className={styles.correctMsg}>✓ Correct!</div>}
      {!answered && (
        <button className={styles.checkBtn} onClick={check} disabled={!value.trim()}>Check Answer</button>
      )}
    </div>
  )
}

// ── Rewrite ───────────────────────────────────────────────────────────────────
function RewriteQ({ exercise, onAnswer, answered }) {
  const [value,    setValue]    = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result,   setResult]   = useState(null)

  const check = () => {
    if (!value.trim()) return
    const correct = normalise(value) === normalise(exercise.answer)
    setResult(correct ? 'correct' : 'wrong')
    onAnswer(correct)
  }

  return (
    <div className={styles.questionBody}>
      <div className={styles.originalBox}>{exercise.original}</div>
      <textarea
        className={`${styles.rewriteInput} ${result === 'correct' ? styles.fillCorrect : ''} ${result === 'wrong' ? styles.fillWrong : ''}`}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Rewrite the sentence..."
        disabled={answered}
        rows={3}
      />
      <div className={styles.inputActions}>
        {!answered && (
          <button className={styles.hintBtn} onClick={() => setShowHint(v => !v)}>💡 Hint</button>
        )}
      </div>
      {showHint && !answered && <div className={styles.hint}>{exercise.hint}</div>}
      {result === 'wrong'   && <div className={styles.correctAnswer}>Correct: <strong>{exercise.answer}</strong></div>}
      {result === 'correct' && <div className={styles.correctMsg}>✓ Correct!</div>}
      {!answered && (
        <button className={styles.checkBtn} onClick={check} disabled={!value.trim()}>Check Answer</button>
      )}
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({ score, total, cat, history, avgTime, onRetry, onBack, onNextLesson }) {
  const pct    = Math.round((score / total) * 100)
  const addXP  = useStore(s => s.addXP)
  const addToReview = useStore(s => s.addToReview)
  const xpRef  = useRef(false)
  const [showReview, setShowReview] = useState(false)

  if (!xpRef.current) {
    xpRef.current = true
    addXP(score * 5)
  }

  let grade, gradeClass
  if (pct >= 80) { grade = 'Excellent! 🏆'; gradeClass = styles.gradeGreen }
  else if (pct >= 60) { grade = 'Good job! ⭐'; gradeClass = styles.gradeBlue }
  else if (pct >= 40) { grade = 'Keep practicing! 💪'; gradeClass = styles.gradeAmber }
  else { grade = 'Review the lesson 📚'; gradeClass = styles.gradePink }

  const missed = history.filter(h => !h.correct)

  return (
    <div className={styles.results}>
      <div className={styles.resultsEmoji}>{cat.emoji}</div>
      <div className={`${styles.resultsPct} ${gradeClass}`}>{pct}%</div>
      <div className={`${styles.resultsGrade} ${gradeClass}`}>{grade}</div>
      <div className={styles.resultsScore}>{score} / {total} correct</div>
      <div className={styles.resultsXP}>+{score * 5} XP earned</div>
      {avgTime > 0 && (
        <div className={styles.resultsTime}>⚡ Avg: {avgTime}s per question</div>
      )}

      {/* Question review toggle */}
      {history.length > 0 && (
        <button className={styles.reviewToggle} onClick={() => setShowReview(v => !v)}>
          {showReview ? 'Hide review ▲' : `Review answers (${total}) ▼`}
        </button>
      )}

      {showReview && (
        <div className={styles.reviewList}>
          {history.map((h, i) => (
            <div key={i} className={`${styles.reviewRow} ${h.correct ? styles.reviewCorrect : styles.reviewWrong}`}>
              <span className={styles.reviewIcon}>{h.correct ? '✓' : '✗'}</span>
              <div className={styles.reviewBody}>
                <div className={styles.reviewQ}>
                  {h.exercise.sentence || h.exercise.original || h.exercise.question || `Q${i + 1}`}
                </div>
                {!h.correct && (
                  <div className={styles.reviewAnswer}>
                    Correct: <strong>{h.exercise.answer ?? h.exercise.options?.[h.exercise.correct]}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {missed.length > 0 && (
        <button className={styles.studyMissedBtn} onClick={() => {
          missed.forEach(h => {
            const word = (h.exercise.sentence || h.exercise.original || '').split(' ')[0] || 'practice'
            addToReview(word, h.exercise.answer || '', 'grammar')
          })
        }}>
          📚 Study {missed.length} missed question{missed.length > 1 ? 's' : ''}
        </button>
      )}

      <div className={styles.resultsBtns}>
        <button className={styles.retryBtn} onClick={onRetry}>Practice Again</button>
        <button className={styles.backBtn} onClick={onBack}>Back to Lesson</button>
        {onNextLesson && (
          <button className={styles.nextBtn} style={{ background: cat.color }} onClick={onNextLesson}>
            Next Lesson →
          </button>
        )}
      </div>
    </div>
  )
}

// ── Main PracticeView ─────────────────────────────────────────────────────────
function PracticeView({ lesson, cat, exercises, onBack, onNextLesson }) {
  const savePracticeResult = useStore(s => s.savePracticeResult)
  const addXP              = useStore(s => s.addXP)

  const [qIndex,   setQIndex]   = useState(0)
  const [answered, setAnswered] = useState(false)
  const [correct,  setCorrect]  = useState(false)
  const [score,    setScore]    = useState(0)
  const [streak,   setStreak]   = useState(0)
  const [done,     setDone]     = useState(false)
  const [microToast, setMicroToast] = useState(null)
  const [history,  setHistory]  = useState([])

  const scoreRef     = useRef(0)
  const startTimeRef = useRef(Date.now())
  const timesRef     = useRef([])
  const total        = exercises.length

  useEffect(() => { startTimeRef.current = Date.now() }, [qIndex])

  const handleAnswer = useCallback((isCorrect) => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
    timesRef.current.push(elapsed)
    setAnswered(true)
    setCorrect(isCorrect)

    if (isCorrect) {
      scoreRef.current += 1
      setScore(s => s + 1)
      setStreak(s => {
        const next = s + 1
        if (next === 3) setMicroToast('On fire! 🔥')
        else if (next === 5) setMicroToast('Unstoppable! ⚡')
        if (next === 3 || next === 5) setTimeout(() => setMicroToast(null), 1800)
        return next
      })
    } else {
      setStreak(0)
    }

    setHistory(prev => [...prev, { exercise: exercises[qIndex], correct: isCorrect }])
  }, [exercises, qIndex])

  const handleNext = () => {
    if (qIndex + 1 >= total) {
      savePracticeResult(lesson.id, scoreRef.current, total)
      setDone(true)
    } else {
      setQIndex(i => i + 1)
      setAnswered(false)
      setCorrect(false)
    }
  }

  const handleRetry = () => {
    setQIndex(0)
    setAnswered(false)
    setCorrect(false)
    setScore(0)
    setStreak(0)
    setDone(false)
    setHistory([])
    scoreRef.current = 0
    timesRef.current = []
  }

  const avgTime = timesRef.current.length > 0
    ? Math.round(timesRef.current.reduce((a, b) => a + b, 0) / timesRef.current.length)
    : 0

  if (done) {
    return (
      <div className={styles.overlay}>
        <div className={styles.header}>
          <button className={styles.back} onClick={onBack}>← Lesson</button>
          <span className={styles.headerTitle}>Results</span>
        </div>
        <ResultsScreen
          score={scoreRef.current}
          total={total}
          cat={cat}
          history={history}
          avgTime={avgTime}
          onRetry={handleRetry}
          onBack={onBack}
          onNextLesson={onNextLesson}
        />
      </div>
    )
  }

  const exercise = exercises[qIndex]

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.back} onClick={onBack}>← Lesson</button>
        <span className={styles.headerTitle}>Practice</span>
        <div className={styles.headerRight}>
          <StreakBadge streak={streak} />
          <span className={styles.counter} style={{ color: cat.color }}>{qIndex + 1} / {total}</span>
        </div>
      </div>

      <ProgressBar current={qIndex + (answered ? 1 : 0)} total={total} />

      {microToast && (
        <div className={styles.microToast}>{microToast}</div>
      )}

      <div className={styles.content}>
        <div className={styles.questionCard} key={qIndex}>
          <div className={styles.questionLabel}>
            {exercise.question || (
              exercise.type === 'multiple-choice' ? 'Choose the correct option:' :
              exercise.type === 'fill-blank'      ? 'Fill in the blank:' :
              'Rewrite the sentence:'
            )}
          </div>

          {exercise.type === 'multiple-choice' && (
            <MultipleChoiceQ exercise={exercise} onAnswer={handleAnswer} answered={answered} />
          )}
          {exercise.type === 'fill-blank' && (
            <FillBlankQ exercise={exercise} onAnswer={handleAnswer} answered={answered} />
          )}
          {exercise.type === 'rewrite' && (
            <RewriteQ exercise={exercise} onAnswer={handleAnswer} answered={answered} />
          )}

          {answered && (
            <div className={`${styles.explanation} ${correct ? styles.explanationCorrect : styles.explanationWrong}`}>
              <span className={styles.explanationIcon}>{correct ? '✓' : 'ℹ'}</span>
              {exercise.explanation}
            </div>
          )}
        </div>

        {answered && (
          <button className={styles.nextBtn2} onClick={handleNext} style={{ background: cat.color }}>
            {qIndex + 1 >= total ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(PracticeView)
