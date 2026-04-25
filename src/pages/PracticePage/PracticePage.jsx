import { useState, lazy, Suspense, memo } from 'react'
import useStore from '../../store/useStore'
import { getDueCards } from '../../features/review/spacedRepetition'
import LevelTest from '../../features/leveltest/LevelTest'
import styles from './PracticePage.module.css'

const ReviewPage  = lazy(() => import('../../features/review/ReviewPage'))
const QuizPage    = lazy(() => import('../../pages/QuizPage/QuizPage'))
const IdiomsPage  = lazy(() => import('../../features/idioms/IdiomsPage'))
const WritingPage = lazy(() => import('../../features/writing/WritingPage'))
const NewsPage    = lazy(() => import('../../features/news/NewsPage'))
const TopicsPage  = lazy(() => import('../../features/topics/TopicsPage'))

const skel = <div className="suspenseSkel" />

const PRACTICE_ITEMS = [
  { id: 'writing',   icon: '✍️', title: 'Writing Practice',  desc: 'AI corrects your English',        time: '~5 min' },
  { id: 'grammar',   icon: '📝', title: 'Grammar Quiz',      desc: 'Random grammar questions',        time: '~5 min' },
  { id: 'idioms',    icon: '💬', title: 'Idiom Quiz',        desc: 'Guess the meaning',               time: '~3 min' },
  { id: 'topics',    icon: '🗂️', title: 'Vocabulary Quiz',   desc: 'Test topic words',                time: '~5 min' },
  { id: 'news',      icon: '📰', title: 'News Quiz',         desc: 'Comprehension questions',         time: '~5 min' },
  { id: 'leveltest', icon: '🎯', title: 'Level Test',        desc: '20 questions · find your level',  time: '~8 min' },
]

// ── Daily Review card ─────────────────────────────────────────────────────────
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
              : <span className={styles.allCaught}>✅ All caught up! No reviews due.</span>
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

// ── Practice list item ────────────────────────────────────────────────────────
function PracticeItem({ item, onStart }) {
  return (
    <button className={styles.practiceItem} onClick={() => onStart(item.id)}>
      <span className={styles.itemIcon}>{item.icon}</span>
      <div className={styles.itemBody}>
        <div className={styles.itemTitle}>{item.title}</div>
        <div className={styles.itemDesc}>{item.desc} · {item.time}</div>
      </div>
      <span className={styles.itemArrow}>Start →</span>
    </button>
  )
}

// ── Recent session row ────────────────────────────────────────────────────────
function RecentSession({ entry }) {
  const scoreColor =
    entry.score >= 90 ? 'var(--acc-g)' :
    entry.score >= 70 ? 'var(--acc)'   :
    entry.score >= 50 ? 'var(--acc-a)' : 'var(--acc-p)'
  return (
    <div className={styles.recentRow}>
      <span className={styles.recentIcon}>✍️</span>
      <span className={styles.recentMode}>Writing</span>
      <span className={styles.recentDate}>{new Date(entry.date).toLocaleDateString()}</span>
      <span className={styles.recentScore} style={{ color: scoreColor }}>{entry.score}%</span>
    </div>
  )
}

// ── Practice hub ──────────────────────────────────────────────────────────────
function PracticeHub({ onModeStart, onReviewStart, onLevelTest }) {
  const reviewDeck     = useStore(s => s.reviewDeck)
  const writingHistory = useStore(s => s.writingHistory)
  const streak         = useStore(s => s.streak)

  const dueCards = getDueCards(reviewDeck)
  const recent   = writingHistory.slice(0, 3)

  return (
    <div className={styles.hub}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎯 Practice</h1>
        {streak > 0 && <div className={styles.streakBadge}>🔥 {streak} day streak</div>}
      </div>

      <QuickReviewCard dueCount={dueCards.length} onStart={onReviewStart} />

      <div className={styles.sectionLabel}>Practice by Skill</div>
      <div className={styles.practiceList}>
        {PRACTICE_ITEMS.map(item => (
          <PracticeItem
            key={item.id}
            item={item}
            onStart={item.id === 'leveltest' ? onLevelTest : onModeStart}
          />
        ))}
      </div>

      {recent.length > 0 && (
        <>
          <div className={styles.sectionLabel}>Recent Practice</div>
          <div className={styles.recentList}>
            {recent.map((e, i) => <RecentSession key={i} entry={e} />)}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main PracticePage ─────────────────────────────────────────────────────────
function PracticePage() {
  const [active,        setActive]        = useState(null)
  const [showLevelTest, setShowLevelTest] = useState(false)
  const setActiveLearnSection = useStore(s => s.setActiveLearnSection)
  const setActivePage         = useStore(s => s.setActivePage)

  const handleBack = () => setActive(null)

  const modeView = (child) => (
    <Suspense fallback={skel}>
      <div className={styles.modeView}>
        <button className={styles.backBtn} onClick={handleBack}>← Practice</button>
        {child}
      </div>
    </Suspense>
  )

  if (active === 'review')  return modeView(<ReviewPage />)
  if (active === 'grammar') return modeView(<QuizPage onClose={handleBack} />)
  if (active === 'idioms')  return modeView(<IdiomsPage autoStartQuiz />)
  if (active === 'writing') return modeView(<WritingPage />)
  if (active === 'news')    return modeView(<NewsPage autoOpenQuiz />)
  if (active === 'topics')  return modeView(<TopicsPage autoOpenQuiz />)

  return (
    <>
      <PracticeHub
        onModeStart={setActive}
        onReviewStart={() => setActive('review')}
        onLevelTest={() => setShowLevelTest(true)}
      />
      {showLevelTest && (
        <LevelTest
          onClose={() => setShowLevelTest(false)}
          onGoSection={(sec) => {
            setShowLevelTest(false)
            setActivePage('learn')
            setActiveLearnSection(sec)
          }}
        />
      )}
    </>
  )
}

export default memo(PracticePage)
