import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './CoursePath.module.css'

export const COURSE_LEVELS = [
  {
    level: 1, name: 'Foundations',
    nodes: [
      { id: 1, icon: '📝', title: 'Present Simple', subtitle: 'Grammar', type: 'grammar', ref: 'tenses' },
      { id: 2, icon: '⚡', title: 'Common Verbs', subtitle: 'Top 30 irregular', type: 'verbs', ref: 'irregular' },
      { id: 3, icon: '📖', title: 'Articles', subtitle: 'a / an / the', type: 'grammar', ref: 'articles' },
      { id: 4, icon: '🗂️', title: 'Basic Vocabulary', subtitle: 'Everyday topics', type: 'topics', ref: 'everyday' },
    ],
  },
  {
    level: 2, name: 'Building Up',
    nodes: [
      { id: 5, icon: '⏰', title: 'Past Simple', subtitle: 'Grammar', type: 'grammar', ref: 'tenses' },
      { id: 6, icon: '🔄', title: 'Present Continuous', subtitle: 'Grammar', type: 'grammar', ref: 'tenses' },
      { id: 7, icon: '💬', title: 'Common Idioms', subtitle: 'Body & Animal', type: 'idioms', ref: 'body' },
      { id: 8, icon: '✈️', title: 'Travel Vocabulary', subtitle: 'Topics', type: 'topics', ref: 'travel' },
    ],
  },
  {
    level: 3, name: 'Intermediate',
    nodes: [
      { id: 9,  icon: '✅', title: 'Present Perfect', subtitle: 'Grammar', type: 'grammar', ref: 'tenses' },
      { id: 10, icon: '🎭', title: 'Modal Verbs', subtitle: 'Grammar', type: 'grammar', ref: 'modal-verbs' },
      { id: 11, icon: '📰', title: 'News Reading A2', subtitle: '3 articles', type: 'news', ref: 'A2' },
      { id: 12, icon: '🔗', title: 'Phrasal Verbs Pt.1', subtitle: 'Movement & General', type: 'verbs', ref: 'phrasal' },
    ],
  },
  {
    level: 4, name: 'Upper Intermediate',
    nodes: [
      { id: 13, icon: '⚡', title: 'Conditionals', subtitle: 'Grammar', type: 'grammar', ref: 'conditionals' },
      { id: 14, icon: '🔄', title: 'Passive Voice', subtitle: 'Grammar', type: 'grammar', ref: 'passive-voice' },
      { id: 15, icon: '💼', title: 'Business Vocabulary', subtitle: 'Topics', type: 'topics', ref: 'business' },
      { id: 16, icon: '📰', title: 'News Reading B1', subtitle: '3 articles', type: 'news', ref: 'B1' },
    ],
  },
  {
    level: 5, name: 'Advanced',
    nodes: [
      { id: 17, icon: '💬', title: 'Reported Speech', subtitle: 'Grammar', type: 'grammar', ref: 'reported-speech' },
      { id: 18, icon: '🔗', title: 'Relative Clauses', subtitle: 'Grammar', type: 'grammar', ref: 'relative-clauses' },
      { id: 19, icon: '🌟', title: 'Advanced Idioms', subtitle: 'B2 level', type: 'idioms', ref: 'business' },
      { id: 20, icon: '✍️', title: 'Writing Practice', subtitle: '3 exercises', type: 'writing', ref: null },
    ],
  },
]

const ALL_NODES = COURSE_LEVELS.flatMap(l => l.nodes)

function levelStars(levelNodes, pathProgress) {
  const done  = levelNodes.filter(n => pathProgress[n.id]?.completed)
  const total = levelNodes.length
  if (done.length === 0) return 0
  const pct = done.length / total
  if (pct >= 1)   return 3
  if (pct >= 0.5) return 2
  return 1
}

function Stars({ count }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3].map(i => (
        <span key={i} className={i <= count ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </span>
  )
}

function PathNode({ node, status, onClick }) {
  return (
    <div className={`${styles.nodeWrap} ${status === 'active' ? styles.nodeWrapActive : ''}`}>
      <button
        className={`${styles.node} ${styles['node_' + status]}`}
        onClick={() => onClick(node, status)}
        aria-label={node.title}
      >
        {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : node.icon}
      </button>
      <div className={styles.nodeLabel}>
        <div className={styles.nodeTitle}>{node.title}</div>
        <div className={styles.nodeSub}>{node.subtitle}</div>
      </div>
    </div>
  )
}

function LevelSeparator({ level, stars }) {
  return (
    <div className={styles.levelSep}>
      <div className={styles.levelLine} />
      <div className={styles.levelBadge}>
        <span className={styles.levelNum}>Level {level.level}</span>
        <span className={styles.levelName}>{level.name}</span>
        <Stars count={stars} />
      </div>
      <div className={styles.levelLine} />
    </div>
  )
}

function ToastLocked({ onDismiss }) {
  return (
    <div className={styles.toast} onClick={onDismiss}>
      🔒 Complete previous lessons first
    </div>
  )
}

function CoursePath({ onNodeOpen }) {
  const pathProgress  = useStore(s => s.pathProgress)
  const userLevel     = useStore(s => s.userLevel)
  const [lockedToast, setLockedToast] = useState(null)

  const startNodeId = (() => {
    if (userLevel === 'intermediate') return 9
    if (userLevel === 'advanced')     return 13
    if (userLevel === 'elementary')   return 5
    return 1
  })()

  const getStatus = (nodeId) => {
    if (pathProgress[nodeId]?.completed) return 'completed'
    // Node is unlocked if it's the first uncompleted after all previous done OR at start
    const allNodes = ALL_NODES
    const idx = allNodes.findIndex(n => n.id === nodeId)
    if (idx === 0 || nodeId === startNodeId) return 'active'
    const prev = allNodes[idx - 1]
    if (!prev) return 'active'
    if (pathProgress[prev.id]?.completed) return 'active'
    // Also unlock node if previous node is at start (first in path)
    if (prev.id < startNodeId) return 'active'
    return 'locked'
  }

  const handleNodeClick = (node, status) => {
    if (status === 'locked') {
      setLockedToast(node.id)
      setTimeout(() => setLockedToast(null), 2500)
      return
    }
    onNodeOpen?.(node)
  }

  return (
    <div className={styles.path}>
      {lockedToast && <ToastLocked onDismiss={() => setLockedToast(null)} />}
      {COURSE_LEVELS.map((lvl, li) => {
        const stars = levelStars(lvl.nodes, pathProgress)
        return (
          <div key={lvl.level} className={styles.levelGroup}>
            <LevelSeparator level={lvl} stars={stars} />
            <div className={styles.nodes}>
              {lvl.nodes.map((node, ni) => {
                const status = getStatus(node.id)
                const isLast = ni === lvl.nodes.length - 1
                return (
                  <div key={node.id} className={styles.nodeRow}>
                    {ni % 2 === 0 && <div className={styles.nodeOffset} />}
                    <PathNode node={node} status={status} onClick={handleNodeClick} />
                    {!isLast && <div className={`${styles.connector} ${status === 'completed' ? styles.connectorDone : ''}`} />}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(CoursePath)
