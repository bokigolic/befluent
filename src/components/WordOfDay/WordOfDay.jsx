import { memo } from 'react'
import useStore from '../../store/useStore'
import styles from './WordOfDay.module.css'

const WOTD_POOL = [
  'serendipity','ephemeral','melancholy','resilient','eloquent',
  'ambiguous','candid','diligent','empathy','frugal',
  'gratitude','humble','integrity','jovial','meticulous',
  'nuance','profound','tenacious','whimsical','zealous',
  'aberrant','benevolent','cogent','dexterous','exuberant',
  'fastidious','gregarious','haughty','indolent','judicious',
  'kinetic','laconic','magnanimous','nonchalant','oblivious',
  'pragmatic','quixotic','reticent','stoic','trepidation',
  'ubiquitous','verbose','wistful','ardent','blithe',
  'capricious','diffident','enigmatic','fervent','garrulous',
  'hapless','insouciant','labyrinthine','maudlin','nebulous',
  'opulent','perspicacious','querulous','sanguine','taciturn',
]

const getWordOfDay = () => {
  const dayIdx = Math.floor(Date.now() / 86400000)
  return WOTD_POOL[dayIdx % WOTD_POOL.length]
}

function WordOfDay({ onSearch }) {
  const word        = getWordOfDay()
  const savedWords  = useStore(s => s.savedWords)
  const toggleSaved = useStore(s => s.toggleSaved)
  const addXP       = useStore(s => s.addXP)
  const isSaved     = savedWords.includes(word)

  const handleSave = (e) => {
    e.stopPropagation()
    toggleSaved(word)
    if (!isSaved) addXP(2)
  }

  return (
    <div className={styles.card} onClick={() => onSearch(word)} role="button" tabIndex={0}>
      <div className={styles.label}>✨ Word of the day</div>
      <div className={styles.word}>{word}</div>
      <div className={styles.hint}>Tap to explore →</div>
      <button
        className={`${styles.save} ${isSaved ? styles.saveDone : ''}`}
        onClick={handleSave}
        aria-label={isSaved ? 'Saved' : 'Save word'}
      >
        {isSaved ? '🔖 Saved' : '+ Save'}
      </button>
    </div>
  )
}

export default memo(WordOfDay)
