import { useState, useMemo, memo, useCallback } from 'react'
import { IRREGULAR_VERBS, PHRASAL_VERBS, VERB_LEVELS, PHRASAL_CATEGORIES } from './verbsData'
import useStore from '../../store/useStore'
import styles from './VerbsPage.module.css'

// ── Irregular Verbs ──────────────────────────────────────────────────────────

function VerbListItem({ verb, expanded, onToggle }) {
  const addToReview = useStore(s => s.addToReview)
  return (
    <div className={`${styles.verbListItem} ${expanded ? styles.verbListItemOpen : ''}`}>
      <div className={styles.verbItemMain} onClick={onToggle}>
        <div className={styles.verbItemHeader}>
          <span className={`${styles.levelBadge} ${styles['level' + verb.level]}`}>{verb.level}</span>
        </div>
        <div className={styles.verbFormsRow}>
          <span className={styles.verbFormBase}>{verb.base}</span>
          <span className={styles.verbArrow}>→</span>
          <span className={styles.verbFormPast}>{verb.past}</span>
          <span className={styles.verbArrow}>→</span>
          <span className={styles.verbFormParticiple}>{verb.participle}</span>
        </div>
        <div className={styles.verbSerbianRow}>
          <span>🇷🇸</span>
          <span className={styles.verbSerbianText}>{verb.serbian}</span>
        </div>
      </div>
      {expanded && (
        <div className={styles.verbItemExamples}>
          <div className={styles.exLine}><span className={styles.exLabel}>Present:</span> {verb.example}</div>
          <div className={styles.exLine}><span className={styles.exLabel}>Past:</span> {verb.pastExample}</div>
          <div className={styles.exLine}><span className={styles.exLabel}>Perfect:</span> {verb.participleExample}</div>
          <button
            className={styles.addReviewBtn}
            onClick={e => { e.stopPropagation(); addToReview(verb.base, verb.serbian, 'vocabulary') }}
          >
            + Add to Review
          </button>
        </div>
      )}
    </div>
  )
}

function VerbCard({ verb }) {
  const [flipped, setFlipped] = useState(false)
  const addToReview = useStore(s => s.addToReview)
  return (
    <div className={styles.verbCard} onClick={() => setFlipped(f => !f)}>
      <div className={`${styles.verbCardInner} ${flipped ? styles.verbCardFlipped : ''}`}>
        <div className={styles.verbCardFront}>
          <span className={`${styles.levelBadge} ${styles['level' + verb.level]}`}>{verb.level}</span>
          <div className={styles.verbBase}>{verb.base}</div>
          <div className={styles.verbForms}>{verb.past} · {verb.participle}</div>
          <div className={styles.verbSerbian}>{verb.serbian}</div>
        </div>
        <div className={styles.verbCardBack}>
          <div className={styles.exLine}><span className={styles.exLabel}>Present:</span> {verb.example}</div>
          <div className={styles.exLine}><span className={styles.exLabel}>Past:</span> {verb.pastExample}</div>
          <div className={styles.exLine}><span className={styles.exLabel}>Perfect:</span> {verb.participleExample}</div>
          <button
            className={styles.addReviewBtn}
            onClick={e => { e.stopPropagation(); addToReview(verb.base, verb.serbian, 'vocabulary') }}
          >
            + Review
          </button>
        </div>
      </div>
    </div>
  )
}

function IrregularVerbsTab() {
  const [search, setSearch]         = useState('')
  const [levelFilter, setLevel]     = useState('All')
  const [view, setView]             = useState('table')
  const [expandedRow, setExpanded]  = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return IRREGULAR_VERBS.filter(v => {
      if (levelFilter !== 'All' && v.level !== levelFilter) return false
      if (!q) return true
      return v.base.includes(q) || v.past.includes(q) || v.participle.includes(q) || v.serbian.toLowerCase().includes(q)
    })
  }, [search, levelFilter])

  return (
    <div className={styles.tabContent}>
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search base, past, participle…"
        />
        <div className={styles.pills}>
          {['All', ...VERB_LEVELS].map(l => (
            <button
              key={l}
              className={`${styles.pill} ${levelFilter === l ? styles.pillActive : ''}`}
              onClick={() => setLevel(l)}
            >{l}</button>
          ))}
        </div>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'table' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('table')}
          >⊞ Table</button>
          <button
            className={`${styles.viewBtn} ${view === 'card' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('card')}
          >⊡ Cards</button>
        </div>
      </div>

      <div className={styles.count}>{filtered.length} verbs</div>

      {view === 'table' ? (
        <div className={styles.verbList}>
          {filtered.map(v => (
            <VerbListItem
              key={v.base}
              verb={v}
              expanded={expandedRow === v.base}
              onToggle={() => setExpanded(x => x === v.base ? null : v.base)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {filtered.map(v => <VerbCard key={v.base} verb={v} />)}
        </div>
      )}
    </div>
  )
}

// ── Phrasal Verbs ────────────────────────────────────────────────────────────

function PhrasalCard({ verb }) {
  const [open, setOpen] = useState(false)
  const addToReview     = useStore(s => s.addToReview)
  return (
    <div className={`${styles.phrasalCard} ${open ? styles.phrasalCardOpen : ''}`} onClick={() => setOpen(o => !o)}>
      <div className={styles.phrasalTop}>
        <div>
          <span className={styles.phrasalVerb}>{verb.verb}</span>
          <span className={styles.phrasalMeaning}>{verb.meaning}</span>
        </div>
        <div className={styles.phrasalBadges}>
          <span className={`${styles.levelBadge} ${styles['level' + verb.level]}`}>{verb.level}</span>
          {verb.separable && <span className={styles.sepBadge}>separable</span>}
          <span className={styles.catBadge}>{verb.category}</span>
        </div>
      </div>
      {open && (
        <div className={styles.phrasalDetails}>
          <div className={styles.phrasalSerbian}>{verb.serbian}</div>
          <div className={styles.phrasalExample}>"{verb.example}"</div>
          <button
            className={styles.addReviewBtn}
            onClick={e => { e.stopPropagation(); addToReview(verb.verb, verb.serbian, 'vocabulary') }}
          >
            + Add to Review
          </button>
        </div>
      )}
    </div>
  )
}

function PhrasalVerbsTab() {
  const [search, setSearch]         = useState('')
  const [catFilter, setCat]         = useState('all')
  const [sepFilter, setSep]         = useState('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return PHRASAL_VERBS.filter(v => {
      if (catFilter !== 'all' && v.category !== catFilter) return false
      if (sepFilter === 'sep' && !v.separable)    return false
      if (sepFilter === 'insep' && v.separable)   return false
      if (!q) return true
      return v.verb.includes(q) || v.meaning.toLowerCase().includes(q) || v.serbian.toLowerCase().includes(q)
    })
  }, [search, catFilter, sepFilter])

  return (
    <div className={styles.tabContent}>
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search verb or meaning…"
        />
        <div className={styles.pills}>
          <button
            className={`${styles.pill} ${catFilter === 'all' ? styles.pillActive : ''}`}
            onClick={() => setCat('all')}
          >All</button>
          {PHRASAL_CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.pill} ${catFilter === c ? styles.pillActive : ''}`}
              onClick={() => setCat(c)}
            >{c}</button>
          ))}
        </div>
        <div className={styles.pills}>
          {[['all','All types'],['sep','Separable'],['insep','Inseparable']].map(([v,l]) => (
            <button
              key={v}
              className={`${styles.pill} ${sepFilter === v ? styles.pillActive : ''}`}
              onClick={() => setSep(v)}
            >{l}</button>
          ))}
        </div>
      </div>

      <div className={styles.count}>{filtered.length} phrasal verbs</div>

      <div className={styles.phrasalList}>
        {filtered.map(v => <PhrasalCard key={v.verb} verb={v} />)}
      </div>
    </div>
  )
}

// ── Main VerbsPage ────────────────────────────────────────────────────────────

function VerbsPage({ onBack }) {
  const [tab, setTab] = useState('irregular')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack}>← Learn</button>
        )}
        <h1 className={styles.title}>⚡ Verbs</h1>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${tab === 'irregular' ? styles.tabActive : ''}`}
          onClick={() => setTab('irregular')}
        >Irregular Verbs ({IRREGULAR_VERBS.length})</button>
        <button
          className={`${styles.tabBtn} ${tab === 'phrasal' ? styles.tabActive : ''}`}
          onClick={() => setTab('phrasal')}
        >Phrasal Verbs ({PHRASAL_VERBS.length})</button>
      </div>

      {tab === 'irregular' ? <IrregularVerbsTab /> : <PhrasalVerbsTab />}
    </div>
  )
}

export default memo(VerbsPage)
