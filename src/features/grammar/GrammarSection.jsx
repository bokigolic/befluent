import { memo } from 'react'
import useStore from '../../store/useStore'
import styles from './GrammarSection.module.css'

const CATEGORIES = [
  {
    id: 'tenses',
    emoji: '⏰',
    title: 'Tenses',
    subtitle: 'Past, Present & Future',
    lessons: 12,
    color: '#7c6fff',
    difficulty: 'A1-C1',
  },
  {
    id: 'articles',
    emoji: '📝',
    title: 'Articles',
    subtitle: 'a, an, the — when to use',
    lessons: 6,
    color: '#00e5a0',
    difficulty: 'A1-B1',
  },
  {
    id: 'prepositions',
    emoji: '📍',
    title: 'Prepositions',
    subtitle: 'in, on, at, by, with...',
    lessons: 8,
    color: '#ff6b9d',
    difficulty: 'A1-B2',
  },
  {
    id: 'conditionals',
    emoji: '🔀',
    title: 'Conditionals',
    subtitle: 'If clauses & conditions',
    lessons: 5,
    color: '#ffa94d',
    difficulty: 'B1-C1',
  },
  {
    id: 'modal-verbs',
    emoji: '⚡',
    title: 'Modal Verbs',
    subtitle: 'can, could, should, must...',
    lessons: 7,
    color: '#38bdf8',
    difficulty: 'A2-B2',
  },
  {
    id: 'passive-voice',
    emoji: '🔄',
    title: 'Passive Voice',
    subtitle: 'Active vs Passive forms',
    lessons: 5,
    color: '#a78bfa',
    difficulty: 'B1-C1',
  },
]

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function CategoryCard({ cat, progress, onClick }) {
  return (
    <button
      className={styles.card}
      style={{ borderLeftColor: cat.color }}
      onClick={() => onClick(cat.id)}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardEmoji}>{cat.emoji}</span>
        <span
          className={styles.badge}
          style={{
            background: hexToRgba(cat.color, 0.15),
            color: cat.color,
          }}
        >
          {cat.difficulty}
        </span>
      </div>

      <div className={styles.cardTitle}>{cat.title}</div>
      <div className={styles.cardSub}>{cat.subtitle}</div>

      <div className={styles.cardBottom}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%`, background: cat.color }}
          />
        </div>
        <span className={styles.lessonCount}>{cat.lessons} lessons</span>
      </div>
    </button>
  )
}

function GrammarSection({ onSeeAll, standalone = false }) {
  const grammarProgress          = useStore(s => s.grammarProgress)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)

  return (
    <div className={standalone ? styles.standalonePage : styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>{standalone ? '📖 Grammar Practice' : 'Grammar'}</div>
          <div className={styles.subtitle}>Master English grammar step by step</div>
        </div>
        {onSeeAll && <button className={styles.seeAll} onClick={onSeeAll}>See all →</button>}
      </div>

      <div className={styles.grid}>
        {CATEGORIES.map(cat => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            progress={grammarProgress[cat.id] ?? 0}
            onClick={setActiveGrammarCategory}
          />
        ))}
      </div>
    </div>
  )
}

export { CATEGORIES }
export default memo(GrammarSection)
