import { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'

export default function SplashScreen({ onDone }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 2100)
    const doneTimer = setTimeout(() => {
      localStorage.setItem('bf_launched', 'true')
      onDone()
    }, 2500)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div className={`${styles.screen} ${hiding ? styles.hiding : ''}`}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.center}>
        <div className={styles.iconWrap}>
          <svg width="90" height="90" viewBox="0 0 90 90" aria-hidden="true">
            <defs>
              <linearGradient id="splashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#06b6d4"/>
              </linearGradient>
            </defs>
            <rect width="90" height="90" rx="24" fill="url(#splashGrad)"/>
            <text x="45" y="63" textAnchor="middle" fill="white"
                  fontSize="40" fontWeight="800" fontFamily="Space Grotesk, sans-serif">BF</text>
          </svg>
        </div>
        <div className={styles.brand}>BeFluent</div>
        <div className={styles.tagline}>Master English. Be Fluent.</div>
        <div className={styles.loadBarWrap}>
          <div className={styles.loadBar} />
        </div>
      </div>

      <div className={styles.version}>v1.0</div>
    </div>
  )
}
