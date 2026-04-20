import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const hovering = useRef(false)
  const clicking = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let curX   = mouseX
    let curY   = mouseY
    const SPEED = 0.12
    let raf

    function tick() {
      curX += (mouseX - curX) * SPEED
      curY += (mouseY - curY) * SPEED
      outer.style.transform = `translate(${curX - 16}px, ${curY - 16}px)`
      inner.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const SELECTORS = 'button, a, [role="button"], input, textarea, select, label, [tabindex]'

    const onOver = (e) => {
      if (e.target.closest(SELECTORS)) {
        hovering.current = true
        outer.style.transform += ''
        outer.style.width  = '48px'
        outer.style.height = '48px'
        outer.style.borderColor = 'rgba(6,182,212,0.8)'
        outer.style.background  = 'rgba(59,130,246,0.1)'
        inner.style.transform   = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(0)`
      }
    }

    const onOut = (e) => {
      if (e.target.closest(SELECTORS)) {
        hovering.current = false
        outer.style.width  = '32px'
        outer.style.height = '32px'
        outer.style.borderColor = 'rgba(59,130,246,0.6)'
        outer.style.background  = 'transparent'
        inner.style.transform   = `translate(${mouseX - 3}px, ${mouseY - 3}px) scale(1)`
      }
    }

    const onDown = () => {
      clicking.current = true
      outer.style.transform += ''
      outer.style.width  = '26px'
      outer.style.height = '26px'
    }
    const onUp = () => {
      clicking.current = false
      outer.style.width  = hovering.current ? '48px' : '32px'
      outer.style.height = hovering.current ? '48px' : '32px'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(59,130,246,0.6)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#3b82f6',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.1s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
