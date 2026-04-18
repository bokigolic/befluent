import { memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from './GrammarSection'
import styles from './GrammarDetailPage.module.css'

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonCircle} />
      <div className={styles.skeletonLines}>
        <div className={styles.skeletonLine} style={{ width: '60%' }} />
        <div className={styles.skeletonLine} style={{ width: '40%' }} />
      </div>
    </div>
  )
}

function GrammarDetailPage() {
  const activeGrammarCategory    = useStore(s => s.activeGrammarCategory)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)
  const grammarProgress          = useStore(s => s.grammarProgress)

  const cat = CATEGORIES.find(c => c.id === activeGrammarCategory)
  if (!cat) return null

  const progress = grammarProgress[cat.id] ?? 0

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => setActiveGrammarCategory(null)}>
          ← Back
        </button>
        <div className={styles.headerMeta}>
          <span className={styles.headerEmoji}>{cat.emoji}</span>
          <span className={styles.headerTitle}>{cat.title}</span>
        </div>
        <span
          className={styles.progressPill}
          style={{ background: `${cat.color}22`, color: cat.color }}
        >
          {progress}% complete
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.comingSoon}>Lessons coming soon...</div>

        <div className={styles.lessonList}>
          {[0, 1, 2, 3].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(GrammarDetailPage)
