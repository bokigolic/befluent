import { memo, useMemo } from 'react'
import useStore, { ACHIEVEMENTS_DEF, LEVELS, getLevel, getXpProgress } from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import { GRAMMAR_DATA } from '../grammar/grammarData'
import WeeklyReport from '../adaptive/WeeklyReport'
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

// ── Grammar overview ──────────────────────────────────────────────────────────
function GrammarOverview({ grammarProgress, completedLessons, activityLog }) {
  const totalLessons = useMemo(() =>
    CATEGORIES.reduce((s, c) => s + (GRAMMAR_DATA[c.id]?.lessons?.length ?? c.lessons), 0), [])

  const totalRemMins = useMemo(() => {
    return CATEGORIES.reduce((sum, c) => {
      const lessons = GRAMMAR_DATA[c.id]?.lessons ?? []
      return sum + lessons
        .filter(l => !completedLessons.includes(l.id))
        .reduce((s, l) => s + (parseInt(l.duration) || 0), 0)
    }, 0)
  }, [completedLessons])

  const completedCount = completedLessons.length
  const overallPct     = Math.round((completedCount / totalLessons) * 100)

  const daysActive = useMemo(() => Math.max(1, Object.keys(activityLog).length), [activityLog])
  const lessonsPerDay = completedCount / daysActive
  const daysLeft = lessonsPerDay > 0
    ? Math.ceil((totalLessons - completedCount) / lessonsPerDay)
    : null

  const remText = totalRemMins === 0
    ? 'All done! 🎉'
    : totalRemMins < 60
    ? `~${totalRemMins} min`
    : `~${Math.round(totalRemMins / 60)}h ${totalRemMins % 60 > 0 ? `${totalRemMins % 60}m` : ''}`

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Grammar Overview</div>
      <div className={styles.overviewGrid}>
        <div className={styles.ovCard}>
          <div className={styles.ovNum} style={{ color: 'var(--acc)' }}>{completedCount}</div>
          <div className={styles.ovLabel}>Completed</div>
        </div>
        <div className={styles.ovCard}>
          <div className={styles.ovNum} style={{ color: 'var(--acc-g)' }}>{totalLessons - completedCount}</div>
          <div className={styles.ovLabel}>Remaining</div>
        </div>
        <div className={styles.ovCard}>
          <div className={styles.ovNum} style={{ color: 'var(--acc-p)' }}>{overallPct}%</div>
          <div className={styles.ovLabel}>Done</div>
        </div>
        <div className={styles.ovCard}>
          <div className={styles.ovNum} style={{ color: 'var(--acc-a)', fontSize: '16px' }}>{remText}</div>
          <div className={styles.ovLabel}>Time left</div>
        </div>
      </div>
      <div className={styles.grammarTrack} style={{ marginTop: 12 }}>
        <div className={styles.grammarFill} style={{ width: `${overallPct}%`, background: 'linear-gradient(90deg, var(--acc), var(--acc-p))' }} />
      </div>
      {daysLeft !== null && totalRemMins > 0 && (
        <div className={styles.paceNote}>At your pace: ~{daysLeft} day{daysLeft !== 1 ? 's' : ''} to finish all lessons</div>
      )}
    </div>
  )
}

// ── Grammar leaderboard ───────────────────────────────────────────────────────
const MEDALS = ['🥇', '🥈', '🥉']

function GrammarLeaderboard({ grammarProgress }) {
  const sorted = useMemo(() =>
    [...CATEGORIES].sort((a, b) => (grammarProgress[b.id] ?? 0) - (grammarProgress[a.id] ?? 0)),
  [grammarProgress])

  const top3   = sorted.slice(0, 3)
  const bottom = sorted[sorted.length - 1]
  const showBottom = bottom && !top3.find(c => c.id === bottom.id)

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Category Leaderboard</div>
      <div className={styles.leaderList}>
        {top3.map((cat, i) => (
          <div key={cat.id} className={styles.leaderRow}>
            <span className={styles.leaderMedal}>{MEDALS[i]}</span>
            <span className={styles.leaderEmoji}>{cat.emoji}</span>
            <span className={styles.leaderName}>{cat.title}</span>
            <div className={styles.leaderBarWrap}>
              <div className={styles.leaderBar} style={{ width: `${grammarProgress[cat.id] ?? 0}%`, background: cat.color }} />
            </div>
            <span className={styles.leaderPct} style={{ color: cat.color }}>{grammarProgress[cat.id] ?? 0}%</span>
          </div>
        ))}
        {showBottom && (
          <>
            <div className={styles.leaderDivider}>…</div>
            <div className={styles.leaderRow}>
              <span className={styles.leaderMedal} style={{ opacity: 0.4 }}>📍</span>
              <span className={styles.leaderEmoji}>{bottom.emoji}</span>
              <span className={styles.leaderName} style={{ color: 'var(--t3)' }}>{bottom.title}</span>
              <div className={styles.leaderBarWrap}>
                <div className={styles.leaderBar} style={{ width: `${grammarProgress[bottom.id] ?? 0}%`, background: bottom.color }} />
              </div>
              <span className={styles.leaderPct} style={{ color: 'var(--t3)' }}>{grammarProgress[bottom.id] ?? 0}%</span>
            </div>
          </>
        )}
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

// ── Writing stats ─────────────────────────────────────────────────────────────
function WritingStats({ writingHistory }) {
  const total   = writingHistory.length
  const avgScore = total > 0
    ? Math.round(writingHistory.reduce((s, e) => s + (e.score ?? 0), 0) / total)
    : 0
  const best = total > 0 ? Math.max(...writingHistory.map(e => e.score ?? 0)) : 0

  const errorTypes = useMemo(() => {
    const counts = {}
    writingHistory.forEach(e => {
      if (e.topErrorType) counts[e.topErrorType] = (counts[e.topErrorType] ?? 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [writingHistory])

  const last10 = writingHistory.slice(0, 10).reverse()
  const maxScore = last10.length > 0 ? Math.max(...last10.map(e => e.score ?? 0), 1) : 100

  if (total === 0) {
    return (
      <div className={styles.block}>
        <div className={styles.blockTitle}>Writing Stats</div>
        <div className={styles.writingEmptyHint}>No writing exercises yet — try the Writing tab!</div>
      </div>
    )
  }

  return (
    <div className={styles.block}>
      <div className={styles.blockTitle}>Writing Stats</div>
      <div className={styles.writingMetrics}>
        <div className={styles.writingMetricCard}>
          <div className={styles.writingMetricNum} style={{ color: 'var(--acc)' }}>{total}</div>
          <div className={styles.writingMetricLabel}>Submissions</div>
        </div>
        <div className={styles.writingMetricCard}>
          <div className={styles.writingMetricNum} style={{ color: 'var(--acc-g)' }}>{avgScore}</div>
          <div className={styles.writingMetricLabel}>Avg score</div>
        </div>
        <div className={styles.writingMetricCard}>
          <div className={styles.writingMetricNum} style={{ color: 'var(--acc-p)' }}>{best}</div>
          <div className={styles.writingMetricLabel}>Best score</div>
        </div>
        <div className={styles.writingMetricCard}>
          <div className={styles.writingMetricNum} style={{ color: 'var(--acc-a)', fontSize: 14 }}>
            {errorTypes[0] ? errorTypes[0][0] : '—'}
          </div>
          <div className={styles.writingMetricLabel}>Common error</div>
        </div>
      </div>

      {last10.length > 1 && (
        <>
          <div className={styles.writingChartTitle}>Last {last10.length} scores</div>
          <div className={styles.writingChartWrap}>
            <div className={styles.writingChart}>
              {last10.map((e, i) => {
                const pct = Math.round(((e.score ?? 0) / maxScore) * 100)
                const color = e.score >= 90 ? 'var(--acc-g)' : e.score >= 75 ? 'var(--acc)' : e.score >= 60 ? 'var(--acc-a)' : 'var(--acc-p)'
                return (
                  <div
                    key={i}
                    className={styles.writingBar}
                    style={{ height: `${Math.max(6, pct)}%`, background: color }}
                    title={`${e.score}/100`}
                  />
                )
              })}
            </div>
          </div>
        </>
      )}
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
  const writingHistory     = useStore(s => s.writingHistory)

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

      <WeeklyReport />
      <GrammarOverview grammarProgress={grammarProgress} completedLessons={completedLessons} activityLog={activityLog} />
      <GrammarLeaderboard grammarProgress={grammarProgress} />
      <GrammarProgress grammarProgress={grammarProgress} />
      <ActivityCalendar activityLog={activityLog} />
      <ReviewStats reviewDeck={reviewDeck} reviewSessionsCount={reviewSessionsCount} />
      <WritingStats writingHistory={writingHistory} />
      <AchievementsGrid unlocked={achievements} />
    </div>
  )
}

export default memo(ProgressPage)
