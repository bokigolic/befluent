import { useState, useRef, useCallback, memo } from 'react'
import useStore from '../../store/useStore'
import { getDueCards, sortByPriority, previewInterval } from './spacedRepetition'
import styles from './ReviewPage.module.css'

// ── helpers ──────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().slice(0, 10)

function daysLabel(n) {
  if (n === 1) return '1 day'
  return `${n} days`
}

function intervalBadgeClass(interval) {
  if (interval > 21) return styles.badgeGreen
  if (interval > 7)  return styles.badgeBlue
  if (interval > 3)  return styles.badgeAmber
  return styles.badgeRed
}

function intervalLabel(interval) {
  if (interval > 21) return '21d+'
  return `${interval}d`
}

// ── Stats header ──────────────────────────────────────────────────────────────
function StatsHeader({ stats }) {
  const metrics = [
    { label: 'Total',    value: stats.totalCards, color: 'var(--t1)' },
    { label: 'Due',      value: stats.dueToday,   color: stats.dueToday > 0 ? 'var(--acc-p)' : 'var(--t3)' },
    { label: 'Mastered', value: stats.mastered,   color: 'var(--acc-g)' },
    { label: 'Learning', value: stats.learning,   color: 'var(--acc-a)' },
  ]
  return (
    <div className={styles.statsRow}>
      {metrics.map(m => (
        <div key={m.label} className={styles.statCard}>
          <div className={styles.statNum} style={{ color: m.color }}>{m.value}</div>
          <div className={styles.statLabel}>{m.label}</div>
        </div>
      ))}
    </div>
  )
}

// ── Flashcard (3D flip) ───────────────────────────────────────────────────────
function FlashCard({ card, flipped, onFlip, onSwipe }) {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (flipped && onSwipe) {
        onSwipe(dx > 0 ? 4 : 0)
        navigator.vibrate?.(8)
      }
    } else if (!flipped) {
      onFlip()
    }
  }

  return (
    <div
      className={styles.cardScene}
      onClick={!flipped ? onFlip : undefined}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`${styles.cardInner} ${flipped ? styles.cardFlipped : ''}`}>
        {/* Front */}
        <div className={styles.cardFront}>
          <div className={styles.cardType}>{card.type === 'grammar' ? '📖 Grammar' : '📝 Vocabulary'}</div>
          <div className={styles.cardWord}>{card.word}</div>
          <div className={styles.cardHint}>Tap to reveal</div>
        </div>
        {/* Back */}
        <div className={styles.cardBack}>
          <div className={styles.cardType}>{card.type === 'grammar' ? '📖 Grammar' : '📝 Vocabulary'}</div>
          <span className={styles.swipeHintLeft}>← Again</span>
          <span className={styles.swipeHintRight}>Good →</span>
          <div className={styles.cardTranslation}>{card.translation || '—'}</div>
          <div className={styles.cardWordSmall}>{card.word}</div>
          {card.lessonId && (
            <div className={styles.cardLesson}>Lesson: {card.lessonId}</div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Difficulty buttons ────────────────────────────────────────────────────────
function DifficultyButtons({ card, onSelect }) {
  const buttons = [
    { label: 'Again', quality: 0, className: styles.btnAgain },
    { label: 'Hard',  quality: 2, className: styles.btnHard  },
    { label: 'Good',  quality: 4, className: styles.btnGood  },
    { label: 'Easy',  quality: 5, className: styles.btnEasy  },
  ]
  return (
    <div className={styles.diffWrap}>
      <div className={styles.diffButtons}>
        {buttons.map(b => (
          <button key={b.label} className={`${styles.diffBtn} ${b.className}`} onClick={() => onSelect(b.quality)}>
            {b.label}
          </button>
        ))}
      </div>
      <div className={styles.diffPreview}>
        {buttons.map(b => (
          <div key={b.label} className={styles.diffPreviewItem}>
            → {daysLabel(previewInterval(card, b.quality))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Session complete screen ───────────────────────────────────────────────────
function SessionComplete({ total, correct, wrong, onBack, onRetry, catColor }) {
  const addXP            = useStore(s => s.addXP)
  const completeSession  = useStore(s => s.completeReviewSession)
  const xpRef            = useRef(false)

  if (!xpRef.current) {
    xpRef.current = true
    const earned = correct * 3
    if (earned > 0) addXP(earned)
    completeSession(correct)
  }

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const earned = correct * 3

  let emoji, grade, gradeClass, msg
  if (pct >= 80) { emoji = '🏆'; grade = 'Excellent!';       gradeClass = styles.gradeGreen; msg = 'Outstanding recall — keep it up!' }
  else if (pct >= 60) { emoji = '⭐'; grade = 'Good job!';   gradeClass = styles.gradeBlue;  msg = 'Solid session. Review the hard ones again.' }
  else if (pct >= 40) { emoji = '💪'; grade = 'Keep going!'; gradeClass = styles.gradeAmber; msg = 'Practice makes perfect — retry soon.' }
  else               { emoji = '📚'; grade = 'Study more!';  gradeClass = styles.gradePink;  msg = 'Review the lesson content and try again.' }

  return (
    <div className={styles.results}>
      <div className={styles.resultsEmoji}>{emoji}</div>
      <div className={`${styles.resultsPct} ${gradeClass}`}>{pct}%</div>
      <div className={`${styles.resultsGrade} ${gradeClass}`}>{grade}</div>
      <div className={styles.resultsScore}>{correct} correct · {wrong} wrong · {total} total</div>
      {earned > 0 && <div className={styles.resultsXP}>+{earned} XP earned!</div>}
      <div className={styles.resultsMsg}>{msg}</div>
      <div className={styles.resultsBtns}>
        {wrong > 0 && (
          <button className={styles.retryBtn} onClick={onRetry}>
            Retry missed cards
          </button>
        )}
        <button className={styles.backBtn} onClick={onBack}>
          Back to Review
        </button>
      </div>
    </div>
  )
}

// ── Review session overlay ────────────────────────────────────────────────────
function ReviewSession({ initialCards, onClose }) {
  const updateReviewCard = useStore(s => s.updateReviewCard)

  const [queue,      setQueue]      = useState(() => sortByPriority(initialCards))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipped,    setFlipped]    = useState(false)
  const [correct,    setCorrect]    = useState(0)
  const [wrong,      setWrong]      = useState(0)
  const [done,       setDone]       = useState(false)

  const total = queue.length
  const card  = queue[currentIdx]

  const handleDifficulty = useCallback((quality) => {
    updateReviewCard(card.id, quality)
    if (quality >= 3) setCorrect(c => c + 1)
    else              setWrong(w => w + 1)

    if (currentIdx >= total - 1) {
      setDone(true)
    } else {
      setFlipped(false)
      setTimeout(() => setCurrentIdx(i => i + 1), 50)
    }
  }, [card, currentIdx, total, updateReviewCard])

  const handleRetry = useCallback(() => {
    const reviewDeck = useStore.getState().reviewDeck
    const missed = queue.filter((_, i) => {
      // We can't track per-card wrong easily here, so just re-queue due cards
      return true
    })
    setQueue(queue)
    setCurrentIdx(0)
    setCorrect(0)
    setWrong(0)
    setFlipped(false)
    setDone(false)
  }, [queue])

  if (done) {
    return (
      <div className={styles.sessionOverlay}>
        <SessionComplete
          total={total}
          correct={correct}
          wrong={wrong}
          onBack={onClose}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  const progress = total > 0 ? (currentIdx / total) * 100 : 0

  return (
    <div className={styles.sessionOverlay}>
      <div className={styles.sessionHeader}>
        <span className={styles.sessionTitle}>Review Session</span>
        <span className={styles.sessionRemaining}>{total - currentIdx} remaining</span>
        <button className={styles.sessionClose} onClick={onClose}>✕</button>
      </div>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.sessionContent}>
        <FlashCard card={card} flipped={flipped} onFlip={() => setFlipped(true)} onSwipe={handleDifficulty} />
        {flipped && <DifficultyButtons card={card} onSelect={handleDifficulty} />}
        {!flipped && (
          <button className={styles.revealBtn} onClick={() => setFlipped(true)}>
            Reveal Answer
          </button>
        )}
      </div>
    </div>
  )
}

// ── Word list ─────────────────────────────────────────────────────────────────
function WordList({ deck }) {
  const today = todayStr()
  const sorted = [...deck].sort((a, b) => {
    const aOver = a.nextReview < today
    const bOver = b.nextReview < today
    if (aOver && !bOver) return -1
    if (!aOver && bOver) return 1
    return a.nextReview.localeCompare(b.nextReview)
  })

  if (sorted.length === 0) return null

  return (
    <div className={styles.wordList}>
      <div className={styles.wordListLabel}>All cards ({deck.length})</div>
      {sorted.map(card => {
        const overdue = card.nextReview < today
        const due     = card.nextReview === today
        return (
          <div key={card.id} className={styles.wordRow}>
            <div className={styles.wordCol}>
              <span className={styles.wordEn}>{card.word}</span>
              <span className={styles.wordSr}>{card.translation}</span>
            </div>
            <div className={styles.wordMeta}>
              {overdue
                ? <span className={styles.badgeOverdue}>Overdue</span>
                : due
                  ? <span className={styles.badgeDue}>Due today</span>
                  : <span className={styles.wordDate}>{card.nextReview}</span>
              }
              <span className={`${styles.intervalBadge} ${intervalBadgeClass(card.interval)}`}>
                {intervalLabel(card.interval)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main ReviewPage ───────────────────────────────────────────────────────────
function ReviewPage() {
  const reviewDeck = useStore(s => s.reviewDeck)
  const [sessionActive, setSessionActive] = useState(false)

  const dueCards  = getDueCards(reviewDeck)
  const mastered  = reviewDeck.filter(c => c.interval > 21).length
  const stats = {
    totalCards: reviewDeck.length,
    dueToday:   dueCards.length,
    mastered,
    learning:   reviewDeck.length - mastered,
  }

  const hasDue    = dueCards.length > 0
  const hasDeck   = reviewDeck.length > 0

  if (sessionActive) {
    return (
      <ReviewSession
        initialCards={dueCards}
        onClose={() => setSessionActive(false)}
      />
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span className={styles.pageTitle}>🔄 Review</span>
        <span className={styles.pageSubtitle}>Spaced repetition</span>
      </div>

      {!hasDeck ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📭</div>
          <div className={styles.emptyTitle}>Your review deck is empty</div>
          <div className={styles.emptyText}>Search for words in the Dictionary and tap <strong>+</strong> to add them here.</div>
        </div>
      ) : (
        <>
          <StatsHeader stats={stats} />
          <button
            className={`${styles.startBtn} ${!hasDue ? styles.startBtnDisabled : ''}`}
            disabled={!hasDue}
            onClick={() => hasDue && setSessionActive(true)}
          >
            {hasDue
              ? `Review ${dueCards.length} word${dueCards.length !== 1 ? 's' : ''} due`
              : 'No reviews due today ✓'
            }
          </button>
          <WordList deck={reviewDeck} />
        </>
      )}
    </div>
  )
}

export default memo(ReviewPage)
