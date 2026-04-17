import { useState, useEffect } from 'react'
import styles from './OfflineBanner.module.css'

export default function OfflineBanner() {
  const [status, setStatus] = useState(navigator.onLine ? 'online' : 'offline')
  const [visible, setVisible] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => { setStatus('offline'); setVisible(true) }
    const handleOnline = () => {
      setStatus('back')
      setTimeout(() => setVisible(false), 2000)
    }
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`${styles.banner} ${status === 'back' ? styles.online : styles.offline}`}>
      {status === 'offline'
        ? '📡 You\'re offline — showing cached results only'
        : '✓ Back online!'}
    </div>
  )
}
