import { useEffect } from 'react'
import useStore from '../../store/useStore'
import styles from './Achievements.module.css'

function AchievementToast({ notif, onDismiss }) {
  useEffect(() => {
    const delay = notif.type === 'achievement' ? 3500 : notif.type === 'levelup' ? 3000 : 2500
    const t = setTimeout(onDismiss, delay)
    return () => clearTimeout(t)
  }, [notif.id, onDismiss])

  if (notif.type === 'achievement') {
    return (
      <div className={`${styles.toast} ${styles.achievementToast}`} onClick={onDismiss}>
        <div className={styles.achEmoji}>{notif.emoji}</div>
        <div className={styles.achText}>
          <div className={styles.achUnlocked}>Achievement Unlocked!</div>
          <div className={styles.achTitle}>{notif.title}</div>
          <div className={styles.achDesc}>{notif.desc}</div>
          {notif.xpReward > 0 && (
            <div className={styles.achXP}>+{notif.xpReward} XP</div>
          )}
        </div>
      </div>
    )
  }

  if (notif.type === 'levelup') {
    return (
      <div className={`${styles.toast} ${styles.levelToast}`} onClick={onDismiss}>
        <div className={styles.achEmoji}>{notif.emoji}</div>
        <div className={styles.achText}>
          <div className={styles.achUnlocked} style={{ color: 'var(--acc)' }}>Level Up! 🎉</div>
          <div className={styles.achTitle}>You are now {notif.levelName}</div>
        </div>
      </div>
    )
  }

  if (notif.type === 'daily') {
    return (
      <div className={`${styles.toast} ${styles.dailyToast}`} onClick={onDismiss}>
        <span>{notif.message}</span>
      </div>
    )
  }

  return null
}

export default function Achievements() {
  const notifications = useStore(s => s.notifications)
  const dismiss = useStore(s => s.dismissNotification)

  if (notifications.length === 0) return null
  const notif = notifications[0]

  return (
    <div className={styles.container}>
      <AchievementToast
        key={notif.id}
        notif={notif}
        onDismiss={() => dismiss(notif.id)}
      />
    </div>
  )
}
