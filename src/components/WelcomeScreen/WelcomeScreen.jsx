import { useMemo } from 'react'
import styles from './WelcomeScreen.module.css'

const WORD_POOL = [
  'serendipity','ephemeral','melancholy','resilient','eloquent',
  'ambiguous','candid','diligent','empathy','frugal',
  'gratitude','humble','integrity','jovial','meticulous',
  'nuance','profound','tenacious','whimsical','zealous',
  'aberrant','benevolent','cogent','dexterous','exuberant',
]

const STATS = [
  { value: '400K+', label: 'English words' },
  { value: '2',     label: 'Languages' },
  { value: 'Free',  label: 'Always' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function WelcomeScreen({ onSearch }) {
  const words = useMemo(() => shuffle(WORD_POOL).slice(0, 5), [])

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h2 className={styles.greeting}>What will you learn today?</h2>
        <p className={styles.sub}>Search any English word or tap a suggestion below</p>
      </div>

      <div className={styles.suggestLabel}>✨ Try these words</div>
      <div className={styles.pills}>
        {words.map((w, i) => (
          <button
            key={w}
            className={styles.pill}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => onSearch(w)}
          >
            {w}
          </button>
        ))}
      </div>

      <div className={styles.stats}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={styles.statCard}
            style={{ animationDelay: `${100 + i * 60}ms` }}
          >
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
