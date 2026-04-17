import { useState } from 'react'
import useStore from '../../store/useStore'
import styles from './HistoryPage.module.css'

const MODE_STYLE = {
  'en-en': { background: 'rgba(124,111,255,0.2)', color: '#a99fff' },
  'en-sr': { background: 'rgba(0,229,160,0.15)',  color: 'var(--acc-g)' },
  'sr-en': { background: 'rgba(255,169,77,0.15)', color: 'var(--acc-a)' },
}

export default function HistoryPage({ onWordClick }) {
  const searchHistory     = useStore((s) => s.searchHistory)
  const removeFromHistory = useStore((s) => s.removeFromHistory)
  const clearHistory      = useStore((s) => s.clearHistory)
  const [removing, setRemoving] = useState(new Set())

  const handleRemove = (word) => {
    setRemoving((prev) => new Set([...prev, word]))
    setTimeout(() => {
      removeFromHistory(word)
      setRemoving((prev) => { const next = new Set(prev); next.delete(word); return next })
    }, 200)
  }

  if (searchHistory.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📖</span>
        <p className={styles.emptyTitle}>No searches yet</p>
        <p className={styles.emptySub}>Start searching to build your history</p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>Recent searches</span>
        <button className={styles.clearBtn} onClick={clearHistory}>Clear all</button>
      </div>
      <div className={styles.grid}>
        {searchHistory.map((item, i) => (
          <div
            key={item.word}
            className={`${styles.pill} ${removing.has(item.word) ? styles.pillRemoving : ''}`}
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => !removing.has(item.word) && onWordClick(item.word, item.mode)}
          >
            <span className={styles.word}>{item.word}</span>
            <span className={styles.modeBadge} style={MODE_STYLE[item.mode] ?? MODE_STYLE['en-en']}>
              {item.mode}
            </span>
            <button
              className={styles.remove}
              onClick={(e) => { e.stopPropagation(); handleRemove(item.word) }}
              aria-label={`Remove ${item.word}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
