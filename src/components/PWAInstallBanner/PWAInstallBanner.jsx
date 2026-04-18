import { useState, useEffect, memo } from 'react'
import styles from './PWAInstallBanner.module.css'

const DISMISSED_KEY = 'bf_install_dismissed'

function PWAInstallBanner() {
  const [prompt,  setPrompt]  = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return

    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
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
      <div className={styles.info}>
        <span className={styles.logo}>BF</span>
        <div>
          <div className={styles.title}>Install BeFluent App</div>
          <div className={styles.sub}>Add to home screen for the best experience</div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.installBtn} onClick={handleInstall}>Install</button>
        <button className={styles.dismissBtn} onClick={dismiss}>✕</button>
      </div>
    </div>
  )
}

export default memo(PWAInstallBanner)
