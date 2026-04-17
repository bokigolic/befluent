import { memo } from 'react'
import useStore, { LEVELS, ACHIEVEMENTS_DEF, getLevel, getXpProgress } from '../../store/useStore'
import styles from './ProfilePage.module.css'

const GOAL_OPTIONS = [3, 5, 10, 20]

const getLast7Days = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    days.push({
      key:     d.toDateString(),
      label:   d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2),
      isToday: i === 0,
    })
  }
  return days
}

function ProfilePage() {
  const xp            = useStore(s => s.xp)
  const streak        = useStore(s => s.streak)
  const achievements  = useStore(s => s.achievements)
  const totalSearches = useStore(s => s.totalSearches)
  const savedWords    = useStore(s => s.savedWords)
  const todayCount    = useStore(s => s.todayCount)
  const dailyGoal     = useStore(s => s.dailyGoal)
  const weeklyData    = useStore(s => s.weeklyData)
  const quizBestScore = useStore(s => s.quizBestScore)
  const setDailyGoal  = useStore(s => s.setDailyGoal)

  const level     = getLevel(xp)
  const progress  = getXpProgress(xp)
  const nextLevel = LEVELS.find(l => l.min > xp)
  const xpToNext  = nextLevel ? nextLevel.min - xp : 0

  const goalPct  = Math.min(100, Math.round((todayCount / dailyGoal) * 100))
  const goalDone = todayCount >= dailyGoal

  const days    = getLast7Days()
  const maxCount = Math.max(1, ...days.map(d => weeklyData[d.key] || 0))

  return (
    <div className={styles.page}>

      {/* ── Level card ── */}
      <div className={styles.levelCard}>
        <div className={styles.levelEmoji}>{level.emoji}</div>
        <div className={styles.levelInfo}>
          <div className={styles.levelName}>{level.name}</div>
          <div className={styles.levelXp}>
            {xp} XP
            {xpToNext > 0 && <span className={styles.xpToNext}> · {xpToNext} to next</span>}
          </div>
          <div className={styles.levelBar}>
            <div className={styles.levelFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* ── Quick stats ── */}
      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <span className={styles.statNum}>🔥 {streak}</span>
          <span className={styles.statLbl}>Streak</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNum}>{totalSearches}</span>
          <span className={styles.statLbl}>Searched</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNum}>{savedWords.length}</span>
          <span className={styles.statLbl}>Saved</span>
        </div>
        {quizBestScore > 0 && (
          <div className={styles.statBox}>
            <span className={styles.statNum}>{quizBestScore}%</span>
            <span className={styles.statLbl}>Best quiz</span>
          </div>
        )}
      </div>

      {/* ── Weekly activity chart ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>This week</div>
        <div className={styles.chart}>
          {days.map(d => {
            const count = weeklyData[d.key] || 0
            const pct   = Math.round((count / maxCount) * 100)
            return (
              <div key={d.key} className={styles.chartCol}>
                <div className={styles.chartBarWrap}>
                  <div
                    className={`${styles.chartBar} ${d.isToday ? styles.chartBarToday : ''}`}
                    style={{ height: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                  />
                </div>
                <div className={`${styles.chartLabel} ${d.isToday ? styles.chartLabelToday : ''}`}>
                  {d.label}
                </div>
                {count > 0 && <div className={styles.chartCount}>{count}</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Today's goal ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Today's Goal</div>
        <div className={styles.goalRow}>
          <span className={styles.goalCount}>{todayCount} / {dailyGoal} words</span>
          {goalDone && <span className={styles.goalBadge}>🎯 Done!</span>}
        </div>
        <div className={styles.goalTrack}>
          <div
            className={`${styles.goalFill} ${goalDone ? styles.goalFillDone : ''}`}
            style={{ width: `${goalPct}%` }}
          />
        </div>
        <div className={styles.goalOptions}>
          {GOAL_OPTIONS.map(n => (
            <button
              key={n}
              className={`${styles.goalOpt} ${dailyGoal === n ? styles.goalOptActive : ''}`}
              onClick={() => setDailyGoal(n)}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* ── Achievements ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Achievements
          <span className={styles.achievCount}>{achievements.length} / {ACHIEVEMENTS_DEF.length}</span>
        </div>
        <div className={styles.achievGrid}>
          {ACHIEVEMENTS_DEF.map((a, i) => {
            const unlocked = achievements.includes(a.id)
            return (
              <div
                key={a.id}
                className={`${styles.achievCard} ${unlocked ? styles.unlocked : styles.locked}`}
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <div className={styles.achievEmoji}>{unlocked ? a.emoji : '🔒'}</div>
                <div className={styles.achievName}>{a.title}</div>
                <div className={styles.achievDesc}>{a.desc}</div>
                {unlocked && <div className={styles.achievXp}>+{a.xpReward} XP</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(ProfilePage)
