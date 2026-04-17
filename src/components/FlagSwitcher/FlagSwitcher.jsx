import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import styles from './FlagSwitcher.module.css'

function USFlag() {
  return <span className={styles.langCode}>ENG</span>
}

function SRFlag() {
  return <span className={styles.langCode}>SR</span>
}

const LABELS = {
  'en-en': ['English', 'English'],
  'en-sr': ['English', 'Serbian'],
  'sr-en': ['Serbian', 'English'],
}

function FlagSwitcher() {
  const dictMode = useStore((s) => s.dictMode)
  const setDictMode = useStore((s) => s.setDictMode)
  const [swapRotation, setSwapRotation] = useState(0)
  const [swapping, setSwapping] = useState(false)

  const [leftLabel, rightLabel] = LABELS[dictMode]
  const leftIsSr = dictMode === 'sr-en'
  const rightIsSr = dictMode === 'en-sr'

  const handleSwap = () => {
    if (swapping) return
    setSwapRotation((r) => r + 180)
    setSwapping(true)
    setTimeout(() => {
      if (dictMode === 'en-sr') setDictMode('sr-en')
      else if (dictMode === 'sr-en') setDictMode('en-sr')
      setSwapping(false)
    }, 200)
  }

  const handleLeftClick = () => {
    if (leftIsSr) setDictMode('en-en')
    else setDictMode('sr-en')
  }

  const handleRightClick = () => {
    if (rightIsSr) setDictMode('en-en')
    else setDictMode('en-sr')
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.side} ${!leftIsSr ? styles.sideActive : ''}`}
        onClick={handleLeftClick}
      >
        <div className={`${leftIsSr ? styles.flagWrapSr : styles.flagWrap} ${swapping ? styles.flagOut : ''}`}>
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
        style={{ transform: `rotate(${swapRotation}deg)` }}
      >
        ⇄
      </button>

      <button
        className={`${styles.side} ${!rightIsSr ? styles.sideActive : ''}`}
        onClick={handleRightClick}
      >
        <div className={`${rightIsSr ? styles.flagWrapSr : styles.flagWrap} ${swapping ? styles.flagOutRight : ''}`}>
          {rightIsSr ? <SRFlag /> : <USFlag />}
        </div>
        <span className={`${styles.label} ${!rightIsSr ? styles.labelActive : ''}`}>
          {rightLabel}
        </span>
      </button>
    </div>
  )
}

export default memo(FlagSwitcher)
