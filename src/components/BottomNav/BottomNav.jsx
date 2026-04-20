import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { id: 'dictionary', icon: '🔍', label: 'Search' },
  { id: 'grammar',    icon: '📚', label: 'Grammar' },
  { id: 'writing',    icon: '✍️', label: 'Writing' },
  { id: 'review',     icon: '🔄', label: 'Review' },
  { id: 'profile',    icon: '👤', label: 'Profile' },
]

function BottomNav() {
  const activePage    = useStore(s => s.activePage)
  const setActivePage = useStore(s => s.setActivePage)
  const [tapId, setTapId]   = useState(null)

  const handleTap = (id) => {
    if (id === activePage) return
    setTapId(id)
    setActivePage(id)
    navigator.vibrate?.(8)
    setTimeout(() => setTapId(null), 250)
  }

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          className={`${styles.item} ${activePage === item.id ? styles.active : ''} ${tapId === item.id ? styles.tapping : ''}`}
          onClick={() => handleTap(item.id)}
          aria-label={item.label}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default memo(BottomNav)
