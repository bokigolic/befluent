import { useState, memo } from 'react'
import useStore, { LEVELS, ACHIEVEMENTS_DEF, getLevel, getXpProgress } from '../../store/useStore'
import styles from './ProfilePage.module.css'

const FEATURES = [
  '400,000+ English words',
  'Grammar: 81 lessons · 11 categories',
  'Verbs: 118 irregular · 100+ phrasal',
  'Vocabulary: 12 topics · 480 words',
  'News in English: 35 articles A2–C1',
  'Idioms & Slang: 200 idioms · 11 categories',
  'AI Writing Practice with feedback',
  'AI Conversation Simulator',
  'Spaced Repetition review system',
  'Adaptive learning engine',
  'English Level Test (A1–C1)',
  'Gamification: XP · Streaks · Achievements',
  'Offline support (PWA)',
]

const GOAL_OPTIONS  = [3, 5, 10, 20]
const MODE_OPTIONS  = [
  { id: 'en-en', label: 'EN→EN' },
  { id: 'en-sr', label: 'EN→SR' },
  { id: 'sr-en', label: 'SR→EN' },
]
const AVATARS = ['👨‍💻','👩‍💻','🧑‍🎓','👨‍🎓','👩‍🎓','🦁','🐯','🦊','🐺','🦋','🌟','⚡','🔥','💎','🚀','🎯','🏆','👑','🌊','🎸']

function ProfilePage({ onOpenSettings, onOpenLevelTest, onGoProgress }) {
  const xp             = useStore(s => s.xp)
  const streak         = useStore(s => s.streak)
  const achievements   = useStore(s => s.achievements)
  const totalSearches  = useStore(s => s.totalSearches)
  const completedLessons = useStore(s => s.completedLessons)
  const writingHistory = useStore(s => s.writingHistory)
  const dailyGoal      = useStore(s => s.dailyGoal)
  const setDailyGoal   = useStore(s => s.setDailyGoal)
  const dictMode       = useStore(s => s.dictMode)
  const setDictMode    = useStore(s => s.setDictMode)
  const theme          = useStore(s => s.theme)
  const toggleTheme    = useStore(s => s.toggleTheme)
  const soundEnabled   = useStore(s => s.soundEnabled)
  const toggleSound    = useStore(s => s.toggleSound)
  const instantSearch  = useStore(s => s.instantSearch)
  const toggleInstant  = useStore(s => s.toggleInstantSearch)
  const avatar         = useStore(s => s.avatar)
  const setAvatar      = useStore(s => s.setAvatar)
  const memberSince    = useStore(s => s.memberSince)
  const testResult     = useStore(s => s.testResult)
  const clearTestResult = useStore(s => s.clearTestResult)

  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showReset, setShowReset]               = useState(false)

  const level    = getLevel(xp)
  const progress = getXpProgress(xp)
  const nextLevel = LEVELS.find(l => l.min > xp)
  const xpToNext  = nextLevel ? nextLevel.min - xp : 0

  const avgWritingScore = writingHistory.length > 0
    ? Math.round(writingHistory.reduce((s, e) => s + (e.score ?? 0), 0) / writingHistory.length)
    : null

  const unlockedAchs = ACHIEVEMENTS_DEF.filter(a => achievements.includes(a.id))
  const topAchs      = unlockedAchs.slice(0, 3)

  const since = memberSince
    ? new Date(memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently'

  const handleExport = () => {
    const data = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      try { data[key] = JSON.parse(localStorage.getItem(key)) } catch { data[key] = localStorage.getItem(key) }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), { href: url, download: 'befluent-data.json' }).click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.page}>

      {/* ── Avatar + header ── */}
      <div className={styles.profileHeader}>
        <button
          className={styles.avatarBtn}
          onClick={() => setShowAvatarPicker(v => !v)}
          data-magnetic
          title="Change avatar"
        >
          <span className={styles.avatarEmoji}>{avatar}</span>
          <span className={styles.avatarEdit}>✏️</span>
        </button>
        <div className={styles.profileName}>BeFluent Learner</div>
        <div className={styles.levelBadge} style={{ background: `linear-gradient(135deg, rgba(59,130,246,0.18), rgba(6,182,212,0.12))`, border: '1px solid rgba(59,130,246,0.3)' }}>
          {level.emoji} {level.name}
        </div>
        <div className={styles.memberSince}>Learning since {since}</div>

        {/* XP bar */}
        <div className={styles.xpBarWrap}>
          <div className={styles.xpBarFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.xpLabel}>
          {xp.toLocaleString()} XP
          {xpToNext > 0 && <span className={styles.xpToNext}> · {xpToNext} to {nextLevel?.name}</span>}
        </div>
      </div>

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div className={styles.avatarGrid}>
          {AVATARS.map(e => (
            <button
              key={e}
              className={`${styles.avatarOption} ${avatar === e ? styles.avatarSelected : ''}`}
              onClick={() => { setAvatar(e); setShowAvatarPicker(false) }}
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* ── Stats grid ── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc)' }}>{xp.toLocaleString()}</div>
          <div className={styles.statLbl}>⚡ Total XP</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#f59e0b' }}>{streak}</div>
          <div className={styles.statLbl}>🔥 Best streak</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc-g)' }}>{totalSearches}</div>
          <div className={styles.statLbl}>📚 Words learned</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc-p)' }}>{completedLessons.length}</div>
          <div className={styles.statLbl}>✅ Lessons done</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc2)' }}>
            {avgWritingScore !== null ? avgWritingScore : '—'}
          </div>
          <div className={styles.statLbl}>✍️ Writing avg</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#ec4899' }}>{achievements.length}</div>
          <div className={styles.statLbl}>🏆 Achievements</div>
        </div>
      </div>

      {/* ── Achievement showcase ── */}
      {topAchs.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Achievement Showcase</div>
          <div className={styles.achShowcase}>
            {topAchs.map(a => (
              <div key={a.id} className={styles.achCard}>
                <div className={styles.achEmoji}>{a.emoji}</div>
                <div className={styles.achTitle}>{a.title}</div>
                <div className={styles.achXP}>+{a.xpReward} XP</div>
              </div>
            ))}
          </div>
          <button className={styles.viewAllBtn} onClick={() => onGoProgress?.()}>
            View all {achievements.length} achievements →
          </button>
        </div>
      )}

      {/* ── Settings ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Settings</div>

        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Daily goal</span>
          <div className={styles.optGroup}>
            {GOAL_OPTIONS.map(n => (
              <button
                key={n}
                className={`${styles.optBtn} ${dailyGoal === n ? styles.optActive : ''}`}
                onClick={() => setDailyGoal(n)}
              >{n}</button>
            ))}
          </div>
        </div>

        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Dictionary mode</span>
          <div className={styles.optGroup}>
            {MODE_OPTIONS.map(m => (
              <button
                key={m.id}
                className={`${styles.optBtn} ${dictMode === m.id ? styles.optActive : ''}`}
                onClick={() => setDictMode(m.id)}
              >{m.label}</button>
            ))}
          </div>
        </div>

        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Theme</span>
          <button className={styles.toggleBtn} onClick={toggleTheme}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Sound effects</span>
          <button
            className={`${styles.toggleBtn} ${soundEnabled ? styles.toggleOn : ''}`}
            onClick={toggleSound}
          >
            {soundEnabled ? '🔊 On' : '🔇 Off'}
          </button>
        </div>

        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>Instant search</span>
          <button
            className={`${styles.toggleBtn} ${instantSearch ? styles.toggleOn : ''}`}
            onClick={toggleInstant}
          >
            {instantSearch ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* ── Level Test ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>English Level Test</div>
        {testResult ? (
          <div className={styles.ltResultRow}>
            <div className={styles.ltResultInfo}>
              <span className={styles.ltResultBadge}>✅ {testResult.level} — {testResult.name}</span>
              <span className={styles.ltResultScore}>{testResult.score}/20 correct</span>
            </div>
            <div className={styles.ltBtnGroup}>
              <button className={styles.ltRetakeBtn} onClick={() => { clearTestResult(); onOpenLevelTest?.() }}>
                🔄 Retake Test
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.ltNotDone}>
            <span className={styles.ltNotDoneText}>🎯 Discover your English level — takes ~5 minutes</span>
            <button className={styles.ltStartBtn} onClick={() => onOpenLevelTest?.()}>Start Test →</button>
          </div>
        )}
      </div>

      {/* ── Data ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Data</div>
        <div className={styles.dataRow}>
          <button className={styles.exportBtn} onClick={handleExport} data-magnetic>
            📤 Export data
          </button>
          {!showReset ? (
            <button className={styles.resetBtn} onClick={() => setShowReset(true)} data-magnetic>
              🗑️ Reset progress
            </button>
          ) : (
            <div className={styles.confirmRow}>
              <span className={styles.confirmText}>Are you sure?</span>
              <button className={styles.confirmYes} onClick={() => { localStorage.clear(); window.location.reload() }}>
                Yes, reset
              </button>
              <button className={styles.confirmNo} onClick={() => setShowReset(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── About ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>About</div>

        <div className={styles.aboutHeader}>
          <div className={styles.aboutLogo}>📖</div>
          <div className={styles.aboutAppName}>BeFluent</div>
          <div className={styles.aboutTagline}>English Learning Platform</div>
        </div>

        <div className={styles.aboutMeta}>
          <div className={styles.aboutMetaRow}><span>Version</span><span>3.12</span></div>
          <div className={styles.aboutMetaRow}><span>Build</span><span>BG-DEV</span></div>
          <div className={styles.aboutMetaRow}><span>Platform</span><span>Web · PWA</span></div>
          <div className={styles.aboutMetaRow}><span>Status</span><span className={styles.betaBadge}>Beta</span></div>
        </div>

        <div className={styles.aboutFeaturesTitle}>Features</div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.featureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <div className={styles.creditsTitle}>Credits</div>
        <div className={styles.creditsList}>
          <div className={styles.creditItem}><span className={styles.creditDot} />Dictionary API — Free Dictionary</div>
          <div className={styles.creditItem}><span className={styles.creditDot} />Translation — MyMemory API</div>
          <div className={styles.creditItem}><span className={styles.creditDot} />Word suggestions — Datamuse API</div>
          <div className={styles.creditItem}><span className={styles.creditDot} />AI features — AI language assistant</div>
          <div className={styles.creditItem}><span className={styles.creditDot} />Hosting — Netlify</div>
        </div>

        <div className={styles.legal}>
          BeFluent is a beta product. Features and content may change. All learning content is for educational purposes only.
          <br /><br />
          © 2026 BG-DEV. All rights reserved.
        </div>
      </div>

    </div>
  )
}

export default memo(ProfilePage)
