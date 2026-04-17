import { memo } from 'react'

const orbStyle1 = {
  position: 'fixed',
  top: '-60px',
  left: '-80px',
  width: '400px',
  height: '400px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(124,111,255,0.08), transparent 70%)',
  pointerEvents: 'none',
  zIndex: 0,
  animation: 'float 8s ease-in-out infinite alternate',
}

const orbStyle2 = {
  position: 'fixed',
  bottom: '-60px',
  right: '-60px',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255,107,157,0.06), transparent 70%)',
  pointerEvents: 'none',
  zIndex: 0,
  animation: 'float 8s ease-in-out infinite alternate-reverse',
}

const PARTICLES = [
  { top: '15%',  left: '8%',  size: 4, color: 'var(--acc)',   dur: '7s',  delay: '0s' },
  { top: '35%',  right: '6%', size: 3, color: 'var(--acc-p)', dur: '9s',  delay: '1.5s' },
  { top: '60%',  left: '5%',  size: 3, color: 'var(--acc-g)', dur: '11s', delay: '3s' },
  { top: '75%',  right: '9%', size: 4, color: 'var(--acc)',   dur: '8s',  delay: '0.8s' },
  { top: '25%',  left: '90%', size: 3, color: 'var(--acc-p)', dur: '12s', delay: '2.2s' },
  { top: '50%',  left: '50%', size: 3, color: 'var(--acc-g)', dur: '10s', delay: '4s' },
]

function BackgroundEffects() {
  return (
    <>
      <div style={orbStyle1} />
      <div style={orbStyle2} />
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.2,
            pointerEvents: 'none',
            zIndex: 0,
            animation: `particleFloat ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  )
}

export default memo(BackgroundEffects)
