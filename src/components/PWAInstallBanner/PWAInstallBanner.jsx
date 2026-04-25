import { useState, useEffect, memo } from 'react'
import styles from './PWAInstallBanner.module.css'

const DISMISSED_KEY = 'bf_install_dismissed'
const DELAY_MS = 15000

const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || !!window.navigator.standalone

function PWAInstallBanner() {
  const [prompt,   setPrompt]   = useState(null)
  const [visible,  setVisible]  = useState(false)
  const [isIos,    setIsIos]    = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return
    if (isStandalone()) return

    const ios = isIOS()
    setIsIos(ios)

    if (ios) {
      // iOS Safari: no beforeinstallprompt — show after delay
      const t = setTimeout(() => setVisible(true), DELAY_MS)
      return () => clearTimeout(t)
    }

    // Chrome / Android: wait for beforeinstallprompt then delay
    let deferred = null
    let timer = null
    const handler = (e) => {
      e.preventDefault()
      deferred = e
      timer = setTimeout(() => {
        setPrompt(deferred)
        setVisible(true)
      }, DELAY_MS)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') dismiss()
  }

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.logoCircle}>BF</div>
      <div className={styles.info}>
        <div className={styles.title}>{isIos ? 'Add to Home Screen' : 'Install BeFluent'}</div>
        <div className={styles.sub}>
          {isIos
            ? "Tap Share → 'Add to Home Screen' to install"
            : 'Learn faster with the app'}
        </div>
      </div>
      <div className={styles.actions}>
        {!isIos && (
          <button className={styles.installBtn} onClick={handleInstall}>Install</button>
        )}
        <button className={styles.dismissBtn} onClick={dismiss} aria-label="Dismiss">✕</button>
      </div>
    </div>
  )
}

export default memo(PWAInstallBanner)
