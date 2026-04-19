import { useEffect, useRef, memo } from 'react'
import useStore, { getXpProgress } from '../../store/useStore'
import { LEVEL_INFO } from '../../features/adaptive/adaptiveEngine'
import styles from './Navbar.module.css'

const LEVEL_THRESHOLDS = {
  beginner:     { nextLevel: 'elementary',   needCats: 3, needAcc: 60 },
  elementary:   { nextLevel: 'intermediate', needCats: 6, needAcc: 70 },
  intermediate: { nextLevel: 'advanced',     needCats: 9, needAcc: 80 },
  advanced:     { nextLevel: null,           needCats: 11, needAcc: 85 },
}

function calcLevelProgress(categoryScores, currentLevel) {
  const thresh = LEVEL_THRESHOLDS[currentLevel]
  if (!thresh || !thresh.nextLevel) return 100
  const qualifying = Object.values(categoryScores).filter(d => {
    const total = d.correct + d.wrong
    if (total === 0) return false
    return Math.round((d.correct / total) * 100) >= thresh.needAcc
  }).length
  return Math.min(100, Math.round((qualifying / thresh.needCats) * 100))
}

function Navbar() {
  const xp              = useStore(s => s.xp)
  const streak          = useStore(s => s.streak)
  const theme           = useStore(s => s.theme)
  const toggleTheme     = useStore(s => s.toggleTheme)
  const setShowSettings = useStore(s => s.setShowSettings)
  const adaptiveData    = useStore(s => s.adaptiveData)

  const prevXp   = useRef(xp)
  const fillRef  = useRef(null)
  const xpProgress = getXpProgress(xp)

  const currentLevel  = adaptiveData?.currentLevel ?? 'beginner'
  const levelInfo     = LEVEL_INFO[currentLevel] ?? LEVEL_INFO.beginner
  const levelProgress = calcLevelProgress(adaptiveData?.categoryScores ?? {}, currentLevel)

  useEffect(() => {
    if (xp !== prevXp.current) {
      prevXp.current = xp
      fillRef.current?.classList.add(styles.pulse)
      const t = setTimeout(() => fillRef.current?.classList.remove(styles.pulse), 600)
      return () => clearTimeout(t)
    }
  }, [xp])

  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>BeFluent</span>

      <div className={styles.levelWrap}>
        <div className={styles.levelName} style={{ color: levelInfo.color }}>
          {levelInfo.emoji} {levelInfo.label}
        </div>
        <div className={styles.levelTrack}>
          <div
            className={styles.levelFill}
            style={{ width: `${levelProgress}%`, background: levelInfo.color }}
          />
        </div>
      </div>

      <div className={styles.badges}>
        <button
          className={styles.themeBtn}
          onClick={() => setShowSettings(true)}
          title="Settings"
          aria-label="Settings"
        >
          ⚙️
        </button>
        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        {streak > 0 && (
          <span className={styles.streak}>🔥 {streak}</span>
        )}
      </div>
      <div className={styles.xpBar}>
        <div ref={fillRef} className={styles.xpFill} style={{ width: `${xpProgress}%` }} />
      </div>
    </nav>
  )
}

export default memo(Navbar)
