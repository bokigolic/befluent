import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './SavedPage.module.css'

function SavedPage({ onWordClick, onPractice }) {
  const savedWords  = useStore(s => s.savedWords)
  const toggleSaved = useStore(s => s.toggleSaved)
  const [removing, setRemoving] = useState(new Set())

  const handleRemove = (word) => {
    setRemoving(prev => new Set([...prev, word]))
    setTimeout(() => {
      toggleSaved(word)
      setRemoving(prev => { const n = new Set(prev); n.delete(word); return n })
    }, 200)
  }

  if (savedWords.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyBookmark}>
          <div className={styles.bookmarkShape} />
        </div>
        <p className={styles.emptyTitle}>Save words to build your collection</p>
        <p className={styles.emptySub}>Tap the bookmark icon on any word to save it here</p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.label}>Saved words</span>
        <span className={styles.count}>{savedWords.length} word{savedWords.length !== 1 ? 's' : ''}</span>
        <button className={styles.practiceBtn} onClick={onPractice}>
          🎮 Practice
        </button>
      </div>
      <div className={styles.grid}>
        {savedWords.map((word, i) => (
          <div
            key={word}
            className={`${styles.pill} ${removing.has(word) ? styles.pillRemoving : ''}`}
            style={{ animationDelay: `${i * 30}ms` }}
            onClick={() => !removing.has(word) && onWordClick(word)}
          >
            <span className={styles.bookmark}>🔖</span>
            <span className={styles.word}>{word}</span>
            <button
              className={styles.remove}
              onClick={e => { e.stopPropagation(); handleRemove(word) }}
              aria-label={`Remove ${word}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(SavedPage)
