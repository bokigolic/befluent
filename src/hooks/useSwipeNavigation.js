import { useEffect, useRef, useCallback } from 'react'
import useStore from '../store/useStore'

const PAGES_ORDER = ['dictionary', 'grammar', 'writing', 'review', 'topics']

export function useSwipeNavigation(containerRef) {
  const activePage    = useStore(s => s.activePage)
  const setActivePage = useStore(s => s.setActivePage)

  const startX    = useRef(0)
  const startY    = useRef(0)
  const startTime = useRef(0)

  const isScrollable = useCallback((el) => {
    if (!el) return false
    const tag = el.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return true
    // Check if element or any ancestor is a scrollable container (not just the body)
    let node = el
    while (node && node !== document.body) {
      const style = window.getComputedStyle(node)
      const overflowX = style.overflowX
      if ((overflowX === 'scroll' || overflowX === 'auto') && node.scrollWidth > node.clientWidth) return true
      node = node.parentElement
    }
    return false
  }, [])

  useEffect(() => {
    const el = containerRef?.current ?? document

    const onStart = (e) => {
      const touch = e.touches[0]
      startX.current    = touch.clientX
      startY.current    = touch.clientY
      startTime.current = Date.now()
    }

    const onEnd = (e) => {
      if (isScrollable(e.target)) return
      const touch = e.changedTouches[0]
      const dx = touch.clientX - startX.current
      const dy = touch.clientY - startY.current
      const dt = Date.now() - startTime.current

      if (
        Math.abs(dx) > 60 &&
        Math.abs(dx) > Math.abs(dy) * 1.5 &&
        dt < 400
      ) {
        const idx = PAGES_ORDER.indexOf(activePage)
        if (dx < 0 && idx < PAGES_ORDER.length - 1) {
          setActivePage(PAGES_ORDER[idx + 1])
          navigator.vibrate?.(6)
        } else if (dx > 0 && idx > 0) {
          setActivePage(PAGES_ORDER[idx - 1])
          navigator.vibrate?.(6)
        }
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend',   onEnd)
    }
  }, [activePage, setActivePage, isScrollable, containerRef])
}
