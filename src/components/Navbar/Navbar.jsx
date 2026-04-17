import useStore from '../../store/useStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const xp = useStore((s) => s.xp)
  const streak = useStore((s) => s.streak)

  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>BeFluent</span>
      <div className={styles.badges}>
        <span className={styles.xp}>⚡ {xp} XP</span>
        <span className={styles.streak}>🔥 {streak}</span>
      </div>
    </nav>
  )
}
