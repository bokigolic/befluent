import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { id: 'dictionary', icon: '🔍', label: 'Search'  },
  { id: 'grammar',    icon: '📚', label: 'Grammar' },
  { id: 'writing',    icon: '✍️', label: 'Write'   },
  { id: 'review',     icon: '🔄', label: 'Review'  },
  { id: 'topics',     icon: '📖', label: 'Topics'  },
]

function BottomNav() {
  const activePage    = useStore(s => s.activePage)
  const setActivePage = useStore(s => s.setActivePage)
  const [tapId, setTapId] = useState(null)

  const handleTap = (id) => {
    if (id === activePage) return
    setTapId(id)
    setActivePage(id)
    navigator.vibrate?.(8)
    setTimeout(() => setTapId(null), 200)
  }

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map(item => {
        const isActive = activePage === item.id
        return (
          <button
            key={item.id}
            className={`${styles.item} ${isActive ? styles.active : ''} ${tapId === item.id ? styles.tapping : ''}`}
            onClick={() => handleTap(item.id)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default memo(BottomNav)
