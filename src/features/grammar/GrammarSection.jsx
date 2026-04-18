import { useState, useMemo, memo } from 'react'
import useStore from '../../store/useStore'
import { GRAMMAR_DATA } from './grammarData'
import styles from './GrammarSection.module.css'

const CATEGORIES = [
  { id: 'tenses',             emoji: '⏰', title: 'Tenses',              subtitle: 'Past, Present & Future',         lessons: 15, color: '#7c6fff', difficulty: 'A1-C1' },
  { id: 'articles',           emoji: '📝', title: 'Articles',            subtitle: 'a, an, the — when to use',       lessons: 6,  color: '#00e5a0', difficulty: 'A1-B1' },
  { id: 'prepositions',       emoji: '📍', title: 'Prepositions',        subtitle: 'in, on, at, by, with...',        lessons: 8,  color: '#ff6b9d', difficulty: 'A1-B2' },
  { id: 'conditionals',       emoji: '🔀', title: 'Conditionals',        subtitle: 'If clauses & conditions',        lessons: 7,  color: '#ffa94d', difficulty: 'B1-C1' },
  { id: 'modal-verbs',        emoji: '⚡', title: 'Modal Verbs',         subtitle: 'can, could, should, must...',    lessons: 7,  color: '#38bdf8', difficulty: 'A2-B2' },
  { id: 'passive-voice',      emoji: '🔄', title: 'Passive Voice',       subtitle: 'Active vs Passive forms',        lessons: 5,  color: '#a78bfa', difficulty: 'B1-C1' },
  { id: 'reported-speech',    emoji: '💬', title: 'Reported Speech',     subtitle: 'Say what others said',           lessons: 7,  color: '#38bdf8', difficulty: 'B1-C1' },
  { id: 'relative-clauses',   emoji: '🔗', title: 'Relative Clauses',   subtitle: 'who, which, that, whose...',     lessons: 6,  color: '#c084fc', difficulty: 'B1-C1' },
  { id: 'gerunds-infinitives',emoji: '⚙️', title: 'Gerunds & Infinitives',subtitle: 'doing vs to do',              lessons: 7,  color: '#f472b6', difficulty: 'B1-C1' },
  { id: 'conjunctions',       emoji: '🔀', title: 'Conjunctions',        subtitle: 'although, however, despite...', lessons: 6,  color: '#34d399', difficulty: 'B1-C1' },
  { id: 'word-formation',     emoji: '🔤', title: 'Word Formation',      subtitle: 'prefixes, suffixes, derivatives',lessons: 7,  color: '#fb923c', difficulty: 'B2-C1' },
]

const DIFF_COLORS = {
  'A1-B1': 'var(--acc-g)',
  'A1-B2': 'var(--acc-g)',
  'A1-C1': 'var(--acc)',
  'A2-B2': 'var(--acc-a)',
  'B1-C1': 'var(--acc-a)',
  'B2-C1': 'var(--acc-p)',
}

const DIFF_FILTERS = ['All', 'A1-B1', 'B1-C1', 'B2-C1']

function matchesDiff(catDiff, filter) {
  if (filter === 'All') return true
  if (filter === 'A1-B1') return catDiff === 'A1-B1' || catDiff === 'A1-B2' || catDiff === 'A1-C1'
  if (filter === 'B1-C1') return catDiff === 'B1-C1' || catDiff === 'A2-B2'
  if (filter === 'B2-C1') return catDiff === 'B2-C1'
  return false
}

function remainingMins(catId, completedLessons) {
  const lessons = GRAMMAR_DATA[catId]?.lessons ?? []
  return lessons
    .filter(l => !completedLessons.includes(l.id))
    .reduce((sum, l) => sum + (parseInt(l.duration) || 0), 0)
}

function formatRemaining(mins) {
  if (mins === 0) return 'Done! ✓'
  if (mins < 60) return `~${mins} min left`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `~${h}h ${m}m left` : `~${h}h left`
}

function daysAgo(isoStr) {
  if (!isoStr) return 'Not started'
  const d = Math.floor((Date.now() - new Date(isoStr)) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  return `${d} days ago`
}

function CategoryCard({ cat, progress, completedLessons, lastStudied, onClick }) {
  const borderColor = DIFF_COLORS[cat.difficulty] ?? 'var(--acc)'
  const remMins = remainingMins(cat.id, completedLessons)
  const remColor = remMins === 0 ? 'var(--acc-g)' : remMins < 30 ? 'var(--acc-g)' : remMins < 120 ? 'var(--acc-a)' : '#ff6b9d'

  return (
    <button
      className={styles.card}
      style={{ borderLeftColor: borderColor }}
      onClick={() => onClick(cat.id)}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardEmoji}>{cat.emoji}</span>
        <span
          className={styles.badge}
          style={{ background: `${borderColor}22`, color: borderColor }}
        >
          {cat.difficulty}
        </span>
      </div>

      <div className={styles.cardTitle}>{cat.title}</div>
      <div className={styles.cardSub}>{cat.subtitle}</div>

      <div className={styles.cardBottom}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%`, background: cat.color }} />
        </div>
        <span className={styles.lessonCount}>{cat.lessons} lessons</span>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.lastStudied}>{daysAgo(lastStudied[cat.id])}</span>
        <span className={styles.timeLeft} style={{ color: remColor }}>{formatRemaining(remMins)}</span>
      </div>
    </button>
  )
}

function GrammarSection({ onSeeAll, standalone = false }) {
  const grammarProgress          = useStore(s => s.grammarProgress)
  const completedLessons         = useStore(s => s.completedLessons)
  const lastStudied              = useStore(s => s.lastStudied)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)

  const [search,     setSearch]     = useState('')
  const [diffFilter, setDiffFilter] = useState('All')

  const totalLessons = useMemo(() =>
    CATEGORIES.reduce((s, c) => s + (GRAMMAR_DATA[c.id]?.lessons?.length ?? c.lessons), 0),
  [])

  const completedCount = useMemo(() => {
    const allIds = CATEGORIES.flatMap(c => GRAMMAR_DATA[c.id]?.lessons?.map(l => l.id) ?? [])
    return allIds.filter(id => completedLessons.includes(id)).length
  }, [completedLessons])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return CATEGORIES.filter(c => {
      if (!matchesDiff(c.difficulty, diffFilter)) return false
      if (!q) return true
      if (c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)) return true
      const lessons = GRAMMAR_DATA[c.id]?.lessons ?? []
      return lessons.some(l => l.title.toLowerCase().includes(q))
    })
  }, [search, diffFilter])

  return (
    <div className={standalone ? styles.standalonePage : styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <div className={styles.title}>{standalone ? '📖 Grammar Practice' : 'Grammar'}</div>
            {standalone && (
              <span className={styles.totalBadge}>{totalLessons} lessons</span>
            )}
          </div>
          <div className={styles.subtitle}>Master English grammar step by step</div>
          {standalone && (
            <div className={styles.progressSummary}>
              {completedCount} of {totalLessons} lessons completed
            </div>
          )}
        </div>
        {onSeeAll && <button className={styles.seeAll} onClick={onSeeAll}>See all →</button>}
      </div>

      {standalone && (
        <>
          <input
            className={styles.searchBar}
            placeholder="🔍 Search lessons..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className={styles.filterRow}>
            {DIFF_FILTERS.map(d => (
              <button
                key={d}
                className={`${styles.filterPill} ${diffFilter === d ? styles.filterPillActive : ''}`}
                onClick={() => setDiffFilter(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </>
      )}

      <div className={styles.grid}>
        {filtered.map(cat => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            progress={grammarProgress[cat.id] ?? 0}
            completedLessons={completedLessons}
            lastStudied={lastStudied ?? {}}
            onClick={setActiveGrammarCategory}
          />
        ))}
      </div>

      {standalone && filtered.length === 0 && (
        <div className={styles.emptySearch}>No categories match "{search}"</div>
      )}
    </div>
  )
}

export { CATEGORIES }
export default memo(GrammarSection)
