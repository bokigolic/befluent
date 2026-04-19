import { memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import styles from './WeeklyReport.module.css'

function fmtDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
}

function getCatName(id) {
  return CATEGORIES.find(c => c.id === id)?.title ?? id
}

function WeeklyReport() {
  const adaptiveData       = useStore(s => s.adaptiveData)
  const generateWeeklyReport = useStore(s => s.generateWeeklyReport)

  const report = adaptiveData?.lastWeekReport

  const handleShare = async () => {
    if (!report) return
    const text = `This week on BeFluent: ${report.wordsSearched} words searched, ${report.lessonsCompleted} lessons, ${report.xpEarned} XP! 🎯 — befluent.app`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My BeFluent Weekly Report', text })
      } else {
        await navigator.clipboard.writeText(text)
      }
    } catch {}
  }

  const handleGenerate = () => {
    generateWeeklyReport()
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>📊 Weekly Report</div>
          {report && (
            <div className={styles.dateRange}>
              {fmtDate(report.weekStart)} – {fmtDate(report.weekEnd)}
            </div>
          )}
        </div>
        <div className={styles.headerBtns}>
          {report && (
            <button className={styles.shareBtn} onClick={handleShare} title="Share report">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <circle cx="11.5" cy="2.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="11.5" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="3.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="9.75" y1="3.4" x2="5.25" y2="6.6" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="9.75" y1="11.6" x2="5.25" y2="8.4" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </button>
          )}
          <button className={styles.generateBtn} onClick={handleGenerate}>
            {report ? 'Refresh' : 'Generate report'}
          </button>
        </div>
      </div>

      {!report ? (
        <div className={styles.empty}>
          Generate your weekly report to see how you performed this week
        </div>
      ) : (
        <>
          {/* Stats grid */}
          <div className={styles.statsGrid}>
            {[
              { emoji: '📚', num: report.wordsSearched,    label: 'words searched' },
              { emoji: '✅', num: report.lessonsCompleted, label: 'lessons done' },
              { emoji: '🎯', num: report.practicesDone,    label: 'exercises' },
              { emoji: '⚡', num: report.xpEarned,         label: 'XP earned' },
              { emoji: '🔥', num: report.streakDays,       label: 'day streak' },
            ].map(({ emoji, num, label }) => (
              <div key={label} className={styles.statCard}>
                <div className={styles.statEmoji}>{emoji}</div>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>

          {/* Personal message */}
          <div className={styles.message}>{report.personalMessage}</div>

          {/* Strongest / weakest */}
          <div className={styles.insightRow}>
            {report.strongestCategory && (
              <div className={`${styles.insightBox} ${styles.insightGreen}`}>
                <div className={styles.insightLabel}>⭐ Strongest</div>
                <div className={styles.insightValue}>{getCatName(report.strongestCategory.id)}</div>
                <div className={styles.insightAcc}>{report.strongestCategory.acc}% accuracy</div>
              </div>
            )}
            {report.weakestCategory && report.weakestCategory.id !== report.strongestCategory?.id && (
              <div className={`${styles.insightBox} ${styles.insightAmber}`}>
                <div className={styles.insightLabel}>⚠️ Focus on</div>
                <div className={styles.insightValue}>{getCatName(report.weakestCategory.id)}</div>
                <div className={styles.insightAcc}>{report.weakestCategory.acc}% → aim for 80%+</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default memo(WeeklyReport)
