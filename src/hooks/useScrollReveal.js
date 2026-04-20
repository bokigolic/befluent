import { useEffect } from 'react'

const CSS = `
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.23,1,0.32,1), transform 0.5s cubic-bezier(0.23,1,0.32,1);
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
`

let styleInjected = false

export function useScrollReveal() {
  useEffect(() => {
    if (!styleInjected) {
      const style = document.createElement('style')
      style.textContent = CSS
      document.head.appendChild(style)
      styleInjected = true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target
            const delay = el.dataset.delay || '0'
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    const els = document.querySelectorAll('.reveal:not(.revealed)')
    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  })
}
