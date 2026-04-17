import { useEffect, useRef, useState } from 'react'
import useStore from '../../store/useStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const xp = useStore((s) => s.xp)
  const streak = useStore((s) => s.streak)
  const [xpBounce, setXpBounce] = useState(false)
  const prevXp = useRef(xp)

  useEffect(() => {
    if (xp !== prevXp.current) {
      prevXp.current = xp
      setXpBounce(true)
      const t = setTimeout(() => setXpBounce(false), 400)
      return () => clearTimeout(t)
    }
  }, [xp])

  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>BeFluent</span>
      <div className={styles.badges}>
        <span className={`${styles.xp} ${xpBounce ? styles.bounce : ''}`}>⚡ {xp} XP</span>
        <span className={styles.streak}>🔥 {streak}</span>
      </div>
    </nav>
  )
}
