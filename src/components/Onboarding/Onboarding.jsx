import { useState, useRef } from 'react'
import styles from './Onboarding.module.css'

const SLIDES = [
  {
    emoji: '🔍',
    emojiSize: 64,
    title: '400,000+ English Words',
    sub: 'Search any word and get definitions, examples, pronunciation and more.',
  },
  {
    emoji: '🇺🇸 ↔ 🇷🇸',
    emojiSize: 48,
    title: 'English ↔ Serbian',
    sub: 'Translate instantly between English and Serbian. Perfect for learning.',
  },
  {
    emoji: '⚡',
    emojiSize: 64,
    title: 'Learn & Level Up',
    sub: 'Earn XP for every search. Build your streak. Track your progress.',
  },
]

export default function Onboarding({ onDone }) {
  const [index, setIndex] = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const touchStartX = useRef(null)

  const goTo = (next) => {
    if (next < 0 || next >= SLIDES.length) return
    setAnimDir(next > index ? 'left' : 'right')
    setIndex(next)
  }

  const handleNext = () => {
    if (index < SLIDES.length - 1) goTo(index + 1)
    else finish()
  }

  const finish = () => {
    localStorage.setItem('bf_onboarded', 'true')
    onDone()
  }

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx < -50) goTo(index + 1)
    else if (dx > 50) goTo(index - 1)
  }

  const slide = SLIDES[index]

  return (
    <div className={styles.overlay}>
      <button className={styles.skip} onClick={finish}>Skip</button>

      <div
        className={styles.slideWrap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          key={index}
          className={`${styles.slide} ${animDir === 'left' ? styles.slideInLeft : animDir === 'right' ? styles.slideInRight : ''}`}
        >
          <div className={styles.glow} />
          <div className={styles.emoji} style={{ fontSize: slide.emojiSize }}>
            {slide.emoji}
          </div>
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.sub}>{slide.sub}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.dots}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button className={styles.nextBtn} onClick={handleNext}>
          {index === SLIDES.length - 1 ? 'Start Learning →' : 'Next'}
        </button>
      </div>
    </div>
  )
}
