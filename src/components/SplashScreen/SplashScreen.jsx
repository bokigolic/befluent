import { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'

export default function SplashScreen({ onDone }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 2000)
    const doneTimer = setTimeout(() => {
      localStorage.setItem('bf_launched', 'true')
      onDone()
    }, 2400)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div className={`${styles.screen} ${hiding ? styles.hiding : ''}`}>
      <div className={styles.center}>
        <div className={styles.circle}>
          <span className={styles.bf}>BF</span>
        </div>
        <div className={styles.brand}>BeFluent</div>
        <div className={styles.tagline}>Be fluent. Be confident.</div>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ animationDelay: '0ms' }} />
          <span className={styles.dot} style={{ animationDelay: '160ms' }} />
          <span className={styles.dot} style={{ animationDelay: '320ms' }} />
        </div>
      </div>
    </div>
  )
}
