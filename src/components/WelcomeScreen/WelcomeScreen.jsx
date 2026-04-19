import { useMemo, memo } from 'react'
import useStore from '../../store/useStore'
import useDictionary from '../../hooks/useDictionary'
import useTranslation from '../../hooks/useTranslation'
import { getDueCards } from '../../features/review/spacedRepetition'
import styles from './WelcomeScreen.module.css'

const WOTD_POOL = [
  'serendipity','ephemeral','melancholy','resilient','eloquent',
  'ambiguous','candid','diligent','empathy','frugal',
  'gratitude','humble','integrity','jovial','meticulous',
  'nuance','profound','tenacious','whimsical','zealous',
  'aberrant','benevolent','cogent','dexterous','exuberant',
  'fastidious','gregarious','haughty','indolent','judicious',
]

const TRENDING = [
  'ephemeral','serendipity','melancholy','resilient','eloquent',
  'wanderlust','sonder','petrichor','hiraeth','vellichor',
]

const getWordOfDay = () => {
  const dayIdx = Math.floor(Date.now() / 86400000)
  return WOTD_POOL[dayIdx % WOTD_POOL.length]
}

// ── Featured Word of the Day ──────────────────────────────────────────────────
function FeaturedWordCard({ onSearch }) {
  const word       = useMemo(() => getWordOfDay(), [])
  const { data, isLoading } = useDictionary(word)
  const { translation }     = useTranslation(word, 'en-sr')
  const savedWords  = useStore(s => s.savedWords)
  const toggleSaved = useStore(s => s.toggleSaved)
  const addXP       = useStore(s => s.addXP)
  const isSaved     = savedWords.includes(word)

  const phonetic   = data?.phonetics?.find(p => p.text)?.text ?? null
  const rawDef     = data?.meanings?.[0]?.definitions?.[0]?.definition ?? null
  const definition = rawDef ? (rawDef.length > 110 ? rawDef.slice(0, 110) + '…' : rawDef) : null

  const handleSave = (e) => {
    e.stopPropagation()
    toggleSaved(word)
    if (!isSaved) addXP(2)
  }

  return (
    <div className={styles.wotdCard}>
      <div className={styles.wotdTop}>
        <span className={styles.wotdLabel}>✨ Word of the Day</span>
        <button
          className={`${styles.wotdSave} ${isSaved ? styles.wotdSaveDone : ''}`}
          onClick={handleSave}
        >
          {isSaved ? '🔖 Saved' : '+ Save'}
        </button>
      </div>
      <div className={styles.wotdWord}>{word}</div>
      {phonetic && <div className={styles.wotdPhonetic}>{phonetic}</div>}
      {isLoading && !data && <div className={styles.wotdSkeleton} />}
      {definition && <p className={styles.wotdDef}>{definition}</p>}
      {translation && (
        <div className={styles.wotdTranslation}>🇷🇸 {translation}</div>
      )}
      <button className={styles.wotdLearnBtn} onClick={() => onSearch(word)}>
        Learn this word →
      </button>
    </div>
  )
}

// ── Review reminder ───────────────────────────────────────────────────────────
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

// ── Recently searched ─────────────────────────────────────────────────────────
function RecentlySearched({ history, onSearch }) {
  if (!history.length) return null
  const recent = history.slice(0, 5)
  return (
    <div className={styles.section}>
      <div className={styles.sectionLabel}>Recently searched</div>
      <div className={styles.scrollRow}>
        {recent.map((h, i) => (
          <button
            key={h.word + i}
            className={styles.recentPill}
            onClick={() => onSearch(h.word)}
          >
            {h.word}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Stats row ─────────────────────────────────────────────────────────────────
function StatsRow() {
  return (
    <div className={styles.statsRow}>
      <div className={styles.statItem}>
        <span className={styles.statNum}>400K+</span>
        <span className={styles.statLabel}>words</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statItem}>
        <span className={styles.statNum}>2</span>
        <span className={styles.statLabel}>languages</span>
      </div>
      <div className={styles.statDivider} />
      <div className={styles.statItem}>
        <span className={styles.statNum}>Free</span>
        <span className={styles.statLabel}>forever</span>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
function WelcomeScreen({ onSearch }) {
  const todayCount    = useStore(s => s.todayCount)
  const dailyGoal     = useStore(s => s.dailyGoal)
  const reviewDeck    = useStore(s => s.reviewDeck)
  const searchHistory = useStore(s => s.searchHistory)
  const setActivePage = useStore(s => s.setActivePage)

  const goalPct     = Math.min(100, Math.round((todayCount / dailyGoal) * 100))
  const goalReached = todayCount >= dailyGoal
  const dueCount    = getDueCards(reviewDeck).length

  return (
    <div className={styles.wrap}>
      <FeaturedWordCard onSearch={onSearch} />

      <ReviewReminder dueCount={dueCount} onGoToReview={() => setActivePage('review')} />

      <div className={styles.top}>
        <h2 className={styles.greeting}>What will you learn today?</h2>
        <p className={styles.sub}>Search any English word for a full breakdown</p>
      </div>

      <RecentlySearched history={searchHistory} onSearch={onSearch} />

      <div className={styles.section}>
        <div className={styles.sectionLabel}>✨ Discover</div>
        <div className={styles.pills}>
          {TRENDING.map((w, i) => (
            <button
              key={w}
              className={styles.pill}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => onSearch(w)}
            >
              {w}
            </button>
          ))}
        </div>
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

      <StatsRow />
    </div>
  )
}

export default memo(WelcomeScreen)
