import useStore from '../../store/useStore'
import styles from './TabBar.module.css'

const TABS = [
  { id: 'dictionary', label: '🔍 Dictionary' },
  { id: 'history',    label: '🕐 History' },
]

export default function TabBar() {
  const activePage = useStore((s) => s.activePage)
  const setActivePage = useStore((s) => s.setActivePage)

  return (
    <div className={styles.tabbar}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activePage === tab.id ? styles.active : ''}`}
          onClick={() => setActivePage(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
