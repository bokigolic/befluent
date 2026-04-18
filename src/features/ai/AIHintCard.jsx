import { useRef, memo } from 'react'
import useStore from '../../store/useStore'
import { useAIHint } from './useAIHint'
import styles from './AIHintCard.module.css'

function AIHintCard({ word, partOfSpeech }) {
  const { hint, isLoading, error, fetchHint } = useAIHint()
  const addXP    = useStore(s => s.addXP)
  const xpGiven  = useRef(false)

  const handleClick = () => {
    if (!xpGiven.current) { xpGiven.current = true; addXP(3) }
    fetchHint(word, partOfSpeech)
  }

  if (!hint && !isLoading && !error) {
    return (
      <button className={styles.triggerBtn} onClick={handleClick}>
        ✨ Get AI Hint
      </button>
    )
  }

  if (isLoading) {
    return (
      <div>
        <button className={styles.triggerBtn} disabled>✨ Thinking…</button>
        <div className={styles.skelWrap}>
          <div className={styles.skel} style={{ width: '85%' }} />
          <div className={styles.skel} style={{ width: '65%' }} />
          <div className={styles.skel} style={{ width: '80%' }} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <span>⚠️ AI hint unavailable</span>
        <button className={styles.retryLink} onClick={handleClick}>Retry</button>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>✨ AI Insight</div>

      <div className={styles.section}>
        <div className={styles.label} style={{ color: 'var(--acc-a)' }}>⚠️ Often confused with</div>
        <div className={styles.text}>{hint.confusion}</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.label} style={{ color: 'var(--acc-g)' }}>💡 Memory trick</div>
        <div className={styles.text}>{hint.memoryTrick}</div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.label} style={{ color: 'var(--acc)' }}>🎯 Real-world context</div>
        <div className={styles.text}>{hint.context}</div>
      </div>

      <div className={styles.footer}>Powered by Claude AI</div>
    </div>
  )
}

export default memo(AIHintCard)
