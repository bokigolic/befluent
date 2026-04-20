import { useEffect, useRef } from 'react'

const PARTICLES = [
  { x: '10%',  y: '20%', size: 3, color: '#3b82f6', opacity: 0.25, anim: 'float1', dur: '11s', delay: '0s' },
  { x: '80%',  y: '15%', size: 2, color: '#06b6d4', opacity: 0.20, anim: 'float2', dur: '14s', delay: '2s' },
  { x: '60%',  y: '70%', size: 4, color: '#10d9a0', opacity: 0.18, anim: 'float3', dur: '9s',  delay: '1s' },
  { x: '25%',  y: '80%', size: 2, color: '#818cf8', opacity: 0.22, anim: 'float4', dur: '16s', delay: '3s' },
  { x: '45%',  y: '40%', size: 3, color: '#3b82f6', opacity: 0.15, anim: 'float5', dur: '12s', delay: '0.5s' },
  { x: '90%',  y: '55%', size: 2, color: '#06b6d4', opacity: 0.20, anim: 'float6', dur: '18s', delay: '4s' },
  { x: '70%',  y: '35%', size: 3, color: '#818cf8', opacity: 0.17, anim: 'float1', dur: '13s', delay: '2.5s' },
  { x: '15%',  y: '55%', size: 2, color: '#10d9a0', opacity: 0.15, anim: 'float3', dur: '10s', delay: '1.5s' },
]

export default function ParallaxBackground() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    let tX = 0, tY = 0
    let cX = 0, cY = 0
    let raf

    const onMove = (e) => {
      tX = (e.clientX / window.innerWidth  - 0.5)
      tY = (e.clientY / window.innerHeight - 0.5)
    }

    function tick() {
      cX += (tX - cX) * 0.05
      cY += (tY - cY) * 0.05
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${cX * 2}px, ${cY * 2}px)`
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-cX * 3}px, ${-cY * 3}px)`
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${cX * 1.5}px, ${cY * 1.5}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    document.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Orb 1 — top-left */}
      <div ref={orb1Ref} style={{
        position: 'absolute',
        top: -100, left: -100,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform',
      }} />
      {/* Orb 2 — bottom-right */}
      <div ref={orb2Ref} style={{
        position: 'absolute',
        bottom: -80, right: -80,
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform',
      }} />
      {/* Orb 3 — center accent */}
      <div ref={orb3Ref} style={{
        position: 'absolute',
        top: '40%', left: '35%',
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform',
      }} />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.x,
          top:  p.y,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: p.color,
          opacity: p.opacity,
          animation: `${p.anim} ${p.dur} ease-in-out ${p.delay} infinite`,
        }} />
      ))}
    </div>
  )
}
