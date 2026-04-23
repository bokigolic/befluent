import { useState, lazy, Suspense, memo } from 'react'
import useStore from '../../store/useStore'
import { getDueCards } from '../../features/review/spacedRepetition'
import styles from './PracticePage.module.css'

const ReviewPage  = lazy(() => import('../../features/review/ReviewPage'))
const QuizPage    = lazy(() => import('../../pages/QuizPage/QuizPage'))
const IdiomsPage  = lazy(() => import('../../features/idioms/IdiomsPage'))
const WritingPage = lazy(() => import('../../features/writing/WritingPage'))
const NewsPage    = lazy(() => import('../../features/news/NewsPage'))

const skel = <div className="suspenseSkel" />

const MODES = [
  { id: 'flashcards', icon: '🃏', title: 'Flashcards',        desc: 'Review your saved words',         time: '~5 min' },
  { id: 'grammar',    icon: '📝', title: 'Grammar Quiz',       desc: 'Random grammar questions',        time: '~5 min' },
  { id: 'idioms',     icon: '💬', title: 'Idiom Quiz',         desc: 'Guess the idiom meaning',         time: '~4 min' },
  { id: 'writing',    icon: '✍️', title: 'Writing Challenge',  desc: 'Daily writing prompt',            time: '~8 min' },
  { id: 'news',       icon: '📰', title: 'News Quiz',          desc: 'Comprehension questions',         time: '~6 min' },
]

function QuickReviewCard({ dueCount, onStart }) {
  return (
    <div className={styles.quickCard}>
      <div className={styles.quickLeft}>
        <div className={styles.quickIcon}>🔄</div>
        <div>
          <div className={styles.quickTitle}>Daily Review</div>
          <div className={styles.quickSub}>
            {dueCount > 0
              ? <><span className={styles.dueNum}>{dueCount}</span> words due today</>
              : <span className={styles.allCaught}>✓ All caught up!</span>
            }
          </div>
        </div>
      </div>
      <button
        className={`${styles.startBtn} ${dueCount === 0 ? styles.startBtnDim : ''}`}
        onClick={dueCount > 0 ? onStart : undefined}
        disabled={dueCount === 0}
      >
        {dueCount > 0 ? 'Start Review →' : 'No cards due'}
      </button>
    </div>
  )
}

function ModeCard({ mode, onStart }) {
  return (
    <button className={styles.modeCard} onClick={() => onStart(mode.id)}>
      <div className={styles.modeIcon}>{mode.icon}</div>
      <div className={styles.modeTitle}>{mode.title}</div>
      <div className={styles.modeDesc}>{mode.desc}</div>
      <div className={styles.modeFooter}>
        <span className={styles.modeTime}>{mode.time}</span>
        <span className={styles.modeArrow}>→</span>
      </div>
    </button>
  )
}

function RecentSession({ entry }) {
  const scoreColor =
    entry.score >= 90 ? 'var(--acc-g)' :
    entry.score >= 70 ? 'var(--acc)' :
    entry.score >= 50 ? 'var(--acc-a)' : 'var(--acc-p)'
  return (
    <div className={styles.recentRow}>
      <span className={styles.recentMode}>{entry.mode}</span>
      <span className={styles.recentDate}>{new Date(entry.date).toLocaleDateString()}</span>
      <span className={styles.recentScore} style={{ color: scoreColor }}>{entry.score}%</span>
    </div>
  )
}

function PracticeHub({ onModeStart, onReviewStart }) {
  const reviewDeck     = useStore(s => s.reviewDeck)
  const writingHistory = useStore(s => s.writingHistory)
  const streak         = useStore(s => s.streak)

  const dueCards = getDueCards(reviewDeck)
  const recent   = writingHistory.slice(0, 5)

  return (
    <div className={styles.hub}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎯 Practice</h1>
        {streak > 0 && (
          <div className={styles.streakBadge}>🔥 {streak} day streak</div>
        )}
      </div>

      <QuickReviewCard dueCount={dueCards.length} onStart={onReviewStart} />

      <div className={styles.sectionLabel}>Practice Modes</div>
      <div className={styles.modesGrid}>
        {MODES.map(m => <ModeCard key={m.id} mode={m} onStart={onModeStart} />)}
      </div>

      {recent.length > 0 && (
        <>
          <div className={styles.sectionLabel}>Recent Sessions</div>
          <div className={styles.recentList}>
            {recent.map((e, i) => <RecentSession key={i} entry={e} />)}
          </div>
        </>
      )}
    </div>
  )
}

function PracticePage() {
  const [active, setActive] = useState(null)

  const handleModeStart = (modeId) => setActive(modeId)
  const handleBack      = () => setActive(null)

  if (active === 'flashcards' || active === 'review') {
    return (
      <Suspense fallback={skel}>
        <div className={styles.modeView}>
          <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
          <ReviewPage />
        </div>
      </Suspense>
    )
  }

  if (active === 'grammar') {
    return (
      <Suspense fallback={skel}>
        <div className={styles.modeView}>
          <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
          <QuizPage onClose={handleBack} />
        </div>
      </Suspense>
    )
  }

  if (active === 'idioms') {
    return (
      <Suspense fallback={skel}>
        <div className={styles.modeView}>
          <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
          <IdiomsPage />
        </div>
      </Suspense>
    )
  }

  if (active === 'writing') {
    return (
      <Suspense fallback={skel}>
        <div className={styles.modeView}>
          <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
          <WritingPage />
        </div>
      </Suspense>
    )
  }

  if (active === 'news') {
    return (
      <Suspense fallback={skel}>
        <div className={styles.modeView}>
          <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
          <NewsPage />
        </div>
      </Suspense>
    )
  }

  return (
    <PracticeHub
      onModeStart={handleModeStart}
      onReviewStart={() => setActive('review')}
    />
  )
}

export default memo(PracticePage)
