import { useEffect, memo } from 'react'
import styles from './ShortcutsOverlay.module.css'

const SHORTCUTS = [
  { key: '/',      desc: 'Focus search bar' },
  { key: 'Esc',    desc: 'Close / go back' },
  { key: 'Enter',  desc: 'Search / flip card' },
  { key: '?',      desc: 'Show this overlay' },
  { key: '1',      desc: 'Dictionary tab' },
  { key: '2',      desc: 'Grammar tab' },
  { key: '3',      desc: 'Writing tab' },
  { key: '4',      desc: 'Review tab' },
  { key: '5',      desc: 'Progress tab' },
  { key: 'Space',  desc: 'Flip flashcard' },
  { key: '← →',   desc: 'Navigate lessons' },
  { key: 'N',      desc: 'New writing prompt' },
  { key: 'R',      desc: 'Refresh word of the day' },
]

function ShortcutsOverlay({ onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' || e.key === '?') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Keyboard Shortcuts ⌨️</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.list}>
          {SHORTCUTS.map(({ key, desc }) => (
            <div key={key} className={styles.row}>
              <kbd className={styles.kbd}>{key}</kbd>
              <span className={styles.desc}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ShortcutsOverlay)
