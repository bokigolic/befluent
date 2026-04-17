import useStore from '../../store/useStore'
import styles from './FlagSwitcher.module.css'

function USFlag() {
  return (
    <div className={styles.flag}>
      <div className={styles.canton} />
    </div>
  )
}

function SRFlag() {
  return (
    <div className={styles.flagSr}>
      <span className={styles.eagle}>🦅</span>
    </div>
  )
}

const LABELS = {
  'en-en': ['English', 'English'],
  'en-sr': ['English', 'Serbian'],
  'sr-en': ['Serbian', 'English'],
}

export default function FlagSwitcher() {
  const dictMode = useStore((s) => s.dictMode)
  const setDictMode = useStore((s) => s.setDictMode)

  const [leftLabel, rightLabel] = LABELS[dictMode]
  const leftIsSr = dictMode === 'sr-en'
  const rightIsSr = dictMode === 'en-sr'

  const handleSwap = () => {
    if (dictMode === 'en-sr') setDictMode('sr-en')
    else if (dictMode === 'sr-en') setDictMode('en-sr')
  }

  const handleLeftClick = () => {
    // clicking left: toggle SR on left side
    if (leftIsSr) setDictMode('en-en')
    else setDictMode('sr-en')
  }

  const handleRightClick = () => {
    // clicking right: toggle SR on right side
    if (rightIsSr) setDictMode('en-en')
    else setDictMode('en-sr')
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.side} ${!leftIsSr ? styles.sideActive : ''}`}
        onClick={handleLeftClick}
      >
        <div className={leftIsSr ? styles.flagWrapSr : styles.flagWrap}>
          {leftIsSr ? <SRFlag /> : <USFlag />}
        </div>
        <span className={`${styles.label} ${!leftIsSr ? styles.labelActive : ''}`}>
          {leftLabel}
        </span>
      </button>

      <button
        className={styles.swap}
        onClick={handleSwap}
        title="Swap languages"
        aria-label="Swap languages"
      >
        ⇄
      </button>

      <button
        className={`${styles.side} ${!rightIsSr ? styles.sideActive : ''}`}
        onClick={handleRightClick}
      >
        <div className={rightIsSr ? styles.flagWrapSr : styles.flagWrap}>
          {rightIsSr ? <SRFlag /> : <USFlag />}
        </div>
        <span className={`${styles.label} ${!rightIsSr ? styles.labelActive : ''}`}>
          {rightLabel}
        </span>
      </button>
    </div>
  )
}
