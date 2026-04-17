import { useState } from 'react'
import useStore from '../../store/useStore'
import styles from './TabBar.module.css'

const TABS = [
  { id: 'dictionary', label: '🔍 Dictionary' },
  { id: 'history',    label: '🕐 History' },
]

export default function TabBar() {
  const activePage = useStore((s) => s.activePage)
  const setActivePage = useStore((s) => s.setActivePage)
  const [bounceId, setBounceId] = useState(null)

  const handleClick = (id) => {
    if (id === activePage) return
    setBounceId(id)
    setActivePage(id)
    setTimeout(() => setBounceId(null), 300)
  }

  return (
    <div className={styles.tabbar}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activePage === tab.id ? styles.active : ''} ${bounceId === tab.id ? styles.bounce : ''}`}
          onClick={() => handleClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
