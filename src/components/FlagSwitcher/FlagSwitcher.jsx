import { memo } from 'react'
import useStore from '../../store/useStore'
import styles from './FlagSwitcher.module.css'

const MODES = [
  { id: 'en-sr', label: 'EN → SR', title: 'English to Serbian' },
  { id: 'sr-en', label: 'SR → EN', title: 'Serbian to English' },
  { id: 'en-en', label: 'EN → EN', title: 'English definitions' },
]

function FlagSwitcher() {
  const dictMode    = useStore(s => s.dictMode)
  const setDictMode = useStore(s => s.setDictMode)

  const handleSwap = () => {
    if (dictMode === 'en-sr') setDictMode('sr-en')
    else if (dictMode === 'sr-en') setDictMode('en-sr')
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabGroup}>
        {MODES.map(m => (
          <button
            key={m.id}
            className={`${styles.modeTab} ${dictMode === m.id ? styles.modeTabActive : ''}`}
            onClick={() => setDictMode(m.id)}
            title={m.title}
          >
            {m.label}
          </button>
        ))}
      </div>
      {(dictMode === 'en-sr' || dictMode === 'sr-en') && (
        <button
          className={styles.swap}
          onClick={handleSwap}
          title="Swap direction"
          aria-label="Swap language direction"
        >
          ⇄
        </button>
      )}
    </div>
  )
}

export default memo(FlagSwitcher)
