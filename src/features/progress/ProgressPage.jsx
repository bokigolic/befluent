import { memo } from 'react'
import useStore, { ACHIEVEMENTS_DEF, LEVELS, getLevel, getXpProgress } from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import styles from './ProgressPage.module.css'

// ── Activity calendar ─────────────────────────────────────────────────────────
function ActivityCalendar({ activityLog }) {
  const days = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    days.push({ key, count: activityLog[key] ?? 0 })
  }

  const cellColor = (count) => {
    if (count === 0) return 'var(--elevated)'
    if (count <= 3)  return 'rgba(124,111,255,0.35)'
    if (count <= 7)  return 'rgba(124,111,255,0.65)'
    return 'var(--acc)'
  }

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Activity — last 30 days</div>
      <div className={styles.calGrid}>
        {days.map((d, i) => (
          <div
            key={d.key}
            className={styles.calCell}
            style={{ background: cellColor(d.count), animationDelay: `${i * 8}ms` }}
            title={`${d.key}: ${d.count} searches`}
          />
        ))}
      </div>
    </div>
  )
}

// ── Grammar progress bars ─────────────────────────────────────────────────────
function GrammarProgress({ grammarProgress }) {
  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Grammar Progress</div>
      <div className={styles.grammarList}>
        {CATEGORIES.map((cat, i) => {
          const pct = grammarProgress[cat.id] ?? 0
          return (
            <div key={cat.id} className={styles.grammarRow} style={{ animationDelay: `${i * 80}ms` }}>
              <div className={styles.grammarMeta}>
                <span className={styles.grammarEmoji}>{cat.emoji}</span>
                <span className={styles.grammarName}>{cat.title}</span>
                <span className={styles.grammarPct}>{pct}%</span>
              </div>
              <div className={styles.grammarTrack}>
                <div
                  className={styles.grammarFill}
                  style={{ width: `${pct}%`, background: cat.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Achievements grid ─────────────────────────────────────────────────────────
function AchievementsGrid({ unlocked }) {
  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Achievements</div>
      <div className={styles.achGrid}>
        {ACHIEVEMENTS_DEF.map(a => {
          const done = unlocked.includes(a.id)
          return (
            <div key={a.id} className={`${styles.achCard} ${done ? styles.achDone : styles.achLocked}`}>
              <div className={styles.achEmoji}>{a.emoji}</div>
              <div className={styles.achTitle}>{a.title}</div>
              <div className={styles.achDesc}>{a.desc}</div>
              <div className={styles.achXP}>+{a.xpReward} XP</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Review stats ──────────────────────────────────────────────────────────────
function ReviewStats({ reviewDeck, reviewSessionsCount }) {
  const total    = reviewDeck.length
  const correct  = reviewDeck.reduce((s, c) => s + c.timesCorrect, 0)
  const wrong    = reviewDeck.reduce((s, c) => s + c.timesWrong, 0)
  const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Review Stats</div>
      <div className={styles.threeCol}>
        <div className={styles.metricCard}>
          <div className={styles.metricNum} style={{ color: 'var(--acc)' }}>{total}</div>
          <div className={styles.metricLabel}>Cards in deck</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricNum} style={{ color: 'var(--acc-g)' }}>{accuracy}%</div>
          <div className={styles.metricLabel}>Accuracy</div>
        </div>
        <div className={styles.metricCard}>
          <div className={styles.metricNum} style={{ color: 'var(--acc-a)' }}>{reviewSessionsCount}</div>
          <div className={styles.metricLabel}>Sessions</div>
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
function ProgressPage() {
  const xp                 = useStore(s => s.xp)
  const streak             = useStore(s => s.streak)
  const totalSearches      = useStore(s => s.totalSearches)
  const grammarProgress    = useStore(s => s.grammarProgress)
  const completedLessons   = useStore(s => s.completedLessons)
  const achievements       = useStore(s => s.achievements)
  const activityLog        = useStore(s => s.activityLog)
  const reviewDeck         = useStore(s => s.reviewDeck)
  const reviewSessionsCount = useStore(s => s.reviewSessionsCount)

  const level    = getLevel(xp)
  const progress = getXpProgress(xp)
  const levelIdx = LEVELS.findIndex(l => l.name === level.name)
  const nextLevel = LEVELS[levelIdx + 1]
  const xpToNext  = nextLevel ? nextLevel.min - xp : 0

  return (
    <div className={styles.page}>
      {/* ── Header stats ── */}
      <div className={styles.heroRow}>
        <div className={styles.heroCard}>
          <div className={styles.heroNum} style={{
            background: 'linear-gradient(135deg, var(--acc), var(--acc-p))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>{xp.toLocaleString()}</div>
          <div className={styles.heroLabel}>Total XP</div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroNum}>{level.emoji} {level.name}</div>
          <div className={styles.heroLabel}>Current level</div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroNum} style={{ color: '#ff6b6b' }}>🔥 {streak}</div>
          <div className={styles.heroLabel}>Day streak</div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroNum} style={{ color: 'var(--acc-g)' }}>{totalSearches}</div>
          <div className={styles.heroLabel}>Words learned</div>
        </div>
      </div>

      {/* ── XP bar to next level ── */}
      <div className={styles.block}>
        <div className={styles.xpLevelRow}>
          <span className={styles.xpLevelCurrent}>{level.emoji} {level.name}</span>
          {nextLevel && <span className={styles.xpLevelNext}>{nextLevel.emoji} {nextLevel.name}</span>}
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.xpSub}>
          {nextLevel ? `${xpToNext} XP to ${nextLevel.name}` : '🎉 Max level reached!'}
        </div>
      </div>

      <GrammarProgress grammarProgress={grammarProgress} />
      <ActivityCalendar activityLog={activityLog} />
      <ReviewStats reviewDeck={reviewDeck} reviewSessionsCount={reviewSessionsCount} />
      <AchievementsGrid unlocked={achievements} />
    </div>
  )
}

export default memo(ProgressPage)
