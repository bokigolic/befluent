import { useState } from 'react'
import useStore from '../../store/useStore'
import styles from './LandingScreen.module.css'

const LEVEL_OPTIONS = [
  { id: 'beginner',     emoji: '🌱', label: 'Beginner',      sub: 'A1–A2',  color: '#10d9a0', bg: 'rgba(16,217,160,0.08)' },
  { id: 'intermediate', emoji: '⭐', label: 'Intermediate',  sub: 'B1–B2',  color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { id: 'advanced',     emoji: '🎯', label: 'Advanced',      sub: 'B2–C1',  color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
]

const FEATURE_PILLS = ['📖 400K+ words', '📚 81 grammar lessons', '🗣️ AI conversations']

export default function LandingScreen({ onDone }) {
  const [selected, setSelected] = useState(null)
  const [exiting,  setExiting]  = useState(false)
  const setUserLevel = useStore(s => s.setUserLevel)

  const handleStart = () => {
    if (!selected) return
    setUserLevel(selected)
    localStorage.setItem('bf_onboarded', '1')
    setExiting(true)
    setTimeout(onDone, 420)
  }

  return (
    <div className={`${styles.screen} ${exiting ? styles.exit : ''}`}>
      <div className={styles.inner}>

        <div className={styles.logo}>
          <svg width="64" height="64" viewBox="0 0 28 28">
            <defs>
              <linearGradient id="lgLand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect width="28" height="28" rx="8" fill="url(#lgLand)" />
            <text x="14" y="20" textAnchor="middle" fill="white" fontSize="14"
              fontWeight="800" fontFamily="Space Grotesk, sans-serif">BF</text>
          </svg>
        </div>

        <h1 className={styles.headline}>Learn English<br />the smart way</h1>

        <p className={styles.sub}>
          Dictionary, grammar, AI conversations and more —<br />
          designed for Serbian speakers.
        </p>

        <div className={styles.pillsRow}>
          {FEATURE_PILLS.map(p => (
            <div key={p} className={styles.pill}>{p}</div>
          ))}
        </div>

        <div className={styles.levelLabel}>Choose your level to get started:</div>

        <div className={styles.levels}>
          {LEVEL_OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={`${styles.levelCard} ${selected === opt.id ? styles.levelCardSelected : ''}`}
              style={selected === opt.id ? { borderColor: opt.color, background: opt.bg } : {}}
              onClick={() => setSelected(opt.id)}
            >
              <div className={styles.levelEmoji}>{opt.emoji}</div>
              <div className={styles.levelTitle}>{opt.label}</div>
              <div className={styles.levelSub}>{opt.sub}</div>
            </button>
          ))}
        </div>

        <button
          className={styles.cta}
          disabled={!selected}
          onClick={handleStart}
        >
          Start Learning →
        </button>

        <p className={styles.note}>No account needed · Works offline · Free to use</p>
      </div>
    </div>
  )
}
