import { useState, useRef, useCallback, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './PracticeView.module.css'

// ── Normalise answer for comparison ──────────────────────────────────────────
function normalise(str) {
  return str.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, ' ')
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
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
  const [value, setValue]       = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result, setResult]     = useState(null) // 'correct' | 'wrong'

  const check = () => {
    if (!value.trim()) return
    const correct = normalise(value) === normalise(exercise.answer)
    setResult(correct ? 'correct' : 'wrong')
    onAnswer(correct)
  }

  const displaySentence = exercise.sentence.replace('___', '________')

  return (
    <div className={styles.questionBody}>
      <div className={styles.sentence}>{displaySentence}</div>
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
          <button className={styles.hintBtn} onClick={() => setShowHint(v => !v)}>
            💡 Hint
          </button>
        )}
      </div>
      {showHint && !answered && (
        <div className={styles.hint}>{exercise.hint}</div>
      )}
      {result === 'wrong' && (
        <div className={styles.correctAnswer}>
          Correct answer: <strong>{exercise.answer}</strong>
        </div>
      )}
      {result === 'correct' && (
        <div className={styles.correctMsg}>✓ Correct!</div>
      )}
      {!answered && (
        <button className={styles.checkBtn} onClick={check} disabled={!value.trim()}>
          Check Answer
        </button>
      )}
    </div>
  )
}

// ── Rewrite ───────────────────────────────────────────────────────────────────
function RewriteQ({ exercise, onAnswer, answered }) {
  const [value, setValue]   = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result, setResult] = useState(null)

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
          <button className={styles.hintBtn} onClick={() => setShowHint(v => !v)}>
            💡 Hint
          </button>
        )}
      </div>
      {showHint && !answered && (
        <div className={styles.hint}>{exercise.hint}</div>
      )}
      {result === 'wrong' && (
        <div className={styles.correctAnswer}>
          Correct answer: <strong>{exercise.answer}</strong>
        </div>
      )}
      {result === 'correct' && (
        <div className={styles.correctMsg}>✓ Correct!</div>
      )}
      {!answered && (
        <button className={styles.checkBtn} onClick={check} disabled={!value.trim()}>
          Check Answer
        </button>
      )}
    </div>
  )
}

// ── Results screen ────────────────────────────────────────────────────────────
function ResultsScreen({ score, total, cat, onRetry, onBack, onNextLesson }) {
  const pct = Math.round((score / total) * 100)
  const addXP = useStore(s => s.addXP)
  const savePracticeResult = useStore(s => s.savePracticeResult)
  const xpRef = useRef(false)

  if (!xpRef.current) {
    xpRef.current = true
    addXP(score * 5)
  }

  let grade, gradeClass
  if (pct >= 80) { grade = 'Excellent! 🏆'; gradeClass = styles.gradeGreen }
  else if (pct >= 60) { grade = 'Good job! ⭐'; gradeClass = styles.gradeBlue }
  else if (pct >= 40) { grade = 'Keep practicing! 💪'; gradeClass = styles.gradeAmber }
  else { grade = 'Review the lesson 📚'; gradeClass = styles.gradePink }

  return (
    <div className={styles.results}>
      <div className={styles.resultsEmoji}>{cat.emoji}</div>
      <div className={`${styles.resultsPct} ${gradeClass}`}>{pct}%</div>
      <div className={`${styles.resultsGrade} ${gradeClass}`}>{grade}</div>
      <div className={styles.resultsScore}>{score} / {total} correct</div>
      <div className={styles.resultsXP}>+{score * 5} XP earned</div>

      <div className={styles.resultsBtns}>
        <button className={styles.retryBtn} onClick={onRetry}>Practice Again</button>
        <button className={styles.backBtn} onClick={onBack}>Back to Lesson</button>
        {onNextLesson && (
          <button
            className={styles.nextBtn}
            style={{ background: cat.color }}
            onClick={onNextLesson}
          >
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
  const markLessonComplete = useStore(s => s.markLessonComplete)
  const completedLessons   = useStore(s => s.completedLessons)

  const [qIndex, setQIndex]     = useState(0)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect]   = useState(false)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)
  const scoreRef = useRef(0)

  const total = exercises.length

  const handleAnswer = useCallback((isCorrect) => {
    setAnswered(true)
    setCorrect(isCorrect)
    if (isCorrect) {
      scoreRef.current += 1
      setScore(s => s + 1)
    }
  }, [])

  const handleNext = () => {
    if (qIndex + 1 >= total) {
      // finished
      savePracticeResult(lesson.id, scoreRef.current, total)
      if (!completedLessons.includes(lesson.id)) {
        const { lessons } = { lessons: [] }
        // marking complete handled externally if score >= 60%
        if (scoreRef.current / total >= 0.6) {
          const GRAMMAR_DATA = {}
          // We pass empty array here; parent marks complete via separate button
        }
      }
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
    setDone(false)
    scoreRef.current = 0
  }

  if (done) {
    return (
      <div className={styles.overlay}>
        <div className={styles.header}>
          <button className={styles.back} onClick={onBack}>← Lesson</button>
          <span className={styles.headerTitle}>Practice</span>
        </div>
        <ResultsScreen
          score={scoreRef.current}
          total={total}
          cat={cat}
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
        <span className={styles.counter} style={{ color: cat.color }}>
          {qIndex + 1} / {total}
        </span>
      </div>

      <ProgressBar current={qIndex + (answered ? 1 : 0)} total={total} />

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
            <MultipleChoiceQ
              exercise={exercise}
              onAnswer={handleAnswer}
              answered={answered}
            />
          )}
          {exercise.type === 'fill-blank' && (
            <FillBlankQ
              exercise={exercise}
              onAnswer={handleAnswer}
              answered={answered}
            />
          )}
          {exercise.type === 'rewrite' && (
            <RewriteQ
              exercise={exercise}
              onAnswer={handleAnswer}
              answered={answered}
            />
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
