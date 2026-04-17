import { useEffect, useRef, memo } from 'react'
import useStore, { getXpProgress } from '../../store/useStore'
import styles from './Navbar.module.css'

function Navbar() {
  const xp          = useStore(s => s.xp)
  const streak      = useStore(s => s.streak)
  const theme       = useStore(s => s.theme)
  const toggleTheme = useStore(s => s.toggleTheme)

  const prevXp   = useRef(xp)
  const fillRef  = useRef(null)
  const progress = getXpProgress(xp)

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
      <div className={styles.badges}>
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
        <div ref={fillRef} className={styles.xpFill} style={{ width: `${progress}%` }} />
      </div>
    </nav>
  )
}

export default memo(Navbar)
