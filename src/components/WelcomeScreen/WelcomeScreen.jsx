import { useMemo, memo } from 'react'
import useStore from '../../store/useStore'
import WordOfDay from '../WordOfDay/WordOfDay'
import GrammarSection from '../../features/grammar/GrammarSection'
import { getDueCards } from '../../features/review/spacedRepetition'
import styles from './WelcomeScreen.module.css'

const WORD_POOL = [
  'serendipity','ephemeral','melancholy','resilient','eloquent',
  'ambiguous','candid','diligent','empathy','frugal',
  'gratitude','humble','integrity','jovial','meticulous',
  'nuance','profound','tenacious','whimsical','zealous',
  'aberrant','benevolent','cogent','dexterous','exuberant',
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function ReviewReminder({ dueCount, onGoToReview }) {
  if (dueCount <= 0) return null
  return (
    <div className={styles.reviewReminder}>
      <span className={styles.reviewReminderIcon}>🔄</span>
      <div className={styles.reviewReminderText}>
        <div className={styles.reviewReminderTitle}>
          You have {dueCount} word{dueCount !== 1 ? 's' : ''} to review today
        </div>
        <div className={styles.reviewReminderSub}>
          Keep your streak going — reviews take 2-3 minutes
        </div>
      </div>
      <button className={styles.reviewReminderBtn} onClick={onGoToReview}>
        Start →
      </button>
    </div>
  )
}

function WelcomeScreen({ onSearch }) {
  const words       = useMemo(() => shuffle(WORD_POOL).slice(0, 5), [])
  const todayCount  = useStore(s => s.todayCount)
  const dailyGoal   = useStore(s => s.dailyGoal)
  const reviewDeck  = useStore(s => s.reviewDeck)
  const setActivePage = useStore(s => s.setActivePage)

  const goalPct     = Math.min(100, Math.round((todayCount / dailyGoal) * 100))
  const goalReached = todayCount >= dailyGoal
  const dueCount    = getDueCards(reviewDeck).length

  return (
    <div className={styles.wrap}>
      <WordOfDay onSearch={onSearch} />

      <ReviewReminder dueCount={dueCount} onGoToReview={() => setActivePage('review')} />

      <div className={styles.top}>
        <h2 className={styles.greeting}>What will you learn today?</h2>
        <p className={styles.sub}>Search a word or tap a suggestion below</p>
      </div>

      <div className={styles.suggestLabel}>Try these words</div>
      <div className={styles.pills}>
        {words.map((w, i) => (
          <button
            key={w}
            className={styles.pill}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => onSearch(w)}
          >
            {w}
          </button>
        ))}
      </div>

      <div className={styles.goalSection}>
        <div className={styles.goalHeader}>
          <span className={styles.goalLabel}>Today's goal</span>
          <span className={styles.goalCount}>{todayCount} / {dailyGoal} words</span>
        </div>
        <div className={styles.goalTrack}>
          <div
            className={`${styles.goalFill} ${goalReached ? styles.goalFillDone : ''}`}
            style={{ width: `${goalPct}%` }}
          />
        </div>
        {goalReached && (
          <div className={styles.goalDone}>🎯 Daily goal reached!</div>
        )}
      </div>

      <GrammarSection />

    </div>
  )
}

export default memo(WelcomeScreen)
