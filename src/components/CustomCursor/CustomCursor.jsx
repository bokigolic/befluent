import { useEffect, useRef } from 'react'

const TRAIL_COUNT = 5
const TRAIL_OPACITY = [0.30, 0.24, 0.18, 0.12, 0.07]

export default function CustomCursor() {
  const outerRef   = useRef(null)
  const innerRef   = useRef(null)
  const trailRefs  = useRef([])
  const labelRef   = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const outer = outerRef.current
    const inner = innerRef.current
    const label = labelRef.current
    const trails = trailRefs.current
    if (!outer || !inner) return

    // Mouse position history for trail
    const history = Array(TRAIL_COUNT + 1).fill({ x: -100, y: -100 })
    let mouseX = -100, mouseY = -100
    let curX = -100,   curY = -100
    const SPEED = 0.12
    let raf

    // Magnetic buttons tracking
    const magneticEls = new Map()

    function tick() {
      // Smooth outer ring
      curX += (mouseX - curX) * SPEED
      curY += (mouseY - curY) * SPEED
      outer.style.transform = `translate(${curX - 16}px, ${curY - 16}px)`
      inner.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`

      // Shift history
      history.unshift({ x: mouseX, y: mouseY })
      history.pop()

      // Render trail
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const t = trails[i]
        const h = history[i + 1]
        if (t && h) {
          t.style.transform = `translate(${h.x - 2}px, ${h.y - 2}px)`
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Magnetic effect — move buttons toward cursor
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = mouseX - cx
        const dy = mouseY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 60) {
          el.style.transition = 'transform 0.1s'
          el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`
          magneticEls.set(el, true)
        } else if (magneticEls.has(el)) {
          el.style.transition = 'transform 0.3s'
          el.style.transform = 'translate(0,0)'
          magneticEls.delete(el)
        }
      })
    }

    const CLICK_SELECTORS = 'button, a, [role="button"], input, textarea, select, label, [tabindex]'

    const onOver = (e) => {
      const el = e.target.closest(CLICK_SELECTORS)
      if (!el) return
      isHovering.current = true
      const cursorText = el.dataset.cursor || ''
      outer.style.width  = '48px'
      outer.style.height = '48px'
      outer.style.borderColor = 'rgba(6,182,212,0.85)'
      outer.style.background  = 'rgba(59,130,246,0.1)'
      inner.style.opacity = '0'
      if (cursorText && label) {
        label.textContent = cursorText
        label.style.opacity = '1'
      }
    }

    const onOut = (e) => {
      const el = e.target.closest(CLICK_SELECTORS)
      if (!el) return
      isHovering.current = false
      outer.style.width  = '32px'
      outer.style.height = '32px'
      outer.style.borderColor = 'rgba(59,130,246,0.6)'
      outer.style.background  = 'transparent'
      inner.style.opacity = '1'
      if (label) {
        label.textContent = ''
        label.style.opacity = '0'
      }
    }

    const onDown = () => {
      outer.style.width  = isHovering.current ? '40px' : '26px'
      outer.style.height = isHovering.current ? '40px' : '26px'
    }
    const onUp = () => {
      outer.style.width  = isHovering.current ? '48px' : '32px'
      outer.style.height = isHovering.current ? '48px' : '32px'
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
      // clean up magnetic elements
      magneticEls.forEach((_, el) => {
        el.style.transition = 'transform 0.3s'
        el.style.transform  = 'translate(0,0)'
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const baseFixed = {
    position: 'fixed', top: 0, left: 0,
    pointerEvents: 'none', zIndex: 99999,
    borderRadius: '50%', willChange: 'transform',
  }

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          style={{
            ...baseFixed,
            width: 4, height: 4,
            background: `rgba(59,130,246,${TRAIL_OPACITY[i]})`,
            transition: 'none',
          }}
        />
      ))}

      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          ...baseFixed,
          width: 32, height: 32,
          border: '1.5px solid rgba(59,130,246,0.6)',
          background: 'transparent',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: 12,
            color: '#06b6d4',
            fontWeight: 700,
            opacity: 0,
            transition: 'opacity 0.15s',
            userSelect: 'none',
            lineHeight: 1,
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          ...baseFixed,
          width: 6, height: 6,
          background: '#3b82f6',
          transition: 'transform 0.08s, opacity 0.15s',
        }}
      />
    </>
  )
}
